//  Byimaan

import type { Metadata } from "next";
import '@styles/globals.css';
import Nav from "@components/Nav";
import Provider from "@components/Provider";


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
        <Provider>

          <div className="main">
            <div className="gradient">  </div>
          </div>

          <main className="app">

            <Nav/>
            {children}

          </main>

        </Provider>
      </body>

    </html>
  );
}
