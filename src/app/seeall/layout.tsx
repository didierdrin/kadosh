import MainLayout from '../main-layout';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>;
}

export const dynamic = 'force-dynamic';