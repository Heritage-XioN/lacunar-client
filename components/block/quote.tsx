import { Sparkles } from 'lucide-react';

export function QuoteSection() {
	return (
		<section className='bg-navy-900 py-20 sm:py-28'>
			<div className='mx-auto max-w-4xl px-6 text-center sm:px-10 lg:px-16'>
				{/* Decorative icon */}
				<div className='mb-8 flex justify-center'>
					<Sparkles className='h-6 w-6 text-gold-500' />
				</div>

				{/* Quote */}
				<blockquote>
					<p className='text-xl leading-relaxed text-white sm:text-2xl lg:text-3xl'>
						&ldquo;{' '}
						<em className='font-semibold italic text-gold-400 underline decoration-gold-500/40 underline-offset-4'>
							To work with Lacunar is to experience purpose in motion;
						</em>{' '}
						where ambition is refined, responsibility is embraced, and wealth
						becomes a tool foor shaping Africas future .&rdquo;
					</p>
				</blockquote>

				{/* Attribution */}
				<p className='mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>
					— The Lacunar Voice
				</p>
			</div>
		</section>
	);
}
