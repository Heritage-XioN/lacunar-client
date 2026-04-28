'use client';

import useSWR from 'swr';
import { ReviewsCard } from '../ui/reviews-card';
import { Suspense } from 'react';
import { ReviewsCarddb } from '@/types/reviews';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ReviewsSection() {
	const { data, error, isLoading } = useSWR<ReviewsCarddb[]>(
		'/api/review',
		fetcher,
	);

	if (!data) {
		return null;
	}
	return (
		<section className='bg-slate-50 py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				{/* Section header */}
				<div className='mb-14'>
					<p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>
						Selected Testimonials
					</p>
					<h2 className='mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl'>
						Voices of Authority
					</h2>
				</div>
				<div className='min-h-65'>
					{/* Testimonial cards */}
					<Suspense fallback={<p>Loading posts from database...</p>}>
						<div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3 '>
							{data.map((item) => (
								<ReviewsCard
									key={item.id}
									feedback={item.feedback}
									fullName={item.fullName}
									role={item.role}
									social={item.social}
									organisation={item.organisation}
								/>
							))}
						</div>
					</Suspense>
				</div>
			</div>
		</section>
	);
}
