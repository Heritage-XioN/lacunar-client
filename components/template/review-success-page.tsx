'use client';

import Link from 'next/link';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReviewSuccessPage() {
	return (
		<div className='min-h-screen bg-slate-100/60 font-sans text-navy-900'>
			{/* Subtle diagonal texture background */}
			<div className='fixed inset-0 pointer-events-none opacity-[0.03]'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage:
							'repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)',
					}}
				/>
			</div>

			{/* Centered Card */}
			<div className='relative flex min-h-screen items-center justify-center px-6 py-20'>
				<div className='w-full max-w-xl'>
					{/* Main Confirmation Card */}
					<div className='bg-white px-10 py-16 text-center shadow-sm md:px-16 md:py-20'>
						{/* Badge Icon */}
						<div className='mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 shadow-sm'>
							<BadgeCheck className='h-8 w-8 text-navy-900' />
						</div>

						{/* Heading */}
						<h1 className='font-serif text-3xl font-normal italic text-navy-900 sm:text-4xl lg:text-5xl'>
							Review Submitted
						</h1>

						{/* Description */}
						<p className='mx-auto mt-6 max-w-sm text-sm leading-relaxed text-slate-500'>
							Your strategic perspective has been committed to our institutional
							archives. We appreciate your contribution to the architectural
							rigor of our practice.
						</p>

						{/* CTA */}
						<div className='mt-8'>
							<Button
								asChild
								className='min-w-60 rounded-none bg-navy-900 px-10 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800'
							>
								<Link href='/'>
									Return to Home Page
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
