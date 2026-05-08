export function CategoriesHeader() {
	return (
		<div className='bg-white px-6 py-20 sm:px-10 lg:px-16'>
			<div className='mx-auto max-w-7xl flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
				{/* Left side: Label and Title */}
				<div className='max-w-2xl'>
					<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
						Explore
					</p>
					<h1 className='mt-6 font-serif text-5xl font-normal text-navy-900 md:text-6xl lg:text-7xl'>
						What we do
					</h1>
				</div>

				{/* Right side: Description */}
				<div className='lg:mb-4 lg:w-1/3'>
					<div className='border-l border-slate-300 pl-6'>
						<p className='text-sm leading-relaxed text-slate-500'>
							We help organizations make better decisions using clear thinking
							and proven methods. Every step we take is well thought out and
							focused on getting real results.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
