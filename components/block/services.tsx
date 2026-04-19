import { BarChart3, Globe, LineChart, Settings } from 'lucide-react';
import { ServiceCard } from '../ui/service-card';

const services = [
	{
		title: 'Personal Finance',
		description:
			'Advisory focused on helping individuals build financial discipline, manage cash flow, and grow wealth through structured planning, investment guidance, and long-term financial strategies.',
		icon: BarChart3,
	},
	{
		title: 'Sustaining Family Wealth',
		description:
			'Focused on preserving and transferring wealth across generations, including governance structures, asset protection, succession planning, and financial education for continuity.',
		icon: Globe,
	},
	{
		title: 'Business Consulting',
		description:
			'End-to-end support for businesses covering strategy development, operational restructuring, growth execution, and performance optimisation to build scalable and efficient organisations.',
		icon: LineChart,
	},
	{
		title: 'Government / NGO Consulting',
		description:
			'Advisory for public and non-profit institutions on policy design, program execution, operational efficiency, and impact measurement to ensure sustainable and measurable outcomes.',
		icon: Settings,
	},
	{
		title: 'Lacunar Business Model',
		description:
			'A unique equity-aligned consulting approach where Lacunar combines advisory with execution, partnering with clients to build systems while sharing in long-term value creation.',
		icon: Settings,
	},
	{
		title: 'Investment and capital advisory',
		description:
			'Advisory focused on capital raising, investment strategy, and financial structuring, helping clients access funding, deploy capital effectively, and maximize returns.',
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
						We focus on building sustainable financial systems and scalable organisations, combining strategic advisory with hands-on implementation across individuals, businesses, and institutions.
					</p>
				</div>

				{/* Service cards grid */}
				<div className='mt-14 grid gap-0.5 bg-slate-200 border border-slate-200 sm:grid-cols-2 lg:grid-cols-3 '>
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
