'use client';

import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { ReviewFormValidators } from '@/lib/zod-schemas';
import { Shield } from 'lucide-react';
import { useSWRConfig } from 'swr';

const QUALITY_TIERS = [
	{ numeral: 'I', label: 'Emergent' },
	{ numeral: 'II', label: 'Competent' },
	{ numeral: 'III', label: 'Strategic' },
	{ numeral: 'IV', label: 'Exemplary' },
	{ numeral: 'V', label: 'Definitive' },
];

export function ReviewPage() {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const form = useForm({
		defaultValues: {
			engagementQuality: '',
			fullName: '',
			role: '',
			organisation: '',
			social: '',
			feedback: '',
		},

		validationLogic: revalidateLogic({
			mode: 'submit', // Before first submit, validate only on submit
			modeAfterSubmission: 'change', // After first submit, validate on every change
		}),

		validators: ReviewFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch('/api/review', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(value),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Review submitted successfully!');
					mutate('/api/review');
					form.reset();
					router.push('/review/success');
				} else {
					toast.error(`Submission failed: ${data?.error}`);
				}
			} catch (error) {
				toast.error('An unexpected error occurred');
			}
		},
	});

	return (
		<div className='min-h-screen bg-white font-sans text-navy-900'>
			{/* Header */}
			<div className='mx-auto max-w-3xl px-6 pt-20 pb-12 text-center sm:px-10'>
				<h1 className='font-serif text-4xl font-normal italic text-navy-900 sm:text-5xl lg:text-6xl'>
					Submit a Review
				</h1>
				<p className='mx-auto mt-8 max-w-lg text-sm leading-relaxed text-slate-500'>
					Your strategic perspective ensures our commitment to excellence
					remains uncompromising. Share your experience with our executive
					partnership.
				</p>
			</div>

			{/* Form Card */}
			<div className='mx-auto max-w-3xl px-6 pb-20 sm:px-10'>
				<div className='bg-slate-50 px-8 py-12 shadow-sm md:px-14 md:py-16'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className='space-y-12'
					>
						{/* Engagement Quality */}
						<form.Field
							name='engagementQuality'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-4'
									>
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Engagement Quality
										</FieldLabel>
										<div className='flex gap-0'>
											{QUALITY_TIERS.map((tier) => {
												const isSelected = field.state.value === tier.numeral;
												return (
													<button
														type='button'
														key={tier.numeral}
														onClick={() => field.handleChange(tier.numeral)}
														className={cn(
															'flex flex-1 flex-col items-center gap-1.5 border border-slate-200 px-4 py-5 transition-colors cursor-pointer',
															isSelected
																? 'bg-navy-900 text-white border-navy-900'
																: 'bg-white text-navy-900 hover:bg-slate-100',
															tier.numeral !== 'I' && '-ml-px',
														)}
													>
														<span className='font-serif text-lg'>
															{tier.numeral}
														</span>
														<span
															className={cn(
																'text-[8px] font-bold uppercase tracking-widest',
																isSelected
																	? 'text-slate-300'
																	: 'text-slate-400',
															)}
														>
															{tier.label}
														</span>
													</button>
												);
											})}
										</div>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Name & Title Row */}
						<div className='grid gap-8 sm:grid-cols-2'>
							<form.Field
								name='fullName'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-1.5'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Full Legal Name
											</FieldLabel>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g. Alistair Vance'
												className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='role'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-1.5'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Executive Title
											</FieldLabel>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g. Chief Strategy Officer'
												className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>

						{/* Organization */}
						<form.Field
							name='organisation'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Organization
										</FieldLabel>
										<input
											type='text'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='e.g. Global Sovereign Wealth Fund'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Social Media */}
						<form.Field
							name='social'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Social Media Accounts
										</FieldLabel>
										<input
											type='text'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='e.g. https://www.linkedin.com/in/johndoe'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Strategic Feedback */}
						<form.Field
							name='feedback'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-3'
									>
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Strategic Feedback & Observations
										</FieldLabel>
										<Textarea
											label=''
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='Provide a detailed account of the consultancy engagement, focusing on methodology, outcomes, and advisory depth...'
											className='min-h-44 resize-y bg-slate-100 border-slate-200 p-4 text-sm focus-visible:ring-1 focus-visible:ring-navy-900'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Submit Row */}
						<div className='flex flex-col items-end gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between'>
							<p className='max-w-xs text-[9px] leading-relaxed text-slate-400'>
								By submitting this editorial, you authorize Lacunar to include
								your insights in our annual performance summary. Identity
								remains privileged unless specified otherwise.
							</p>

							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										type='submit'
										disabled={!canSubmit}
										className='min-w-48 rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800 cursor-pointer'
									>
										{isSubmitting ? 'Submitting...' : 'Submit Review'}
									</Button>
								)}
							/>
						</div>
					</form>
				</div>
			</div>

			{/* Verified Protocol Footer */}
			<div className='border-t border-slate-200 py-8 text-center'>
				<div className='flex items-center justify-center gap-2'>
					<Shield className='h-3.5 w-3.5 text-slate-400' />
					<span className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
						Verified Institutional Protocol
					</span>
				</div>
			</div>
		</div>
	);
}
