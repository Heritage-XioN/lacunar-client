import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export function Hero() {
	return (
		<section className='relative isolate min-h-[600px] overflow-hidden bg-navy-900 pt-24 pb-20 sm:min-h-[700px] sm:pt-32 sm:pb-28'>
			{/* Background image */}
			<Image
				src='/hero-cityscape.png'
				alt='City skyline'
				fill
				className='z-0 object-cover object-[58%_center] sm:object-center'
				priority
				quality={90}
			/>

			{/* Dark gradient overlay */}
			<div className='absolute inset-0 z-10 bg-navy-950/75 sm:bg-navy-950/25' />
			<div className='absolute inset-0 z-10 bg-linear-to-r from-navy-950/90 via-navy-950/75 to-navy-900/60' />
			<div className='absolute inset-0 z-10 bg-linear-to-t from-navy-950/80 via-transparent to-navy-950/40' />

			{/* Content */}
			<div className='relative z-20 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='max-w-2xl space-y-6'>
					{/* Label */}
					<p className='text-xs font-semibold uppercase tracking-widest text-gold-400'>
						Strategy &amp; Growth
					</p>

					{/* Heading */}
					<h1 className='text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl'>
						<em className='font-normal italic text-gold-300'>Purpose </em> and
						innovation.
					</h1>

					{/* Subtitle */}
					<p className='max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg'>
						We exists to bridge structural gaps in African startups, using
						innovative, system-driven solutions to build scalable, high-impact
						businesses.
					</p>

					{/* CTAs */}
					<div className='flex flex-col gap-4 pt-2 sm:flex-row '>
						<Button
							variant='primary'
							className='px-5 py-2.5 text-xs uppercase tracking-wider'
							type='button'
							asChild
						>
							<Link href='/consultation-categories'>
								Book a Consultation <ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>

						<Button
							variant='outline'
							className='px-7 py-3 text-sm'
							type='button'
						>
							View Case Studies
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
