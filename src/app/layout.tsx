import { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: "Ali's site",
  description: 'My personal site',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
