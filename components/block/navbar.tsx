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
				<a href='#' className='text-xs font-bold uppercase tracking-widest text-white sm:text-sm'>
					LACUNAR CONSULTING FIRM
				</a>

				{/* Desktop nav links */}
				<div className='hidden items-center gap-8 md:flex'>
					{navLinks.map((link) => (
						<a
							key={link}
							href='#'
							className='text-sm text-slate-300 transition-colors duration-200 hover:text-white'
						>
							{link}
						</a>
					))}
				</div>

				{/* CTA button - desktop */}
				<div className='hidden md:block'>
					<Button
						variant='primary'
						className='px-5 py-2.5 text-xs uppercase tracking-wider'
						type='button'
					>
						Book a Consultation
					</Button>
				</div>

				{/* Mobile menu button */}
				<Button
					variant='ghost'
					size='icon'
					className='text-white md:hidden hover:text-white hover:bg-white/10'
					aria-label='Open menu'
				>
					<Menu className='h-6 w-6' />
				</Button>
			</nav>
		</header>
	);
}
