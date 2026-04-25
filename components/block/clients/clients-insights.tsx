import { ArrowRight, BarChart3, ShieldCheck } from 'lucide-react';

export function ClientsInsights() {
	return (
		<div className='grid gap-6 md:grid-cols-5'>
			{/* Left — The Precision Mandate Card */}
			<div className='relative overflow-hidden rounded-lg bg-navy-900 px-8 py-8 md:col-span-3'>
				{/* Content */}
				<div className='relative z-10 max-w-sm'>
					<h2 className='font-serif text-2xl font-semibold italic text-white md:text-3xl'>
						The Precision Mandate.
					</h2>
					<p className='mt-4 text-sm leading-relaxed text-slate-300'>
						Every client interaction is a brick in the architecture of modern
						authority. Review the latest strategic insights to maintain a
						competitive advantage.
					</p>
					<a
						href='#'
						className='mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white underline underline-offset-4 transition-colors hover:text-gold-400'
					>
						View Quarterly Insights
						<ArrowRight className='h-3.5 w-3.5' />
					</a>
				</div>

				{/* Shield Decorative Element */}
				<div className='absolute right-6 bottom-4 opacity-20 md:opacity-30'>
					<ShieldCheck className='h-32 w-32 text-navy-700' strokeWidth={1} />
				</div>
			</div>

			{/* Right — Client Retention Stat */}
			<div className='flex flex-col justify-between rounded-lg border border-slate-200 bg-white px-6 py-6 md:col-span-2'>
				<div>
					<div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-100'>
						<BarChart3 className='h-4 w-4 text-navy-900' />
					</div>
					<p className='mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
						Client Retention
					</p>
				</div>

				<div>
					<p className='font-serif text-5xl font-bold text-navy-900'>94.2%</p>
					{/* Progress bar */}
					<div className='mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100'>
						<div className='h-full w-[94.2%] rounded-full bg-navy-900' />
					</div>
				</div>
			</div>
		</div>
	);
}
