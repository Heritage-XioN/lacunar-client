import { Button } from '../ui/button';

export function ModernizationCta() {
	return (
		<section className='bg-navy-950 py-16 sm:py-24'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='grid gap-px overflow-hidden lg:grid-cols-2'>

					{/* Left — Gold accent panel */}
					<div className='bg-gold-500 p-10 sm:p-14'>
						<p className='text-xs font-bold uppercase tracking-widest text-navy-900/60'>
							Capability: Institutional Transformation
						</p>
						<h2 className='mt-4 max-w-sm text-3xl font-semibold italic leading-tight text-navy-950 sm:text-4xl'>
							Orchestrating the Great Modernization
						</h2>
						<p className='mt-5 max-w-sm text-sm leading-relaxed text-navy-900/70'>
							Moving organizations past traditional 10-year analytical frameworks
							into the digital age, embedding GCTs in strategic capital
							with transparent process and distributed leverage.
						</p>
						<div className='mt-8'>
							<Button
								variant='secondary'
								className='bg-navy-950 text-white border-navy-950 px-6 py-3 text-xs uppercase tracking-wider hover:bg-navy-900'
								type='button'
							>
								Explore Methodology
							</Button>
						</div>
					</div>

					{/* Right — Dark panel */}
					<div className='bg-navy-900 p-10 sm:p-14'>
						<p className='text-sm leading-relaxed text-slate-400'>
							Redefining legacy systems and siloed organizational
							structures: precisely positioning capital resources in Product
							Architecture.
						</p>
						<div className='mt-8 space-y-6'>
							<div>
								<p className='font-sans text-sm font-semibold text-white'>
									Implementing &lsquo;Parallel Governance&rsquo;
								</p>
								<p className='mt-1 text-xs leading-relaxed text-slate-500'>
									A proven strategy for re-defining the relationship of
									digital, traditional, and blended workforce: converging critical legacy
									structures.
								</p>
							</div>
							<div>
								<p className='font-sans text-sm font-semibold text-white'>
									Precision Architecture
								</p>
								<p className='mt-1 text-xs leading-relaxed text-slate-500'>
									Strategic re-engineering of organizational topology to maximize
									operational efficiency and minimize transitional friction.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
