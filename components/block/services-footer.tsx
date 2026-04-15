export function ServicesFooter() {
	const links = ['Privacy Policy', 'Terms of Service', 'Disciplinary', 'Global Offices', 'Expertise'];

	return (
		<footer className='border-t border-slate-100 bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16'>
				<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					{/* Left — Brand + tagline */}
					<div>
						<p className='text-lg italic text-navy-900'>
							Vantage Strategy
						</p>
						<p className='mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400'>
							The Informed Authority. Cultivating.
						</p>
					</div>

					{/* Right — Links */}
					<div className='flex flex-wrap gap-x-5 gap-y-2'>
						{links.map((link) => (
							<a
								key={link}
								href='#'
								className='text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 transition-colors hover:text-navy-900'
							>
								{link}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
