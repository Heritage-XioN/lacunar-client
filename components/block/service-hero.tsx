import Image from 'next/image';

export function ServiceHero() {
	return (
		<section className='relative overflow-hidden bg-navy-900'>
			{/* Background image */}
			<Image
				src='/hero-architecture.png'
				alt='Modern architecture'
				fill
				className='object-cover object-center opacity-40'
				priority
				quality={85}
			/>

			{/* Gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-900/50' />
			<div className='absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent' />

			{/* Content */}
			<div className='relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24'>
				{/* Badge */}
				<div className='mb-6'>
					<span className='inline-block bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy-950'>
						Strategic Planning
					</span>
				</div>

				{/* Heading */}
				<h1 className='max-w-lg text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl'>
					Strategic Planning
				</h1>

				{/* Subtitle */}
				<p className='mt-4 max-w-md text-base italic leading-relaxed text-slate-300 sm:text-lg'>
					Navigating Institutional Legacy and Disruptive
					Foresight to architect sustainable competitive
					advantage.
				</p>
			</div>
		</section>
	);
}
