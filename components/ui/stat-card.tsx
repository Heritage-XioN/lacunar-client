interface StatCardProps {
	value: string;
	label: string;
}

export function StatCard({ value, label }: StatCardProps) {
	return (
		<div className='bg-gold-500 px-8 py-6'>
			<p className='text-3xl font-bold text-navy-950 font-[family-name:var(--font-heading)] md:text-2xl'>
				{value}
			</p>
			<p className='mt-1 text-xs font-semibold uppercase tracking-widest text-navy-900/70'>
				{label}
			</p>
		</div>
	);
}
