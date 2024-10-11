import { Raleway } from 'next/font/google'; // Import Raleway from next/font/google
import { AuthProvider } from '../components/authprovider';
import "./globals.css";

const raleway = Raleway({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={raleway.className}> {/* Apply Raleway font globally */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// import { AuthProvider } from '../components/authprovider';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang='en'>
//       <body>
//     <AuthProvider>
//       {children}
//     </AuthProvider>
//     </body>
//     </html>
//   )
// };