import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import type { MedicineEntry } from "@/types/medicine";
import { supabaseAdmin } from "@/lib/supabase";

const SYSTEM_PROMPT = `You are a prescription-reading assistant. Your only job is to read a handwritten doctor's prescription image and return a JSON array describing each medicine listed.

STRICT RULES — violating any of these is not allowed:
1. Return ONLY a valid JSON array. No prose, no markdown, no code fences, no explanation outside the JSON.
2. Never include dosage instructions, frequency, scheduling, drug interactions, or any directive language (do not say "take", "use", "stop", "avoid", "combine", etc.).
3. Never guess a specific drug name when the handwriting is unclear. An incorrect drug name is dangerous. Use confidence "low" when partly legible, "unreadable" when you cannot identify the drug at all.
4. general_use_en and general_use_ur must describe only what the medicine is *generally used for* — one or two plain sentences, no medical advice.
5. If confidence is "unreadable", set general_use_en and general_use_ur to empty strings "".

Each element in the array must match this exact shape:
{
  "name_as_read": "the exact string as written on the prescription",
  "identified_name": "standardised drug name" or null if unclear,
  "confidence": "high" | "low" | "unreadable",
  "general_use_en": "plain English description of general use, or empty string",
  "general_use_ur": "plain Urdu description of general use in Nastaliq script, or empty string"
}

Return the array and nothing else.`;

function extractJSON(text: string): MedicineEntry[] {
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("No JSON array found in response");

  return JSON.parse(cleaned.slice(start, end + 1));
}

async function savePrescription(medicines: MedicineEntry[]) {
  const { error } = await supabaseAdmin.from("prescriptions").insert({
    medicines,
    medicine_count: medicines.length,
    has_low_confidence: medicines.some((m) => m.confidence === "low"),
    has_unreadable: medicines.some((m) => m.confidence === "unreadable"),
  });
  if (error) console.error("Supabase insert error:", error.message);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const mimeType = image.type || "image/jpeg";
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { inlineData: { mimeType, data: base64 } },
    ]);

    const text = result.response.text();
    const medicines = extractJSON(text);

    // Save to Supabase — fire and forget, never blocks the response
    savePrescription(medicines).catch(() => {});

    return NextResponse.json({ medicines });
  } catch (err) {
    console.error("Analyse error:", err);
    return NextResponse.json(
      { error: "Failed to analyse prescription. Please try again." },
      { status: 500 }
    );
  }
}
