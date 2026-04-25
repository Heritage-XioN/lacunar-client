import { Button } from '@/components/ui/button';

export function ArchiveCta() {
	return (
		<div className='relative overflow-hidden rounded-lg bg-navy-900 px-8 py-10 md:px-12'>
			<div className='relative z-10 max-w-md'>
				<h2 className='font-serif text-2xl font-semibold italic text-white md:text-3xl'>
					Request an Expert Peer Review
				</h2>
				<p className='mt-4 text-sm leading-relaxed text-slate-300'>
					Elevate your recorded consultations with a secondary layer of
					scrutiny. Our senior partners can provide an annotated critique of the
					strategic decisions documented in your archive.
				</p>
				<Button
					type='button'
					className='mt-6 bg-gold-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-950 hover:bg-gold-400'
				>
					Initiate Review Sequence
				</Button>
			</div>

			{/* Decorative watermark */}
			<div className='pointer-events-none absolute right-8 bottom-4 select-none opacity-10 md:right-16'>
				<span className='font-serif text-[120px] italic leading-none text-slate-300 md:text-[160px]'>
					the
				</span>
			</div>
		</div>
	);
}
