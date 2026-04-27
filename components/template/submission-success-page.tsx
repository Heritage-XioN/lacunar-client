import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function SubmissionSuccessPage() {
	return (
		<div className='min-h-screen bg-[#F4F6F8] font-sans text-navy-900'>
			<main className='mx-auto max-w-5xl px-6 pt-20 pb-16 sm:px-10 lg:px-16'>
				{/* Icon */}
				<div className='flex justify-center'>
					<div className='flex h-14 w-14 items-center justify-center rounded-lg bg-navy-900'>
						<CheckCircle className='h-7 w-7 text-gold-400' />
					</div>
				</div>

				{/* Heading */}
				<div className='mt-10 text-center'>
					<h1 className='font-serif text-4xl font-normal leading-tight text-navy-900 sm:text-5xl lg:text-6xl'>
						Submission Confirmed.
						<br />
						<em className='italic'>
							Our Editorial Review is
							<br />
							Underway.
						</em>
					</h1>

					<p className='mx-auto mt-8 max-w-lg text-sm leading-relaxed text-slate-500'>
						Your inquiry has been received by Lacunar's Strategic Oversight Board.
						<br />
						We treat every partnership with the architectural precision it deserves.
					</p>
				</div>

				{/* Process Cards */}
				<div className='mt-20 grid gap-6 sm:grid-cols-3'>
					{[
						{
							phase: 'Phase 01',
							title: 'Institutional\nReview',
							description:
								'A comprehensive audit of your submission by our senior partners. Expect a response within 24-48 hours.',
						},
						{
							phase: 'Phase 02',
							title: 'Advisor\nAssignment',
							description:
								'Matching your unique strategy requirements with our specialized subject matter experts.',
						},
						{
							phase: 'Phase 03',
							title: 'Initial Consultation',
							description:
								"A secure, private briefing to establish the architecture of your firm's forward trajectory.",
						},
					].map((card, index) => (
						<div
							key={index}
							className='border-l-4 border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md'
						>
							<p className='text-xs font-bold uppercase tracking-widest text-slate-400'>
								{card.phase}
							</p>
							<h3 className='mt-4 font-serif text-2xl leading-snug text-navy-900 whitespace-pre-line'>
								{card.title}
							</h3>
							<p className='mt-4 text-sm leading-relaxed text-slate-500'>
								{card.description}
							</p>
						</div>
					))}
				</div>

				{/* CTAs */}
				<div className='mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row'>
					<Link
						href='/'
						className='inline-flex items-center gap-2 bg-navy-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-navy-800'
					>
						Return to Home Page
						<ArrowRight className='h-4 w-4' />
					</Link>
					<Link
						href='/archive'
						className='inline-flex items-center gap-2 border border-slate-300 bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-navy-900 transition-colors hover:border-navy-900'
					>
						Explore Insights
					</Link>
				</div>
			</main>

			{/* Footer */}
			<footer className='border-t border-slate-200 bg-white'>
				<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:px-10 lg:px-16'>
					<p className='font-serif text-sm italic text-navy-900'>
						Lacunar Consulting Firm
					</p>
					<div className='flex flex-wrap items-center gap-6'>
						{['Privacy Policy', 'Terms of Engagement', 'Global Offices', 'Security'].map(
							(link) => (
								<a
									key={link}
									href='#'
									className='text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-navy-900'
								>
									{link}
								</a>
							),
						)}
					</div>
					<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
						© 2026 Lacunar Consulting Firm. All Rights Reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
