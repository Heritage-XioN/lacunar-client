'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { personalFinanceFormValidators } from '@/lib/zod-schemas';

export function PersonalFinanceForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			primaryReason: '',
			financialStress: '',
			monthlyNetIncome: undefined as number | undefined,
			incomeCurrency: 'NGN',
			monthlyCoreExpenses: undefined as number | undefined,
			activeAssets: [] as string[],
			debtProfile: [] as string[],
			investmentReality: '',
			timeHorizon: '',
			vision730Day: '',
			desiredOutcomes: [] as string[],
			fullName: '',
			email: '',
			phoneNumber: '',
		},

		validationLogic: revalidateLogic({
			mode: 'submit', // Before first submit, validate only on submit
			modeAfterSubmission: 'change', // After first submit, validate on every change
		}),

		validators: personalFinanceFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch('/api/consultations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						category: 'personal-finance',
						formData: value,
					}),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Form submitted successfully!');
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
		<div className='min-h-screen bg-[#F8F9FA] font-sans text-navy-900 pb-32'>
			<div className='mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-24 text-center'>
					<h1 className='font-serif text-4xl font-normal text-navy-900 md:text-5xl lg:text-6xl'>
						Personal Finance
					</h1>
					<p className='mx-auto mt-6 max-w-xl text-sm italic leading-relaxed text-slate-500'>
						With our team of experienced investment strategists, we help you
						make your money work for you. We believe you shouldn’t have to work
						just to afford the lifestyle you want rather your assets should be
						what support your lifestyle.
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
					{/* PHASE 01 */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 01
							</p>
						</div>
						<div className='bg-slate-50 border border-slate-100 p-8 md:col-span-8 space-y-12 shadow-sm'>
							<form.Field
								name='primaryReason'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Planning how to use my money better',
										'Managing or paying off my debt',
										'Protecting my money and financial future',
										'Growing my money through investments',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												What do you need help with right now?
											</FieldLabel>
											<RadioGroup
												name={field.name}
												value={field.state.value}
												className='flex flex-col gap-4'
												onValueChange={field.handleChange}
											>
												{options.map((opt) => (
													<label
														key={opt}
														className='flex cursor-pointer items-center gap-3'
													>
														<RadioGroupItem
															value={opt}
															id={opt}
															aria-invalid={isInvalid}
														/>

														<label
															htmlFor={opt}
															className='text-sm text-slate-600'
														>
															{opt}
														</label>
													</label>
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
								name='financialStress'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'None – I feel completely in control',
										'Mild – occasional worry but manageable``',
										'Moderate – frequent worry that affects my mood`',
										'High – it keeps me up at night or causes arguments',
										'Overwhelming – I feel paralysed or avoid thinking about it',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												How would you rate your current level of financial
												stress?
											</FieldLabel>
											<RadioGroup
												name={field.name}
												value={field.state.value}
												className='flex flex-col gap-4'
												onValueChange={field.handleChange}
											>
												{options.map((opt) => (
													<label
														key={opt}
														className='flex cursor-pointer items-center gap-3'
													>
														<RadioGroupItem
															value={opt}
															id={opt}
															aria-invalid={isInvalid}
														/>

														<label
															htmlFor={opt}
															className='text-sm text-slate-600'
														>
															{opt}
														</label>
													</label>
												))}
											</RadioGroup>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>
					</section>

					{/* PHASE 02 */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 02
							</p>
						</div>
						<div className='md:col-span-8 space-y-12'>
							<div className='grid gap-8 sm:grid-cols-2'>
								<form.Field
									name='monthlyNetIncome'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field className='flex flex-col gap-1.5'>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Net Income
												</FieldLabel>
												<div className='flex items-center gap-2 border-b border-slate-300 pb-2'>
													<input
														type='number'
														value={field.state.value || ''}
														onChange={(e) =>
															field.handleChange(
																e.target.value
																	? Number(e.target.value)
																	: (undefined as any),
															)
														}
														onBlur={field.handleBlur}
														placeholder='0.00'
														className='w-full bg-transparent text-lg text-navy-900 placeholder:text-slate-300 focus:outline-none'
													/>
													<form.Field
														name='incomeCurrency'
														children={(currencyField) => (
															<select
																value={currencyField.state.value}
																onChange={(e) =>
																	currencyField.handleChange(e.target.value)
																}
																className='bg-transparent text-xs text-slate-500 focus:outline-none'
															>
																<option value='NGN'>NGN</option>
																<option value='USD'>USD</option>
																<option value='EUR'>EUR</option>
																<option value='GBP'>GBP</option>
															</select>
														)}
													/>
												</div>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
								<form.Field
									name='monthlyCoreExpenses'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field className='flex flex-col gap-1.5'>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Core Expenses
												</FieldLabel>
												<div className='flex items-center gap-2 border-b border-slate-300 pb-2'>
													<input
														type='number'
														value={field.state.value || ''}
														onChange={(e) =>
															field.handleChange(
																e.target.value
																	? Number(e.target.value)
																	: (undefined as any),
															)
														}
														onBlur={field.handleBlur}
														placeholder='0.00'
														className='w-full bg-transparent text-lg text-navy-900 placeholder:text-slate-300 focus:outline-none'
													/>
												</div>
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

					{/* PHASE 03 */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 03
							</p>
						</div>
						<div className='md:col-span-8 space-y-12'>
							<div className='bg-white border border-slate-100 p-8 shadow-sm space-y-8'>
								<form.Field
									name='activeAssets'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										const options = [
											'LIQUID SAVINGS',
											'REAL ESTATE',
											'BROKERAGE',
											'RETIREMENT',
											'CRYPTO',
											'BUSINESS ASSETS',
											'BUSINESS EQUITY',
											'FIXED DEPOSIT',
											'SAVINGS ACCOUNT',
											'CHECKING ACCOUNT',
											'CURRENT ACCOUNT',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Active Assets
												</FieldLabel>
												<div className='flex flex-wrap gap-3'>
													{options.map((opt) => (
														<label
															key={opt}
															className='flex cursor-pointer items-center gap-3 bg-white px-4 py-3 border border-slate-100 shadow-sm transition-colors hover:border-slate-300'
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

								<form.Field
									name='debtProfile'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										const options = [
											'Credit card debt',
											'Student loans',
											'Mortgage',
											'Auto loan',
											'Personal loan / line of credit',
											'Medical debt',
											'Business debt',
											'None',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Debt Profile (Select all that apply)
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

							<form.Field
								name='investmentReality'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												Past investment experiences
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Describe the past investment experiences eg: ponzy schemes CBEX, financial investment eg: stocks and bonds, real estate, etc...'
												className='min-h-30 resize-none border-none bg-slate-100 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
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

					{/* PHASE 04 */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 04
							</p>
						</div>
						<div className='md:col-span-8 space-y-12'>
							<form.Field
								name='timeHorizon'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = ['0-1 YRS', '1-3 YRS', '3-5 YRS', '10+ YRS'];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Time Horizon
											</FieldLabel>
											<div className='flex overflow-hidden rounded-none border border-slate-200 bg-slate-50'>
												{options.map((opt) => {
													const isSelected = field.state.value === opt;
													return (
														<button
															type='button'
															key={opt}
															onClick={() => field.handleChange(opt)}
															className={cn(
																'flex-1 px-4 py-3 text-[10px] font-bold tracking-widest transition-colors',
																isSelected
																	? 'bg-navy-900 text-white'
																	: 'text-slate-500 hover:bg-slate-100',
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
								name='vision730Day'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												What does financial freedom mean to you?
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Eg: Financial freedom for me, mean my pocket doesnt determine my choices, where I choose to live or how I choose to dress'
												className='min-h-25 resize-none border-none bg-slate-100 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='desiredOutcomes'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Absolute Financial Autonomy',
										'Optimization of Tax Liabilities',
										'Aggressive Growth Trajectory',
										'Stability & Risk Mitigation',
										'Eliminating all high-interest debt',
										'Fully funding my children’s education',
										'Building a 6-12 month emergency fund',
										'Feeling in control day-to-day',
										'Leaving a financial legacy',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Desired Outcomes (Select up to 2)
											</FieldLabel>
											<div className='flex flex-col'>
												{options.map((opt) => (
													<label
														key={opt}
														className='flex cursor-pointer items-center justify-between border-b border-slate-200 bg-white px-6 py-4 transition-colors hover:bg-slate-50'
													>
														<span className='text-sm text-slate-600'>
															{opt}
														</span>
														<Checkbox
															checked={field.state.value.includes(opt)}
															onCheckedChange={(checked) => {
																if (checked) {
																	if (field.state.value.length < 3) {
																		field.handleChange([
																			...field.state.value,
																			opt,
																		]);
																	}
																} else {
																	field.handleChange(
																		field.state.value.filter(
																			(val) => val !== opt,
																		),
																	);
																}
															}}
															disabled={
																!field.state.value.includes(opt) &&
																field.state.value.length >= 3
															}
															className='h-5 w-5 border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-navy-900'
														/>
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

					{/* PHASE 05 */}
					<section className='grid gap-8 md:grid-cols-12 w-full'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 06
							</p>
						</div>
						<section className='mx-auto max-w-2xl pb-32 text-center md:col-span-8'>
							<div className='mt-12 grid gap-8 sm:grid-cols-2 text-left'>
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
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
													Full Name
												</FieldLabel>
												<input
													type='text'
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
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
													Email Address
												</FieldLabel>
												<input
													type='email'
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
							</div>

							<div className='mt-16'>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
									children={([canSubmit, isSubmitting]) => (
										<Button
											type='submit'
											disabled={!canSubmit}
											className='w-full sm:w-auto min-w-60 bg-navy-900 px-8 py-6 text-xs uppercase tracking-widest text-white hover:bg-navy-800 cursor-pointer'
										>
											{isSubmitting ? 'Submitting...' : 'Submit'}
										</Button>
									)}
								/>
								<p className='mt-6 text-[9px] uppercase tracking-widest text-slate-400'>
									By submitting, you agree to our Terms of Service & Privacy
									Policy.
								</p>
							</div>
						</section>
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
