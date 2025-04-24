"use client"

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store'; 
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-right" gutter={8} />
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
