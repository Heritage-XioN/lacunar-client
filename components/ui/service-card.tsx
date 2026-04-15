import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
	return (
		<div className='group flex flex-col border border-slate-200 bg-white p-8 transition-shadow duration-300 hover:shadow-lg'>
			<div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-white'>
				<Icon className='h-5 w-5' />
			</div>
			<h3 className='text-lg font-semibold text-navy-900 font-[family-name:var(--font-body)]'>
				{title}
			</h3>
			<p className='mt-3 text-sm leading-relaxed text-slate-500'>
				{description}
			</p>
		</div>
	);
}
