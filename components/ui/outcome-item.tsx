import { Check } from 'lucide-react';

interface OutcomeItemProps {
	title: string;
	description: string;
	variant?: 'check' | 'alert';
}

export function OutcomeItem({ title, description, variant = 'check' }: OutcomeItemProps) {
	return (
		<div className='flex gap-3'>
			<div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${variant === 'check' ? 'bg-navy-900' : 'bg-gold-500'}`}>
				<Check className='h-3 w-3 text-white' />
			</div>
			<div>
				<p className='text-sm font-semibold text-navy-900 font-[family-name:var(--font-body)]'>
					{title}
				</p>
				<p className='mt-1 text-xs leading-relaxed text-slate-500'>
					{description}
				</p>
			</div>
		</div>
	);
}
