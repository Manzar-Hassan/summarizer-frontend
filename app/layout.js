import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const raleway = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Briefly",
  description: "Created with Next.js",
  icon: './favicon.ico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased bg-gray-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
