import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Nastaliq_Urdu, Spline_Sans_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0E6E5C",
};

export const metadata: Metadata = {
  title: "Parchi — پرچی",
  description:
    "Photograph your prescription and get a plain-language explanation of what each medicine is generally used for.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Parchi",
  },
  formatDetection: { telephone: false },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ur"
      className={`${fraunces.variable} ${inter.variable} ${notoNastaliqUrdu.variable} ${splineSansMono.variable} h-full`}
      style={{ WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        {/* Top bar */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 flex-1">
              <span
                className="text-xl tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-green)" }}
              >
                ℞
              </span>
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                Parchi
              </span>
              <span
                className="text-sm ml-1"
                style={{ fontFamily: "var(--font-urdu)", color: "var(--color-ink-soft)" }}
                dir="rtl"
              >
                پرچی
              </span>
            </Link>

            {/* Scan CTA in header */}
            <Link
              href="/scan"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white transition-transform active:scale-95"
              style={{ backgroundColor: "var(--color-green)" }}
            >
              <span>📷</span> Scan
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer
          className="border-t py-6 px-4"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
          }}
        >
          <div
            className="max-w-2xl mx-auto text-center text-xs leading-relaxed"
            style={{ color: "var(--color-ink-soft)" }}
          >
            <p className="font-medium" style={{ color: "var(--color-coral)" }}>
              This app is not medical advice.
            </p>
            <p className="mt-1">
              Parchi explains what medicines are generally used for. Always confirm
              with your pharmacist or doctor before taking any medicine.
            </p>
            <p
              className="mt-2 text-sm"
              style={{ fontFamily: "var(--font-urdu)", direction: "rtl" }}
            >
              یہ ایپ طبی مشورہ نہیں ہے۔ ہمیشہ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
