import { BarChart3, Boxes, Target } from 'lucide-react';
import { MethodologyCard } from '../ui/methodology-card';

const steps = [
	{
		number: '01',
		title: 'Diagnostic Analysis',
		description:
			'A multi-layered audit of organizational health, market position, and current portfolio to pinpoint latent risk.',
		icon: <BarChart3 className='h-5 w-5 text-slate-400' />,
	},
	{
		number: '02',
		title: 'Structural Modeling',
		description:
			'Design transformative strategy scenarios and stress-test for future-fit adaptability: rigorous analysis and technological disruption.',
		icon: <Boxes className='h-5 w-5 text-slate-400' />,
	},
	{
		number: '03',
		title: 'Execution Framework',
		description:
			'Translate strategic architecture into a rigorous operational roadmap: priorities, timelines, accountability, scalability.',
		icon: <Target className='h-5 w-5 text-slate-400' />,
	},
];

export function Methodology() {
	return (
		<section className='bg-white py-16 sm:py-24'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				{/* Section header */}
				<div className='max-w-xl'>
					<h2 className='text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl'>
						The Vantage Methodology
					</h2>
					<p className='mt-4 text-sm leading-relaxed text-slate-500'>
						Our approach transcends traditional consulting by merging rigorous quantitative
						modeling with qualitative industrial intuition.
					</p>
				</div>

				{/* Methodology cards */}
				<div className='mt-14 grid gap-10 border-t border-slate-100 pt-10 sm:grid-cols-2 lg:grid-cols-3'>
					{steps.map((step) => (
						<MethodologyCard
							key={step.number}
							number={step.number}
							title={step.title}
							description={step.description}
							icon={step.icon}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
