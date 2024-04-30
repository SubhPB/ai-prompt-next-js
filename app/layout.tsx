import type { Metadata } from "next";
import '@styles/globals.css';

export const metadata: Metadata = {
  title: "AI prompts",
  description: "Discover & Share AI prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="app-body">
        
        <div className="main">
          <div className="gradient">  </div>
        </div>

        <main className="app">
          {children}
        </main>

      </body>

    </html>
  );
}
