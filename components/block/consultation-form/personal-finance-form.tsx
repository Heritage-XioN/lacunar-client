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
import { personalFinanceSchema } from '@/lib/zod-schemas';

export function PersonalFinanceForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			primaryCatalyst: '',
			financialStress: '',
			monthlyNetIncome: undefined as number | undefined,
			incomeCurrency: 'NGN',
			monthlyCoreExpenses: undefined as number | undefined,
			trackingMethodologies: [] as string[],
			activeAssets: [] as string[],
			debtProfile: [] as string[],
			financialReality: '',
			timeHorizon: '',
			vision730Day: '',
			desiredOutcomes: [] as string[],
			operationalObstacle: '',
			decisionConfidence: '',
			successDefinition: '',
			fullName: '',
			emailAddress: '',
			phoneNumber: '',
		},
		validators: {
			onSubmit: personalFinanceSchema,
			onBlur: personalFinanceSchema,
		},
		onSubmit: async ({ value }) => {
			const result = await submitConsultationForm('personal-finance', value);
			if (result.success) {
				toast.success('Form submitted successfully!');
				router.push('/consultation-form/success');
			} else {
				toast.error(`form submitted failed: ${result.error}`);
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
						"True wealth is a reflection of clarity, strategy, and disciplined
						intent. Let us map your architectural financial future."
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
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Emotional &<br />
								Immediate
								<br />
								Needs
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Identifying the psychological weight of your financial
								landscape.
							</p>
						</div>
						<div className='bg-slate-50 border border-slate-100 p-8 md:col-span-8 space-y-12 shadow-sm'>
							<form.Field
								name='primaryCatalyst'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Strategic Budgeting & Flow Control',
										'Debt Architecture & Liquidation',
										'Wealth Preservation & Legacy',
										'Investment Trajectory Analysis',
									];
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												Primary Catalyst for Consultation
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
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								The Numbers
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Defining the raw data of your current operation.
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

							<form.Field
								name='trackingMethodologies'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Advanced Spreadsheets',
										'Digital Applications',
										'Manual Ledger',
										'No Formal Tracking',
									];
									return (
										<Field className='flex flex-col gap-4'>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												Current Tracking Methodologies
											</FieldLabel>
											<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
						</div>
					</section>

					{/* PHASE 03 */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 03
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Assets &<br />
								Liabilities
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								The balance sheet of your strategic position.
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
								name='financialReality'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-xs font-serif text-navy-900'>
												Financial Reality
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Describe the current narrative of your finances...'
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
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Vision &<br />
								Outcomes
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Designing the horizon for your future capital.
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
												The 730-Day Vision
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Where does this path lead in 24 months if perfectly executed?'
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
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 05
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Barriers &<br />
								Confidence
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Identifying the friction points in your current model.
							</p>
						</div>
						<div className='md:col-span-8 space-y-12'>
							<div className='bg-slate-50 border border-slate-100 p-8 shadow-sm'>
								<form.Field
									name='operationalObstacle'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-6'
											>
												<FieldLabel className='text-xs font-serif text-navy-900'>
													Primary Operational Obstacle
												</FieldLabel>
												<RadioGroup
													value={field.state.value}
													onValueChange={field.handleChange}
													className='flex flex-col gap-4'
												>
													{[
														{
															id: 'info',
															label: 'Information Asymmetry',
															desc: 'Unsure of where capital is most effective.',
														},
														{
															id: 'behavior',
															label: 'Behavioral Friction',
															desc: 'Internal struggle with spending discipline.',
														},
														{
															id: 'resource',
															label: 'Resource Volatility',
															desc: 'Market conditions or personal income drops.',
														},
													].map((opt) => (
														<div
															key={opt.id}
															className='flex items-start gap-3'
														>
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
							</div>

							<form.Field
								name='decisionConfidence'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
												Decision Confidence Index
											</FieldLabel>
											<p className='text-xs italic text-slate-500'>
												How confident are you in your current financial choices?
											</p>
											<div className='flex gap-2 sm:gap-4'>
												{['1', '2', '3', '4', '5'].map((val) => {
													const isSelected = field.state.value === val;
													return (
														<button
															type='button'
															key={val}
															onClick={() => field.handleChange(val)}
															className={cn(
																'flex h-12 flex-1 items-center justify-center border font-serif text-lg transition-colors',
																isSelected
																	? 'border-navy-900 bg-navy-900 text-white'
																	: 'border-slate-200 bg-white text-navy-900 hover:border-slate-300',
															)}
														>
															{val}
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

							<div className='bg-[#2A2311] p-8 md:p-10'>
								<form.Field
									name='successDefinition'
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-4'
											>
												<FieldLabel className='font-serif text-xl text-gold-500'>
													Success with Lacunar
												</FieldLabel>
												<p className='text-xs text-slate-300'>
													What does successful partnership with our strategy
													team look like to you? (Mandatory)
												</p>
												<Textarea
													label=''
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													placeholder='Quantify your success metric...'
													className={cn(
														'mt-2 min-h-25 resize-none text-white border text-sm placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-gold-500 px-1',
														isInvalid ? 'border-red-400' : 'border-[#3D331D]',
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

					{/* PHASE 06 */}
					<section className='grid gap-8 md:grid-cols-12 w-full'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 06
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Contact Information
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Finalize your dossier for consultation.
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
									name='emailAddress'
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
