import { Button } from '../ui/button';

const navLinks = ['Our Practice', 'Insights', 'Engagements', 'Advisory'];

export function ConsultationNavbar() {
	return (
		<header className='border-b border-slate-100 bg-white'>
			<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16'>
				{/* Logo */}
				<a
					href='/'
					className='text-xs font-bold uppercase tracking-widest text-navy-900 sm:text-sm'
				>
					Architectural Strategy
				</a>

				{/* Desktop nav links */}
				<div className='hidden items-center gap-7 md:flex'>
					{navLinks.map((link) => (
						<a
							key={link}
							href='#'
							className='font-sans text-sm text-slate-500 transition-colors duration-200 hover:text-navy-900'
						>
							{link}
						</a>
					))}
				</div>

				{/* CTA */}
				<div className='hidden md:block'>
					<Button
						variant='secondary'
						className='border-navy-900 bg-navy-900 px-5 py-2.5 text-xs uppercase tracking-widest text-white hover:bg-navy-800'
						type='button'
					>
						Book Consultation
					</Button>
				</div>
			</nav>
		</header>
	);
}
