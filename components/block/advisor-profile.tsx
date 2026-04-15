import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

export function AdvisorProfile() {
	return (
		<aside className='space-y-6'>
			{/* Headshot */}
			<div className='relative aspect-[3/4] w-full max-w-[280px] overflow-hidden'>
				<Image
					src='/avatar-alistair.png'
					alt='Dr. Alistair Thorne'
					fill
					className='object-cover object-top'
					priority
				/>
			</div>

			{/* Name & title */}
			<div>
				<h2 className='text-2xl font-semibold italic text-navy-900 sm:text-3xl'>
					Dr. Alistair Thorne
				</h2>
				<p className='mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400'>
					Principal Advisor
				</p>
			</div>

			{/* Bio */}
			<p className='max-w-xs text-sm leading-relaxed text-slate-500'>
				Navigating the nexus of institutional legacy and disruptive foresight.
				Dr. Thorne provides the intellectual scaffolding required for high-stakes
				strategic pivots.
			</p>

			{/* Badges */}
			<div className='space-y-3'>
				<div className='flex items-center gap-2'>
					<BadgeCheck className='h-4 w-4 text-gold-500' />
					<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900'>
						Verified Expert Authority
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<BadgeCheck className='h-4 w-4 text-gold-500' />
					<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900'>
						Global Strategy Liaison
					</span>
				</div>
			</div>
		</aside>
	);
}
