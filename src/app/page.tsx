import { UrduText } from "@/components/UrduText";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1
        className="text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        Parchi
      </h1>
      <UrduText as="p" className="text-2xl mb-6">
        پرچی
      </UrduText>
      <p className="text-base mb-2" style={{ color: "var(--color-ink-soft)" }}>
        Photograph your prescription. Understand what each medicine is generally for.
      </p>
      <p className="text-xs mt-8" style={{ color: "var(--color-ink-soft)" }}>
        Coming soon —{" "}
        <a href="/style" className="underline" style={{ color: "var(--color-green)" }}>
          view design system
        </a>
      </p>
    </div>
  );
}
