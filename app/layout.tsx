import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "🌱 Grow a Garden Mutation Calculator",
  description: "Calculate plant mutation values for the Grow a Garden game"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>🌱 Grow a Garden Mutation Calculator</title>
        <meta name="description" content="Calculate plant mutation values for the Grow a Garden game. Fast, accurate, and easy Grow a Garden calculator for prices, mutations, and more!" />
        <meta name="keywords" content="grow a garden calculator,gag calc,grow a garden prices,mutation calculator,grow a garden mutation,grow a garden price calculator,plant calculator,plant mutation,grow a garden tool" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://twoja-strona.pl/" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content="🌱 Grow a Garden Mutation Calculator" />
        <meta property="og:description" content="Calculate plant mutation values for the Grow a Garden game. Fast, accurate, and easy Grow a Garden calculator for prices, mutations, and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://twoja-strona.pl/" />
        <meta property="og:image" content="https://twoja-strona.pl/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🌱 Grow a Garden Mutation Calculator" />
        <meta name="twitter:description" content="Calculate plant mutation values for the Grow a Garden game. Fast, accurate, and easy Grow a Garden calculator for prices, mutations, and more!" />
        <meta name="twitter:image" content="https://twoja-strona.pl/og-image.png" />
        {/* Google site verification (opcjonalnie) */}
        {/* <meta name="google-site-verification" content="TWÓJ_KOD_WERYFIKACYJNY" /> */}
        {/* JSON-LD structured data (opcjonalnie) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Grow a Garden Mutation Calculator",
            "url": "https://twoja-strona.pl/",
            "description": "Calculate plant mutation values for the Grow a Garden game.",
            "applicationCategory": "Calculator",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }} />
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
