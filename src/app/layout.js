import { Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "../components/core/Navbar";

const font = Orbitron({ subsets: ["latin"] });

export const metadata = {
  title: "Scale the world",
  description: "Analysis by visualization of earth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          font.className +
          " h-screen bg-background text-secondary max-h-screen bg-no-repeat"
        }
      >
        <Navbar />
        <main className="flex flex-col p-4 h-[92%] overflow-y-scroll">
          {children}
        </main>
      </body>
    </html>
  );
}
