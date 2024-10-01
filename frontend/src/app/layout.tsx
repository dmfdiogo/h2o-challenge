import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'H2O Bank',
  description: 'H2O Bank Frontend project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.variable} lang="pt">
        
        <body className={`bg-background antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        </body>
    
      </html>
  )
}
