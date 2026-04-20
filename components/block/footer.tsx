const navigation = ['Services', 'About', 'Case Studies', 'Insights'];
const connect = ['LinkedIn', 'Privacy Policy', 'Terms of Service'];

export function Footer() {
	return (
		<footer className='bg-navy-950 text-slate-400'>
			<div className='mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16'>
				<div className='grid gap-10 md:grid-cols-[1.6fr_0.9fr_0.9fr]'>
					{/* Brand */}
					<div>
						<p className='text-sm font-bold uppercase tracking-widest text-white'>
							LACUNAR CONSULTING FIRM
						</p>
						<p className='mt-4 max-w-md text-sm leading-relaxed text-slate-500'>
							Curated execution for the modern institution. We provide the
							architectural framework for high-stakes decisions and sustainable
							legacy building.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
							Navigation
						</p>
						<ul className='mt-5 space-y-3'>
							{navigation.map((item) => (
								<li key={item}>
									<a
										href='#'
										className='text-sm text-slate-400 transition-colors duration-200 hover:text-white'
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Connect */}
					<div>
						<p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
							Connect
						</p>
						<ul className='mt-5 space-y-3'>
							{connect.map((item) => (
								<li key={item}>
									<a
										href='#'
										className='text-sm text-slate-400 transition-colors duration-200 hover:text-white'
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Copyright bar */}
				<div className='mt-14 border-t border-slate-800 pt-8'>
					<p className='text-xs text-slate-600'>
						© 2024 VANTAGE STRATEGY. All rights reserved. Crafted with architectural precision.
					</p>
				</div>
			</div>
		</footer>
	);
}
