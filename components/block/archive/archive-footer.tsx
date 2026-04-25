const footerLinks = [
	{ group: [{ label: 'Support' }, { label: 'Privacy Protocol' }] },
	{ group: [{ label: 'Archive Settings' }, { label: 'Security Audit' }] },
];

export function ArchiveFooter() {
	return (
		<footer className='border-t border-slate-200 bg-white'>
			<div className='mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 lg:px-16'>
				{/* Left — Brand */}
				<div>
					<p className='font-serif text-base font-semibold text-navy-900'>
						Stratagem
					</p>
					<p className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
						Informed Authority
					</p>
				</div>

				{/* Center — Links */}
				<div className='flex flex-wrap gap-x-10 gap-y-1'>
					{footerLinks.map((col, colIdx) => (
						<div key={colIdx} className='flex flex-col gap-1'>
							{col.group.map((link) => (
								<a
									key={link.label}
									href='#'
									className='text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-navy-900'
								>
									{link.label}
								</a>
							))}
						</div>
					))}
				</div>

				{/* Right — Copyright */}
				<p className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
					© 2025 The Stratagem Advisory. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
