// app/layout.js
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Rhythmify",
  description:
    "Rthymify is a modern music streaming app with a sleek UI, personalized playlists, and a smooth listening experience. Discover trending tracks, explore albums, and enjoy your favorite songs with an intuitive player.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
