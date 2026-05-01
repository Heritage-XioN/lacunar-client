'use client';

import { useRouter } from 'next/navigation';
import { useForm, revalidateLogic } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { businessConsultingFormValidators } from '@/lib/zod-schemas';

export function BusinessConsultingForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			businessPhase: '',
			interventionAreas: [] as string[],
			existingSystems: [] as string[],
			recognizedBenefits: [] as string[],
			vision12Month: '',
			tomorrowQuestion: '',
			primaryBottleneck: '',
			organizationalReadiness: [4], // 4 = High Receptivity
			valueIndicator: '',
			relationshipSuccess: '',
			fullName: '',
			email: '',
			phoneNumber: '',
		},

		validationLogic: revalidateLogic({
			mode: 'submit', // Before first submit, validate only on submit
			modeAfterSubmission: 'change', // After first submit, validate on every change
		}),

		validators: businessConsultingFormValidators,
		onSubmit: async ({ value }) => {
			//'business-consulting'
			try {
				const result = await fetch('/api/consultations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						category: 'business-consulting',
						formData: value,
					}),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Business Consulting Submitted Successfully!');
					form.reset();
					router.push('/consultation-form/success');
				} else {
					toast.error(`form Submission Failed: ${data.error}`);
				}
			} catch (error) {
				toast.error('an unexpected error occured');
			}
		},
	});

	return (
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900 pb-32'>
			<div className='mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-24 text-center'>
					<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
						Consulting Intake
					</p>
					<h1 className='mt-4 font-serif text-4xl font-normal text-navy-900 md:text-5xl lg:text-6xl'>
						Lacunar Business Consulting
						<br />
						Discovery
					</h1>
					<p className='mx-auto mt-6 max-w-xl text-sm italic leading-relaxed text-slate-500'>
						Identifying the structural gaps in your business to engineer
						enduring growth.
					</p>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className='space-y-24'
				>
					{/* 01. Business Maturity */}
					<section className='space-y-8'>
						<div className='border-l-4 border-gold-500 pl-4'>
							<h2 className='font-serif text-2xl text-navy-900'>
								01. Business Maturity
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Establishing your current operational baseline.
							</p>
						</div>

						<div className='space-y-12 pl-5'>
							<form.Field
								name='businessPhase'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Which phase best describes your business?
											</FieldLabel>
											<RadioGroup
												value={field.state.value}
												onValueChange={field.handleChange}
												className='grid grid-cols-1 gap-4 sm:grid-cols-3'
											>
												{[
													{
														id: 'inception',
														label: 'Inception',
														desc: 'Establishing product-market fit and initial traction.',
													},
													{
														id: 'expansion',
														label: 'Expansion',
														desc: 'Scaling operations, team size, and market reach.',
													},
													{
														id: 'legacy',
														label: 'Legacy',
														desc: 'Refining operations, maximizing yield, and impact.',
													},
												].map((opt) => (
													<div
														key={opt.id}
														className='relative flex flex-col gap-2 bg-slate-100 p-6 transition-colors hover:bg-slate-200'
													>
														<RadioGroupItem
															value={opt.label}
															id={opt.id}
															className='absolute right-4 top-4'
														/>
														<Label
															htmlFor={opt.id}
															className='cursor-pointer font-serif text-lg text-navy-900'
														>
															{opt.label}
															<p className='text-[10px] text-slate-500'>
																{opt.desc}
															</p>
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
								name='interventionAreas'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Strategic Planning',
										'Talent Acquisition',
										'Client Relations',
										'Capital Allocation',
										'Brand Direction',
										'R&D Innovation',
									];
									return (
										<Field className='flex flex-col gap-4'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Areas requiring intervention (Select all)
											</FieldLabel>
											<div className='flex flex-wrap gap-3'>
												{options.map((opt) => {
													const isSelected = field.state.value.includes(opt);
													return (
														<button
															type='button'
															key={opt}
															onClick={() => {
																if (isSelected) {
																	field.handleChange(
																		field.state.value.filter(
																			(val) => val !== opt,
																		),
																	);
																} else {
																	field.handleChange([
																		...field.state.value,
																		opt,
																	]);
																}
															}}
															className={cn(
																'rounded-full border px-6 py-2 text-[10px] font-semibold tracking-widest transition-colors',
																isSelected
																	? 'border-navy-900 bg-navy-900 text-white'
																	: 'border-slate-300 bg-white text-navy-900 hover:border-navy-900',
															)}
														>
															{opt}
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

							<form.Field
								name='existingSystems'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Standard Operating Procedures (SOPs)',
										'CRM & Customer Lifecycle Tracking',
										'Annual Budgeting & Forecasting',
										'Defined Management Hierarchy',
									];
									return (
										<Field className='flex flex-col gap-6 bg-slate-100 p-8'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Existing systems in place
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
															className='border-slate-400'
														/>
														<span className='text-xs text-slate-600'>
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
						</div>
					</section>

					{/* 02. Vision & Outcomes */}
					<section className='space-y-8'>
						<div className='border-l-4 border-gold-500 pl-4'>
							<h2 className='font-serif text-2xl text-navy-900'>
								02. Vision & Outcomes
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Defining the metrics of success.
							</p>
						</div>

						<div className='space-y-12 pl-5'>
							<form.Field
								name='recognizedBenefits'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = ['GROWTH', 'REVENUE', 'EFFICIENCY', 'EXIT'];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Recognized Benefits (Select 2)
											</FieldLabel>
											<div className='flex gap-2 sm:gap-4'>
												{options.map((opt) => {
													const isSelected = field.state.value.includes(opt);
													return (
														<button
															type='button'
															key={opt}
															onClick={() => {
																if (isSelected) {
																	field.handleChange(
																		field.state.value.filter(
																			(val) => val !== opt,
																		),
																	);
																} else {
																	if (field.state.value.length < 2) {
																		field.handleChange([
																			...field.state.value,
																			opt,
																		]);
																	}
																}
															}}
															disabled={
																!isSelected && field.state.value.length >= 2
															}
															className={cn(
																'flex-1 border px-2 py-4 text-[10px] font-semibold tracking-widest transition-colors',
																isSelected
																	? 'border-navy-900 bg-navy-900 text-white'
																	: 'border-slate-200 bg-white text-navy-900 hover:border-slate-300 disabled:opacity-50',
															)}
														>
															{opt}
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

							<form.Field
								name='vision12Month'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												12-Month Vision
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Describe the architectural shift you want to see in your business...'
												className='min-h-25 resize-none border-none border-b border-slate-200 bg-transparent p-0 pb-4 text-sm focus-visible:border-navy-900 focus-visible:ring-0 rounded-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='tomorrowQuestion'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3 pt-6'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												The Tomorrow Question
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder="What keeps you awake when contemplating next quarter's growth?"
												className='min-h-25 resize-none border-none border-b border-slate-200 bg-transparent p-0 pb-4 text-sm focus-visible:border-navy-900 focus-visible:ring-0 rounded-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>
					</section>

					{/* 03. Roadblocks & Readiness */}
					<section className='space-y-8'>
						<div className='border-l-4 border-gold-500 pl-4'>
							<h2 className='font-serif text-2xl text-navy-900'>
								03. Roadblocks & Readiness
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Assessing constraints and capacity for change.
							</p>
						</div>

						<div className='space-y-12 pl-5'>
							<form.Field
								name='primaryBottleneck'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-6'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Primary Bottleneck
											</FieldLabel>
											<RadioGroup
												value={field.state.value}
												onValueChange={field.handleChange}
												className='flex flex-col gap-6'
											>
												{[
													{
														id: 'capital',
														label: 'Capital Flow',
														desc: 'Growth is restricted by funding or mismanaged margins.',
													},
													{
														id: 'operations',
														label: 'Operational Friction',
														desc: 'Inefficient workflows or internal team misalignment.',
													},
													{
														id: 'leads',
														label: 'Lead Generation',
														desc: 'Capacity is there, but the pipeline is unpredictable.',
													},
												].map((opt) => (
													<div key={opt.id} className='flex items-start gap-3'>
														<RadioGroupItem
															value={opt.label}
															id={opt.id}
															className='mt-0.5'
														/>
														<div className='grid gap-1'>
															<Label
																htmlFor={opt.id}
																className='cursor-pointer text-sm font-medium text-navy-900'
															>
																{opt.label}
															</Label>
															<p className='text-[10px] italic text-slate-500'>
																{opt.desc}
															</p>
														</div>
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
								name='organizationalReadiness'
								children={(field) => {
									const readinessLabels = [
										'Unstable',
										'Preparing',
										'Open',
										'High Receptivity',
										'Fully Agile',
									];
									const currentValue = field.state.value[0];
									return (
										<Field className='flex flex-col gap-6 pt-4'>
											<div className='flex items-center justify-between'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Organizational Readiness
												</FieldLabel>
												<span className='font-serif text-lg italic text-gold-500'>
													{readinessLabels[currentValue - 1]}
												</span>
											</div>
											<div className='px-2'>
												<Slider
													value={field.state.value}
													onValueChange={field.handleChange}
													max={5}
													min={1}
													step={1}
													className='py-4'
												/>
												<div className='mt-2 flex justify-between text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-400'>
													{readinessLabels.map((label) => (
														<span key={label}>{label}</span>
													))}
												</div>
											</div>
										</Field>
									);
								}}
							/>
						</div>
					</section>

					{/* 04. Anchor Metric */}
					<section className='space-y-8'>
						<div className='border-l-4 border-gold-500 pl-4'>
							<h2 className='font-serif text-2xl text-navy-900'>
								04. Anchor Metric
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Quantifying the value of the engagement.
							</p>
						</div>

						<div className='space-y-12 pl-5'>
							<form.Field
								name='valueIndicator'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												12-Month Value Indicator
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='What is the single most important number we should track?'
												className='min-h-25 resize-none border-none border-b border-slate-200 bg-transparent p-0 pb-4 text-sm focus-visible:border-navy-900 focus-visible:ring-0 rounded-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='relationshipSuccess'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3 pt-6'
										>
											<div className='flex items-center justify-between'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Relationship Success Definition
												</FieldLabel>
												<span className='text-[8px] font-bold uppercase tracking-widest text-red-500'>
													Required
												</span>
											</div>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='If we meet again in 12 months, what must have happened for you to be satisfied?'
												className={cn(
													'min-h-25 resize-none border-none border-b border-slate-200 bg-transparent p-0 pb-4 text-sm focus-visible:border-navy-900 focus-visible:ring-0 rounded-none',
													isInvalid && 'border-red-400',
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
					</section>

					{/* Final Details */}
					<section className='bg-navy-950 p-8 md:p-12 text-white'>
						<div className='mb-12 text-center'>
							<h2 className='font-serif text-2xl text-white'>Final Details</h2>
							<p className='mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400'>
								When should we send your initial architectural audit?
							</p>
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
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Full Name
											</FieldLabel>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Jane Adler Starling'
												className='border-b border-slate-600 bg-transparent pb-2 pt-2 text-sm text-white focus:border-gold-500 focus:outline-none'
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
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Business Email
											</FieldLabel>
											<input
												type='email'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='j.adler@firm.com'
												className='border-b border-slate-600 bg-transparent pb-2 pt-2 text-sm text-white focus:border-gold-500 focus:outline-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name='phoneNumber'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-1.5 sm:col-span-2'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Phone Number
											</FieldLabel>
											<input
												type='tel'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='+1 (000) 000-0000'
												className='border-b border-slate-600 bg-transparent pb-2 pt-2 text-sm text-white focus:border-gold-500 focus:outline-none'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>

						<div className='mt-16 flex justify-center'>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										type='submit'
										disabled={!canSubmit}
										className='w-full sm:w-auto min-w-70 rounded-none bg-[#F3E1B6] px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-navy-900 hover:bg-[#e6d3a3] cursor-pointer'
									>
										{isSubmitting
											? 'Submitting...'
											: 'Submit Discovery Dossier'}
									</Button>
								)}
							/>
						</div>
					</section>
				</form>
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
