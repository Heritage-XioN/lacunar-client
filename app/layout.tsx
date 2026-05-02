import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { DatadogAppRouter } from '@datadog/browser-rum-nextjs';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lacunar consulting | The Informed Authority',
	description:
		'Bespoke architectural strategy for institutions ready to redefine their market position through precision, data, and legacy-building insights.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body className={`${inter.variable} ${playfair.variable} antialiased`}>
				<DatadogAppRouter />
				{children}
				<Toaster richColors />
			</body>
		</html>
	);
}
