import { Nunito_Sans } from 'next/font/google';

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${nunitoSans.className}`}>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 