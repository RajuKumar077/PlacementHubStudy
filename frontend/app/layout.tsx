'use client';

import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/lib/context/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 PlacementHubStudy. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
