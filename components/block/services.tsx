import { BarChart3, Globe, LineChart, Settings } from 'lucide-react';
import { ServiceCard } from '../ui/service-card';

const services = [
	{
		title: 'Strategic Planning',
		description:
			'Long-term visioning and tactical roadmaps that ensure sustainable growth and market dominance.',
		icon: BarChart3,
	},
	{
		title: 'Digital Transformation',
		description:
			'Modernizing legacy systems with bespoke technological stacks tailored to your organizational DNA.',
		icon: Globe,
	},
	{
		title: 'Market Analysis',
		description:
			'Deep dive intelligence and competitive mapping to identify untapped opportunities and mitigate risk.',
		icon: LineChart,
	},
	{
		title: 'Operational Excellence',
		description:
			'Streamlining internal architectures for peak performance and unprecedented resource efficiency.',
		icon: Settings,
	},
];

export function Services() {
	return (
		<section className='bg-white py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				{/* Section header */}
				<div className='max-w-2xl'>
					<h2 className='text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl'>
						Core Service Areas
					</h2>
					<p className='mt-4 text-sm leading-relaxed text-slate-500 sm:text-base'>
						We operate at the intersection of traditional wisdom and digital frontiers. Our
						services are designed for leaders who demand rigorous analysis
						and architectural execution.
					</p>
				</div>

				{/* Service cards grid */}
				<div className='mt-14 grid gap-px bg-slate-200 border border-slate-200 sm:grid-cols-2 lg:grid-cols-4'>
					{services.map((service) => (
						<ServiceCard
							key={service.title}
							icon={service.icon}
							title={service.title}
							description={service.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
