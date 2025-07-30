import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/shared/providers/QueryProvider'
import { SessionProviders } from '@/shared/providers/SessionProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Square POS App',
  description: 'A NextJs app for managing you sqaure point-of-scale.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviders>
          <QueryProvider>
            {children} <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </SessionProviders>
      </body>
    </html>
  )
}
