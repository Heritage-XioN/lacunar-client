import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = ['Services', 'About', 'Our Team'];

export function Navbar() {
	return (
		<header className='absolute inset-x-0 top-0 z-50'>
			{/* Gold accent line */}
			<div className='h-0.5 bg-gold-500' />

			<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16'>
				{/* Logo */}
				<a
					href='#'
					className='text-xs font-bold uppercase tracking-widest text-white sm:text-sm'
				>
					LACUNAR CONSULTING FIRM
				</a>
			</nav>
		</header>
	);
}
