import Image from 'next/image';

interface TestimonialCardProps {
	quote: string;
	name: string;
	role: string;
	avatarSrc: string;
}

export function TestimonialCard({ quote, name, role, avatarSrc }: TestimonialCardProps) {
	return (
		<div className='flex flex-col justify-between border border-slate-200 bg-white p-8'>
			<p className='text-sm leading-relaxed text-slate-600'>
				{quote}
			</p>
			<div className='mt-8 flex items-center gap-4 border-t border-slate-100 pt-6'>
				<Image
					src={avatarSrc}
					alt={name}
					width={44}
					height={44}
					className='h-11 w-11 rounded-full object-cover'
				/>
				<div>
					<p className='text-sm font-semibold text-navy-900 font-[family-name:var(--font-body)]'>
						{name}
					</p>
					<p className='text-xs text-slate-500'>
						{role}
					</p>
				</div>
			</div>
		</div>
	);
}
