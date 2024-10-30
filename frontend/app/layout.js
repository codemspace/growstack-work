import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GrowStack Workflow",
  description: "GrowStack Workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100 text-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 bg-blue-600 text-white text-center">{metadata.title}</header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
