import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

// تحميل خط Cairo للعربية
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة التعليم الذكية",
  description: "منصة تعليمية ذكية تفاعلية للمناهج المصرية باستخدام الذكاء الاصطناعي",
  keywords: "تعليم, مصر, ذكاء اصطناعي, دروس تفاعلية, منصة تعليمية",
  authors: [{ name: "Smart Education Platform" }],
  openGraph: {
    title: "منصة التعليم الذكية",
    description: "تعلم بطريقة ذكية وتفاعلية",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}