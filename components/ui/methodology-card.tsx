interface MethodologyCardProps {
	number: string;
	title: string;
	description: string;
	icon: React.ReactNode;
}

export function MethodologyCard({ number, title, description, icon }: MethodologyCardProps) {
	return (
		<div className='flex flex-col'>
			{/* Number badge */}
			<span className='text-xs font-bold text-gold-500 font-[family-name:var(--font-body)]'>
				{number}
			</span>

			{/* Title */}
			<h3 className='mt-3 text-xl font-semibold text-navy-900 font-[family-name:var(--font-heading)]'>
				{title}
			</h3>

			{/* Description */}
			<p className='mt-3 text-sm leading-relaxed text-slate-500'>
				{description}
			</p>

			{/* Icon */}
			<div className='mt-6'>
				{icon}
			</div>
		</div>
	);
}
