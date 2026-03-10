import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the AI assistant on Ransford Oppong's personal portfolio website. Ransford is an AI Software Engineer and Researcher with expertise in:
- Machine Learning & Deep Learning
- Quantum Machine Learning (Quantum ML)
- Physics-Informed Neural Networks (PINNs)
- AI for scientific computing & simulation

He's available for consulting engagements, research collaborations, speaking opportunities, and open-source contributions. His portfolio sections include: /about, /projects, /research, /publications, /services, /collaborations, /achievements, and /contact.

Guidelines:
- Keep responses concise: 2–3 sentences maximum
- Be warm, professional, and helpful
- When relevant, mention specific portfolio sections (e.g. "Check out /research for papers on PINNs")
- If asked about pricing or availability, direct to /contact or /services
- If asked technical questions about Quantum ML or PINNs, give a brief accurate answer and mention the Playground for hands-on demos`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      content:
        "AI assistant isn't configured yet. Reach out to Ransford directly via the Contact page!",
    });
  }

  const { messages } = await req.json();
  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const content =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({
      content:
        "Something went wrong on my end. Please try again or reach out via the Contact page.",
    });
  }
}
