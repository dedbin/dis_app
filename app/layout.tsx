import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dis App',
  description: 'First version of dis app',
}

/**
 * Renders the root layout for the site.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
            font.className,
        )}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={false}
            storageKey='dis-theme'
          >
            <SocketProvider>
              <ModalProvider/>
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
