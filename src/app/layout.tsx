"use client"

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; 
import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-right" gutter={8} />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
