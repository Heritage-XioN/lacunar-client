import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
	{ label: 'Services', active: true },
	{ label: 'Insights', active: false },
	{ label: 'About', active: false },
	{ label: 'Case Studies', active: false },
];

export function ServicesNavbar() {
	return (
		<header className='bg-navy-950'>
			<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16'>
				{/* Logo */}
				<a
					href='/'
					className='text-sm font-semibold italic text-white'
				>
					Vantage Strategy
				</a>

				{/* Desktop nav links */}
				<div className='hidden items-center gap-7 md:flex'>
					{navLinks.map((link) => (
						<a
							key={link.label}
							href='#'
							className={cn(
								'relative font-sans text-sm transition-colors duration-200',
								link.active
									? 'text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold-500'
									: 'text-slate-400 hover:text-white'
							)}
						>
							{link.label}
						</a>
					))}
				</div>

				{/* Right side — Search + CTA */}
				<div className='hidden items-center gap-4 md:flex'>
					<Button
						variant='ghost'
						size='icon'
						className='text-slate-400 hover:text-white transition-colors'
						aria-label='Search'
					>
						<Search className='h-4 w-4' />
					</Button>
					<Button
						variant='primary'
						className='px-5 py-2 text-xs uppercase tracking-wider'
						type='button'
					>
						Contact Us
					</Button>
				</div>
			</nav>
		</header>
	);
}
