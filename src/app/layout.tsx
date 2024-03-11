import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ItemProvider from '@/context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pocki inmobiliario',
  description: 'Pocki ahora te ayuda a encontrar la vivienda de tus sueños',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | any
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ItemProvider>
          {children}
        </ItemProvider>
      </body>
    </html>
  )
}
