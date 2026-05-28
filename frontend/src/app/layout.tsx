import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RecruiterModeProvider } from "@/components/RecruiterModeContext";
import { Cursor } from "@/components/ui/Cursor";
import { Background } from "@/components/ui/Background";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinay Kumar Makvana | Full Stack Developer",
  description: "Portfolio of Vinay Kumar Makvana, a Full Stack Developer specializing in modern, scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen antialiased selection:bg-accent-primary/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RecruiterModeProvider>
            <Background />
            <Cursor />
            <Navbar />
            <main>{children}</main>
          </RecruiterModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
