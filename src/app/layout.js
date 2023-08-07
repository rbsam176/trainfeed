import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Train feed",
  description: "Tracks departures to/from Beaconsfield",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon-180x180.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="256x256"
          href="/icon-256x256.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="384x384"
          href="/icon-384x384.png"
        ></link>
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
