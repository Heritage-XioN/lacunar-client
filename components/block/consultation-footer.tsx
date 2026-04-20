export function ConsultationFooter() {
	const links = ['Privacy Policy', 'Terms of Engagement', 'Global Offices', 'Expertise'];

	return (
		<footer className='border-t border-slate-200 bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16'>
				<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
					{/* Left — Brand */}
					<div>
						<p className='text-xl italic text-navy-900'>
							Vantage Strategy
						</p>
						<p className='mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400'>
							© 2024 Architectural Strategy. All rights reserved.
						</p>
						<p className='mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400'>
							Cultivating the Informed Authority
						</p>
					</div>

					{/* Right — Links */}
					<div className='flex flex-wrap gap-x-6 gap-y-2'>
						{links.map((link) => (
							<a
								key={link}
								href='#'
								className='text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-navy-900'
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
