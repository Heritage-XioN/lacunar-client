'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { submitConsultationForm } from '@/actions/consultation';
import { sustainingFamilyWealthSchema } from '@/lib/zod-schemas';

export function SustainingFamilyWealthForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			governanceStructure: '',
			familyOpenness: '',
			familyAssets: [] as string[],
			primaryObjectives: [] as string[],
			qualitativeVision: '',
			currentObstacles: '',
			successMetric: '',
			fullName: '',
			email: '',
			phoneNumber: '',
		},

		validators: {
			onSubmit: sustainingFamilyWealthSchema,
			onBlur: sustainingFamilyWealthSchema,
		},

		onSubmit: async ({ value }) => {
			const result = await submitConsultationForm(
				'sustaining-family-wealth',
				value,
			);
			if (result.success) {
				toast.success('Family Wealth Intake Submitted Successfully!');
				router.push('/consultation-form/success');
			} else {
				toast.error(`Submission Failed: ${result.error}`);
			}
		},
	});

	return (
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900 pb-32'>
			<div className='mx-auto max-w-3xl px-4 pt-16 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-16 text-center'>
					<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
						Intake Questionnaire
					</p>
					<h1 className='mt-4 font-serif text-4xl font-normal text-navy-900 md:text-5xl lg:text-6xl'>
						Securing the Legacy of
						<br />
						Generations
					</h1>
					<p className='mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500'>
						A comprehensive alignment framework designed to capture the
						qualitative and quantitative nuances of your family's financial
						governance and long-term vision.
					</p>
				</div>

				{/* Main Form Container */}
				<div className='bg-white px-8 py-12 shadow-sm md:px-16 md:py-20'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className='space-y-20'
					>
						{/* Current State & Governance */}
						<section id='governance' className='space-y-8'>
							<div>
								<h2 className='font-serif text-2xl text-navy-900'>
									Current State & Governance
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Foundational structure and decision-making processes.
								</p>
								<div className='mt-6 h-px w-full bg-slate-200' />
							</div>

							<form.Field
								name='governanceStructure'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Governance Structure
											</FieldLabel>
											<RadioGroup
												value={field.state.value}
												onValueChange={field.handleChange}
												className='grid grid-cols-1 gap-4 sm:grid-cols-2'
											>
												{[
													{
														id: 'informal',
														label: 'Informal / Direct Control',
													},
													{ id: 'formal', label: 'Formal Family Council' },
													{ id: 'mfo', label: 'Multi-Family Office Managed' },
													{ id: 'trust', label: 'Legal Trust / Board Guided' },
												].map((opt) => (
													<div
														key={opt.id}
														className='flex items-center gap-4 border border-slate-200 p-4 transition-colors hover:border-navy-900'
													>
														<RadioGroupItem value={opt.label} id={opt.id} />
														<Label
															htmlFor={opt.id}
															className='cursor-pointer text-sm font-medium text-navy-900'
														>
															{opt.label}
														</Label>
													</div>
												))}
											</RadioGroup>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='familyOpenness'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<div className='grid gap-1'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
													Family Openness Scale (1-5)
												</FieldLabel>
												<p className='text-xs italic text-slate-500'>
													How transparent is the family regarding wealth across
													generations?
												</p>
											</div>
											<div className='mt-2 flex items-center gap-4'>
												<span className='text-[10px] uppercase tracking-widest text-slate-400'>
													Closed
												</span>
												<RadioGroup
													value={field.state.value}
													onValueChange={field.handleChange}
													className='flex justify-around gap-4'
												>
													{['1', '2', '3', '4', '5'].map((val) => (
														<div key={val} className='flex items-center'>
															<RadioGroupItem
																value={val}
																id={`scale-${val}`}
																className='h-6 w-6'
															/>
														</div>
													))}
												</RadioGroup>
												<span className='text-[10px] uppercase tracking-widest text-slate-400'>
													Open
												</span>
											</div>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='primaryObjectives'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Operating business(es)',
										'Real estate (residential, commercial, agricultural)',
										'Investment portfolio (stocks, bonds, funds)',
										'Trust or foundations',
										'Intellectual property or royalties',
										'International assets across multiple jurisdictions',
										'Art, collectibles, or other hard assets',
										'Family bank accounts or other cas reserves',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												What assets or entities are currently part of the family
												wealth picture
											</FieldLabel>
											<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
												{options.map((opt) => (
													<label
														key={opt}
														className='flex cursor-pointer items-center gap-3'
													>
														<Checkbox
															checked={field.state.value.includes(opt)}
															onCheckedChange={(checked) => {
																if (checked) {
																	field.handleChange([
																		...field.state.value,
																		opt,
																	]);
																} else {
																	field.handleChange(
																		field.state.value.filter(
																			(val) => val !== opt,
																		),
																	);
																}
															}}
														/>
														<span className='text-sm text-slate-600'>
															{opt}
														</span>
													</label>
												))}
											</div>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</section>

						{/* Goals & Vision */}
						<section id='goals' className='space-y-8'>
							<div>
								<h2 className='font-serif text-2xl text-navy-900'>
									Goals & Vision
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Long-term objectives and philosophical alignment.
								</p>
								<div className='mt-6 h-px w-full bg-slate-200' />
							</div>

							<form.Field
								name='primaryObjectives'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Intergenerational Education',
										'Business Succession',
										'Philanthropic Impact',
										'Tax Efficiency Optimization',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Primary Wealth Objectives
											</FieldLabel>
											<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
												{options.map((opt) => (
													<label
														key={opt}
														className='flex cursor-pointer items-center gap-3'
													>
														<Checkbox
															checked={field.state.value.includes(opt)}
															onCheckedChange={(checked) => {
																if (checked) {
																	field.handleChange([
																		...field.state.value,
																		opt,
																	]);
																} else {
																	field.handleChange(
																		field.state.value.filter(
																			(val) => val !== opt,
																		),
																	);
																}
															}}
														/>
														<span className='text-sm text-slate-600'>
															{opt}
														</span>
													</label>
												))}
											</div>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='qualitativeVision'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Qualitative Vision Snapshot
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Describe the desired legacy in your own words...'
												className='min-h-30 resize-none border-none bg-slate-50 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</section>

						{/* Constraints & Roadblocks */}
						<section id='constraints' className='space-y-8'>
							<div>
								<h2 className='font-serif text-2xl text-navy-900'>
									Constraints & Roadblocks
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Identifying friction points in wealth management.
								</p>
								<div className='mt-6 h-px w-full bg-slate-200' />
							</div>

							<form.Field
								name='currentObstacles'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Current Obstacles
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Legal, interpersonal, or financial limitations?'
												className='min-h-25 resize-none border-none bg-slate-50 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</section>

						{/* Success Definition */}
						<section id='success'>
							<div className='bg-[#FFF9F0] p-8 md:p-10'>
								<div className='flex items-start justify-between'>
									<div>
										<h2 className='font-serif text-2xl text-navy-900'>
											Success Definition
										</h2>
										<p className='mt-1 text-sm italic text-slate-600'>
											How will we know we have succeeded?
										</p>
									</div>
									<span className='text-[10px] font-bold uppercase tracking-widest text-red-600'>
										Mandatory
									</span>
								</div>

								<div className='mt-8'>
									<form.Field
										name='successMetric'
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field
													data-invalid={isInvalid}
													className='flex flex-col gap-3'
												>
													<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
														Success Metric (Key Performance Indicator)
													</FieldLabel>
													<input
														type='text'
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														onBlur={field.handleBlur}
														placeholder="e.g., '100% agreement on the 50-year charter by Q4'"
														className={cn(
															'w-full border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-navy-900',
															isInvalid
																? 'border-red-400'
																: 'border-transparent',
														)}
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
								</div>
							</div>
						</section>

						{/* Contact Information */}
						<section className='space-y-8'>
							<div>
								<h2 className='font-serif text-2xl text-navy-900'>
									Contact Information
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Confidential point of contact for the advisory team.
								</p>
								<div className='mt-6 h-px w-full bg-slate-200' />
							</div>

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
													className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
								<form.Field
									name='email'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5'
											>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
													Confidential Email
												</FieldLabel>
												<input
													type='email'
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
							</div>

							<form.Field
								name='phoneNumber'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-1.5 sm:col-span-2'
										>
											<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
												Phone Number
											</FieldLabel>
											<input
												type='tel'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<div className='flex flex-col items-center pt-8'>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
									children={([canSubmit, isSubmitting]) => (
										<Button
											type='submit'
											disabled={!canSubmit}
											className='w-full sm:w-auto min-w-70 rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800 cursor-pointer'
										>
											{isSubmitting
												? 'Submitting...'
												: 'Submit Strategic Intake'}
										</Button>
									)}
								/>
								<p className='mt-4 text-[9px] text-slate-400'>
									By submitting, you acknowledge that all shared data is subject
									to our Institutional Privacy Policy and Advisory Agreement.
								</p>
							</div>
						</section>
					</form>
				</div>
			</div>
		</div>
	);
}

function Label({ className, ...props }: React.ComponentProps<'label'>) {
	return (
		<label
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className,
			)}
			{...props}
		/>
	);
}
