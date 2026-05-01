'use client';

import { Button } from '@/components/ui/button';
import { DraftSummaryForm } from './draft-summary-form';
import useSWR from 'swr';
import { consultationSession } from '@/types/consultation-session';
import { Skeleton } from '@/components/ui/skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function IntakeResponsesSkeleton() {
	return (
		<div className='mt-6 space-y-5'>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i}>
					<Skeleton className='h-2 w-24' />
					<Skeleton className='mt-2 h-4 w-3/4' />
				</div>
			))}
		</div>
	);
}

export function SummarySidebar({ id }: { id: string }) {
	const { data } = useSWR<{ data: consultationSession[] }>(
		`/api/consultations/${id}`,
		fetcher,
	);
	const onBoardingDetails = data?.data?.[0]?.onBoardingDetails;
	return (
		<div className='lg:sticky lg:top-10'>
			{/* Label */}
			<p className='text-xs font-semibold uppercase tracking-[0.25em] text-slate-400'>
				Institutional Memory
			</p>

			{/* Title */}
			<h1 className='mt-2 font-serif text-4xl font-bold text-navy-900 md:text-5xl'>
				Consultation
				<br />
				History
			</h1>

			{/* Description */}
			<p className='mt-4 max-w-xs text-sm leading-relaxed text-slate-500'>
				A definitive log of the consultation summary.
			</p>

			{/* Draft New summary Card */}
			<div className='mt-8 border border-slate-100 bg-white p-6'>
				<p className='font-serif text-[17px] italic text-navy-900'>
					Draft New summary
				</p>
				<DraftSummaryForm id={id} />
			</div>

			{/* Initial Intake Responses Card */}
			<div className='mt-6 border border-slate-100 bg-white p-6'>
				<p className='font-serif text-[17px] text-navy-900'>Intake Responses</p>

				{onBoardingDetails ? (
					Object.entries(onBoardingDetails).map(([key, value], idx) => (
						<div key={key} className={idx === 0 ? 'mt-6' : 'mt-5'}>
							<p className='text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400'>
								{key.replace(/([A-Z])/g, ' $1').trim()}
							</p>
							<p className='mt-1 text-sm leading-relaxed text-navy-900'>
								{Array.isArray(value)
									? value.join(', ')
									: value != null
										? String(value)
										: 'N/A'}
							</p>
						</div>
					))
				) : (
					<IntakeResponsesSkeleton />
				)}
			</div>
		</div>
	);
}
