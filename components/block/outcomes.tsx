import { OutcomeItem } from '../ui/outcome-item';

const stats = [
	{ value: '40%', label: 'Average Market Share Growth' },
	{ value: '22+', label: 'Industries Served Globally' },
	{ value: '$4.2B', label: 'Client Value Generated' },
	{ value: '98%', label: 'Strategic Alignment Score' },
];

const outcomes = [
	{
		title: 'Market Position Resilience',
		description:
			'Avg. 55% increase in sustained market share via diversified positioning.',
		variant: 'check' as const,
	},
	{
		title: 'Operational Velocity',
		description:
			'37% reduction in time-to-deployment for a portfolio of strategic imperatives.',
		variant: 'alert' as const,
	},
];

export function Outcomes() {
	return (
		<section className='bg-slate-50 py-16 sm:py-24'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='grid gap-12 lg:grid-cols-2 lg:items-start'>

					{/* Left — Text + outcome items */}
					<div className='space-y-6'>
						<h2 className='text-3xl font-semibold italic tracking-tight text-navy-900 sm:text-4xl'>
							Quantifiable<br />Strategic Outcomes
						</h2>
						<p className='max-w-md text-sm leading-relaxed text-slate-500'>
							We measure success by the durability of the
							transformation and the consistently high value delivered to
							our partner institutions.
						</p>

						<div className='space-y-5 pt-4'>
							{outcomes.map((item) => (
								<OutcomeItem
									key={item.title}
									title={item.title}
									description={item.description}
									variant={item.variant}
								/>
							))}
						</div>
					</div>

					{/* Right — Stats grid */}
					<div className='grid grid-cols-2 gap-px bg-navy-800/20'>
						{stats.map((stat) => (
							<div
								key={stat.label}
								className='bg-gold-500 p-8'
							>
								<p className='font-sans text-3xl font-bold text-navy-950 sm:text-4xl'>
									{stat.value}
								</p>
								<p className='mt-2 text-xs font-semibold uppercase tracking-widest text-navy-900/60'>
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
