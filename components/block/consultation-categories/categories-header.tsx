export function CategoriesHeader() {
	return (
		<div className='bg-white px-6 py-20 sm:px-10 lg:px-16'>
			<div className='mx-auto max-w-7xl flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
				{/* Left side: Label and Title */}
				<div className='max-w-2xl'>
					<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
						Institutional Intelligence
					</p>
					<h1 className='mt-6 font-serif text-5xl font-normal text-navy-900 md:text-6xl lg:text-7xl'>
						Areas of
						<br />
						<span className='italic'>Command.</span>
					</h1>
				</div>

				{/* Right side: Description */}
				<div className='lg:mb-4 lg:w-1/3'>
					<div className='border-l border-slate-300 pl-6'>
						<p className='text-sm leading-relaxed text-slate-500'>
							We deliver strategic depth through an editorial lens, ensuring
							every move is underpinned by intellectual authority and
							institutional precision.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
