import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script" // Importar o componente Script

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tecnologia OTT",
  description: "Descubra como liberar todas as plataformas com a nova tecnologia OTT",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1009126234358319');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1009126234358319&ev=PageView&noscript=1"
            alt="Facebook Pixel" // Adicionado alt text para acessibilidade
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
