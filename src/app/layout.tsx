import { AppContextProvider } from '@/context'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Client Home App',
  description: 'Copilot Client Home App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppContextProvider>
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  )
}
