import { AuthProvider } from '../components/authprovider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
    <AuthProvider>
      {children}
    </AuthProvider>
    </body>
    </html>
  )
};