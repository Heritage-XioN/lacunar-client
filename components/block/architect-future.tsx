import { Button } from '../ui/button';

export function ArchitectFuture() {
	return (
		<section className='bg-white py-16 sm:py-24'>
			<div className='mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16'>
				{/* Heading */}
				<h2 className='text-3xl font-semibold italic tracking-tight text-navy-900 sm:text-4xl lg:text-5xl'>
					Architect your future.
				</h2>

				{/* Subtitle */}
				<p className='mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-500'>
					Engage with our strategic advisors about navigating your institution&apos;s
					specific challenges.
				</p>

				{/* CTAs */}
				<div className='mt-10 flex flex-col justify-center gap-4 sm:flex-row'>
					<Button
						variant='primary'
						className='px-7 py-3.5 text-xs uppercase tracking-wider'
						type='button'
					>
						Request Strategic Consultation
					</Button>
					<Button
						variant='outline'
						className='px-7 py-3.5 text-xs uppercase tracking-wider text-navy-900 border-navy-900/20 hover:bg-navy-900/5'
						type='button'
					>
						Download Methodology Whitepaper
					</Button>
				</div>
			</div>
		</section>
	);
}
