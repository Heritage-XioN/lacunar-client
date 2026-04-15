import { TestimonialCard } from '../ui/testimonial-card';

const testimonials = [
	{
		quote:
			'"The level of rigor Vantage brought to our restructuring was unparalleled. They didn\'t just give us a report; they rebuilt our conceptual foundation."',
		name: 'Marcus Thorne',
		role: 'CEO, Meridian Global',
		avatarSrc: '/avatar-marcus.png',
	},
	{
		quote:
			'"In a market saturated with generic advice, Vantage Strategy stands out as a beacon of intellectual authority. Their insights are sharp, actionable, and visionary."',
		name: 'Elena Rodriguez',
		role: 'VP Operations, Nexus Tech',
		avatarSrc: '/avatar-elena.png',
	},
	{
		quote:
			'"They possess a rare ability to synthesize complex data into a narrative that drives internal alignment. They are truly masters of the institutional editorial style."',
		name: 'Dr. Julian Vance',
		role: 'Director, Heritage Institute',
		avatarSrc: '/avatar-julian.png',
	},
];

export function Testimonials() {
	return (
		<section className='bg-slate-50 py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				{/* Section header */}
				<div className='mb-14'>
					<p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>
						Selected Testimonials
					</p>
					<h2 className='mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl'>
						Voices of Authority
					</h2>
				</div>

				{/* Testimonial cards */}
				<div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
					{testimonials.map((item) => (
						<TestimonialCard
							key={item.name}
							quote={item.quote}
							name={item.name}
							role={item.role}
							avatarSrc={item.avatarSrc}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
