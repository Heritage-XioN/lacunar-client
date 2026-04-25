import { Button } from '@/components/ui/button';

export function ArchiveSidebar() {
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
				A definitive log of strategic interventions, executive dialogues, and
				tactical shifts. Each session represents a milestone in the evolution of
				project authority.
			</p>

			{/* Draft New Editorial Card */}
			<div className='mt-8 rounded-lg border border-slate-200 bg-white p-5'>
				<p className='font-serif text-base italic text-navy-900'>
					Draft New Editorial
				</p>
				<p className='mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400'>
					Executive Summary
				</p>
				<textarea
					placeholder="Capture the core insight of today's briefing..."
					rows={3}
					className='mt-2 w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-300 focus:border-navy-900 focus:outline-none'
				/>
				<Button
					type='button'
					className='mt-3 w-full bg-navy-900 text-xs font-semibold uppercase tracking-widest text-white hover:bg-navy-800'
				>
					Commit to Archive
				</Button>
			</div>
		</div>
	);
}
