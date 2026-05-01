'use client';

import { User, ChevronDown } from 'lucide-react';
import useSWR from 'swr';

interface TimelineEntry {
	createdAt: string;
	title: string;
	summary: string;
	consultant: consultants;
}

import { Skeleton } from '@/components/ui/skeleton';
import { consultants } from '@/types/consultants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SummaryTimelineSkeleton() {
	return (
		<div className='relative pb-10'>
			<div className='absolute left-0 top-1.5 flex flex-col items-center h-full'>
				<Skeleton className='h-2 w-2 rounded-full' />
				<div className='mt-2 w-px flex-1 bg-slate-100' />
			</div>
			<div className='pl-8'>
				<div className='flex flex-wrap items-center justify-between gap-2'>
					<Skeleton className='h-3 w-24' />
				</div>
				<Skeleton className='mt-3 h-8 w-3/4' />
				<div className='mt-4 space-y-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-11/12' />
					<Skeleton className='h-4 w-4/5' />
				</div>
				<div className='mt-6 flex flex-wrap items-center gap-8'>
					<div className='flex items-center gap-2'>
						<Skeleton className='h-3.5 w-3.5 rounded-full' />
						<Skeleton className='h-3 w-32' />
					</div>
				</div>
			</div>
		</div>
	);
}

export function SummaryTimeline({ id }: { id: string }) {
	const { data, isLoading } = useSWR<TimelineEntry[]>(
		`/api/summary/${id}`,
		fetcher,
	);

	return (
		<div className='relative'>
			{/* Timeline entries */}
			{isLoading || !data ? (
				<div className='space-y-0'>
					{Array.from({ length: 3 }).map((_, i) => (
						<SummaryTimelineSkeleton key={i} />
					))}
				</div>
			) : (
				<div className='space-y-0'>
					{data.map((entry, idx) => (
						<div key={idx} className='relative pb-10'>
							{/* Timeline dot + line */}
							<div className='absolute left-0 top-1.5 flex flex-col items-center'>
								{idx === 0 ? (
									<div className='h-2 w-2 rounded-full bg-[#fcd34d]' />
								) : (
									<div className='h-2 w-2 rounded-full bg-slate-300' />
								)}
								{idx < data.length - 1 && (
									<div
										className='mt-2 w-px flex-1 bg-slate-100'
										style={{ minHeight: '100%' }}
									/>
								)}
							</div>

							{/* Content */}
							<div className='pl-8'>
								{/* Top row: date + badge */}
								<div className='flex flex-wrap items-center justify-between gap-2'>
									<p className='text-[10px] font-semibold tracking-widest text-slate-500'>
										{entry.createdAt}
									</p>
								</div>

								{/* Title */}
								<h3 className='mt-3 font-serif text-2xl font-normal text-navy-900 md:text-3xl'>
									{entry.title}
								</h3>

								{/* Description */}
								<p className='mt-4 text-sm leading-relaxed text-slate-600'>
									{entry.summary}
								</p>

								{/* Footer: consultant */}
								<div className='mt-6 flex flex-wrap items-center gap-8'>
									<div className='flex items-center gap-2'>
										<User className='h-3.5 w-3.5 text-slate-500' />
										<span className='text-xs text-slate-600'>
											{entry.consultant.fullName}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Load Legacy Archives */}
			<div className='mt-8 border-t border-slate-100 pt-8 flex justify-center'>
				<button
					type='button'
					className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 transition-colors hover:text-navy-900'
				>
					Load Legacy Archives
					<ChevronDown className='h-3 w-3' />
				</button>
			</div>
		</div>
	);
}
