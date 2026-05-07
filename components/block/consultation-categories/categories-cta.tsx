export function CategoriesCta() {
	return (
		<div className='relative overflow-hidden bg-navy-950 px-6 py-32 text-center sm:px-10 lg:px-16'>
			{/* Geometric X Background */}
			<div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-20'>
				<div className='absolute h-[200%] w-px -rotate-45 bg-gradient-to-b from-transparent via-slate-500 to-transparent' />
				<div className='absolute h-[200%] w-px rotate-45 bg-gradient-to-b from-transparent via-slate-500 to-transparent' />
			</div>

			<div className='relative z-10 mx-auto max-w-4xl'>
				<p className='text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400'>
					Getting It Right
				</p>
				<h2 className='times mt-8 text-4xl font-normal text-gold-500 sm:text-5xl md:text-6xl'>
					Simple, clear, and done properly <br className='hidden sm:block' />
					that’s what makes things work best.
				</h2>
			</div>

			{/* Vertical Line Accent */}
			<div className='relative z-10 mx-auto mt-20 h-16 w-px bg-gradient-to-b from-slate-500 to-transparent' />
		</div>
	);
}
