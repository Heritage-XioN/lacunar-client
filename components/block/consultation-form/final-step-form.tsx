import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalStepForm({
	form,
	onBack,
	selectedScopes,
	kickoff,
	duration,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any;
	onBack: () => void;
	selectedScopes: { value: string; title: string; description: string }[];
	kickoff: { value: string; label: string; tag: string } | null;
	duration: string;
}) {
	return (
		<div className='flex min-h-screen flex-col'>
			{/* Navbar
			<OnboardingNavbar /> */}

			<main className='mx-auto w-full max-w-3xl flex-1 px-6 pt-12 pb-8'>
				{/* Step Badge */}
				<div className='flex justify-center'>
					<span className='rounded-full bg-gold-200/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500'>
						Step 3 of 3
					</span>
				</div>

				<h1 className='mt-4 text-center font-serif text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl'>
					Review & Submit
				</h1>
				<p className='mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-slate-500'>
					Confirm your organizational strategy and engagement timeline. Once
					finalized, our advisors will begin the architectural alignment of your
					project.
				</p>

				{/* Review Card */}
				<div className='mx-auto mt-12 max-w-2xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm'>
					<div className='grid gap-8 md:grid-cols-2'>
						{/* Left — Engagement Summary */}
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Engagement Summary
							</p>
							<div className='mt-5 space-y-5'>
								{selectedScopes.map((scope) => (
									<div key={scope.value} className='flex items-start gap-3'>
										<CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-navy-900' />
										<div>
											<p className='font-serif text-base font-semibold text-navy-900'>
												{scope.title}
											</p>
											<p className='mt-0.5 text-xs leading-relaxed text-slate-500'>
												{scope.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right — Timeline & Delivery */}
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Timeline & Delivery
							</p>

							{/* Preferred Kickoff */}
							<div className='mt-5'>
								<p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-400'>
									Preferred Kickoff
								</p>
								<p className='mt-1.5'>
									<span className='font-serif text-2xl italic text-navy-900'>
										{kickoff?.label || '—'}
									</span>
									{kickoff?.tag && (
										<span className='ml-2 text-sm text-slate-400'>
											({kickoff.tag})
										</span>
									)}
								</p>
							</div>

							{/* Est. Duration */}
							<div className='mt-6'>
								<p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-400'>
									Est. Project Duration
								</p>
								<p className='mt-1.5 font-serif text-2xl text-navy-900'>
									{duration || '—'}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom — Terms + Actions */}
				<div className='mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row'>
					<p className='max-w-sm text-xs leading-relaxed text-slate-400'>
						By clicking finalize, you acknowledge our{' '}
						<a
							href='#'
							className='underline transition-colors hover:text-navy-900'
						>
							Terms of Engagement
						</a>{' '}
						and the preliminary resource allocation for your project scope.
					</p>

					<div className='flex items-center gap-4'>
						<button
							type='button'
							onClick={onBack}
							className='text-sm font-semibold text-navy-900 transition-colors hover:text-navy-700'
						>
							Back to Timeline
						</button>
						<form.Subscribe
							selector={(state: {
								canSubmit: boolean;
								isSubmitting: boolean;
							}) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]: [boolean, boolean]) => (
								<Button
									type='button'
									onClick={() => form.handleSubmit()}
									disabled={!canSubmit || isSubmitting}
									className='bg-navy-900 px-8 py-3 text-sm font-medium text-white hover:bg-navy-800'
								>
									{isSubmitting ? 'Finalizing...' : 'Finalize Onboarding'}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</div>
			</main>
		</div>
	);
}
