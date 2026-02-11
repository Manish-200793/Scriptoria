import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { scriptText } = await req.json();
    if (!scriptText || scriptText.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Script text too short. Please provide a full screenplay." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Scriptoria, an expert film pre-production AI assistant. You analyze screenplays and produce comprehensive production data.

Given a screenplay or script text, you MUST call the "analyze_script" tool with a complete production breakdown. Be thorough and creative. For storyboards, describe vivid visual compositions for key scenes.

Rules:
- Extract ALL characters mentioned, even minor ones
- Identify every prop, vehicle, and special item
- List every distinct location
- Break the script into logical scenes with scene numbers
- Create a realistic shooting schedule grouping scenes by location
- Estimate a realistic indie film budget
- Generate storyboard descriptions for the most visually important scenes (at least 4-6)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this screenplay:\n\n${scriptText}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_script",
              description: "Return the complete script analysis with breakdown, schedule, budget, and storyboards.",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Detected or inferred title of the script" },
                  characters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        role: { type: "string", description: "Lead, Supporting, or Extra" },
                        description: { type: "string" },
                        scenes: { type: "array", items: { type: "number" } },
                      },
                      required: ["name", "role", "description", "scenes"],
                    },
                  },
                  props: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        category: { type: "string", description: "e.g. Weapon, Vehicle, Furniture, Tech, Wardrobe, Food" },
                        scenes: { type: "array", items: { type: "number" } },
                      },
                      required: ["name", "category", "scenes"],
                    },
                  },
                  locations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        type: { type: "string", description: "INT or EXT" },
                        timeOfDay: { type: "string", description: "DAY, NIGHT, DAWN, etc." },
                        scenes: { type: "array", items: { type: "number" } },
                      },
                      required: ["name", "type", "timeOfDay", "scenes"],
                    },
                  },
                  scenes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        number: { type: "number" },
                        heading: { type: "string" },
                        summary: { type: "string" },
                        characters: { type: "array", items: { type: "string" } },
                        estimatedDuration: { type: "string", description: "e.g. 2 min" },
                      },
                      required: ["number", "heading", "summary", "characters", "estimatedDuration"],
                    },
                  },
                  schedule: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "number" },
                        location: { type: "string" },
                        scenes: { type: "array", items: { type: "number" } },
                        estimatedHours: { type: "number" },
                        notes: { type: "string" },
                      },
                      required: ["day", "location", "scenes", "estimatedHours", "notes"],
                    },
                  },
                  budget: {
                    type: "object",
                    properties: {
                      totalEstimate: { type: "number" },
                      currency: { type: "string" },
                      lineItems: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            category: { type: "string" },
                            description: { type: "string" },
                            amount: { type: "number" },
                          },
                          required: ["category", "description", "amount"],
                        },
                      },
                    },
                    required: ["totalEstimate", "currency", "lineItems"],
                  },
                  storyboards: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sceneNumber: { type: "number" },
                        shotDescription: { type: "string", description: "Detailed visual description of the shot composition, camera angle, lighting, character positions" },
                        cameraAngle: { type: "string" },
                        mood: { type: "string" },
                      },
                      required: ["sceneNumber", "shotDescription", "cameraAngle", "mood"],
                    },
                  },
                },
                required: ["title", "characters", "props", "locations", "scenes", "schedule", "budget", "storyboards"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_script" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage credits exhausted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI analysis failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "AI did not return structured analysis." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-script error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
