import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Parlour Dashboard',
  description: 'Admin login and attendance system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
