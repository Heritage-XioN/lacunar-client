import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

export function Hero() {
	return (
		<section className='relative min-h-[600px] overflow-hidden bg-navy-900 pt-24 pb-20 sm:min-h-[700px] sm:pt-32 sm:pb-28'>
			{/* Background image */}
			<Image
				src='/hero-cityscape.png'
				alt='City skyline'
				fill
				className='object-cover object-center'
				priority
				quality={90}
			/>

			{/* Dark gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-900/60' />
			<div className='absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/40' />

			{/* Content */}
			<div className='relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='max-w-2xl space-y-6'>
					{/* Label */}
					<p className='text-xs font-semibold uppercase tracking-[0.3em] text-gold-400'>
						Strategy &amp; Growth
					</p>

					{/* Heading */}
					<h1 className='text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl'>
						<em className='italic text-gold-300 not-italic font-normal' style={{ fontStyle: 'italic' }}>Purpose </em>{' '}
						and innovation.
					</h1>

					{/* Subtitle */}
					<p className='max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg'>
						We exists to bridge structural gaps in African startups, using innovative, system-driven solutions to build scalable, high-impact businesses.
					</p>

					{/* CTAs */}
					<div className='flex flex-col gap-4 pt-2 sm:flex-row'>
						<Button
							variant='primary'
							className='px-7 py-3 text-sm'
							type='button'
						>
							Get Started
							<ArrowRight className='ml-2 h-4 w-4' />
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
