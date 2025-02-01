import { FormProvider } from './context/FormContext';
import type { ReactNode } from 'react';
import '../app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}