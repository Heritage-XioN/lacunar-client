import { Button } from '../ui/button';
import { StatCard } from '../ui/stat-card';

const stats = [
	{
		value: 'Millions of naira in managed assets and investment activity.',
		label: 'Substantial Portfolio Growth',
	},
	{
		value:
			'Connected to some of Nigeria’s largest student investment societies.',
		label: 'Institutional Foundation',
	},
	{
		value:
			'Access to an international network of finance professionals and consultants.',
		label: 'Global Expert Network',
	},
];

export function CtaSection() {
	return (
		<section className='bg-navy-950 py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
					{/* Left — Text + CTAs */}
					<div className='space-y-6'>
						<h2 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl'>
							Ready to build your{' '}
							<em className='italic text-gold-300'>Legacy?</em>
						</h2>
						<p className='max-w-lg text-base leading-relaxed text-slate-400'>
							Lets help you build assets that funds your lifestyle
						</p>
						{/* <div className='flex flex-col gap-4 pt-2 sm:flex-row'>
							<Button
								variant='primary'
								className='px-7 py-3 text-sm'
								type='button'
							>
								Book a Consultation
							</Button>
							<Button
								variant='secondary'
								className='px-7 py-3 text-sm'
								type='button'
							>
								Inquire Directly
							</Button>
						</div> */}
					</div>

					{/* Right — Stat cards */}
					<div className='grid gap-px bg-gold-400/30 overflow-hidden rounded-sm'>
						{stats.map((item) => (
							<StatCard
								key={item.label}
								value={item.value}
								label={item.label}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
