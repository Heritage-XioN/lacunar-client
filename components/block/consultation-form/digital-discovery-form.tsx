'use client';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldDescription,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const digitalDiscoverySchema = z.object({
	primaryIntent: z.array(z.string()).min(1, 'Select at least one option'),
	financialStress: z.string().min(1, 'Select a stress level'),
	monthlyNetIncome: z.number().min(0, 'Must be positive'),
	monthlyExpenses: z.number().min(0, 'Must be positive'),
	trackingMethods: z.array(z.string()),
	currentAssets: z.array(z.string()),
	debtTypes: z.array(z.string()),
	approximateTotalDebt: z.number().min(0, 'Must be positive').optional(),
	keepingYouUp: z.string().min(1, 'Please provide an answer'),
	wealthHorizon: z.string().min(1, 'Select a wealth horizon'),
	desiredOutcomes: z
		.array(z.string())
		.min(2, 'Select exactly 2 outcomes')
		.max(2, 'Select exactly 2 outcomes'),
	coreBelief: z.string().optional(),
	primaryConstraints: z.string().min(1, 'Select a primary constraint'),
	upcomingLifeEvents: z.string().optional(),
	decisionConfidence: z.array(z.number()).min(1),
	definitionOfSuccess: z.string().min(1, 'Please define success'),
	fullName: z.string().min(1, 'Full name is required'),
	emailAddress: z.string().email('Invalid email address'),
	phoneNumber: z.string().optional(),
});

export function DigitalDiscoveryForm() {
	const form = useForm({
		defaultValues: {
			primaryIntent: [] as string[],
			financialStress: '',
			monthlyNetIncome: undefined as number | undefined,
			monthlyExpenses: undefined as number | undefined,
			trackingMethods: [] as string[],
			currentAssets: [] as string[],
			debtTypes: [] as string[],
			approximateTotalDebt: undefined as number | undefined,
			keepingYouUp: '',
			wealthHorizon: '',
			desiredOutcomes: [] as string[],
			coreBelief: '',
			primaryConstraints: '',
			upcomingLifeEvents: '',
			decisionConfidence: [5],
			definitionOfSuccess: '',
			fullName: '',
			emailAddress: '',
			phoneNumber: '',
		},
		onSubmit: async ({ value }) => {
			console.log('Form submitted:', value);
			alert('Digital Discovery Initialized! Check console for data.');
		},
	});

	return (
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900'>
			<div className='mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-24 text-center'>
					<h1 className='font-serif text-5xl font-normal text-navy-900 md:text-6xl lg:text-7xl'>
						Digital Discovery
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-500'>
						A formal inquiry into your financial architecture. Your responses
						become our initial design nodes for legacy and expansion.
					</p>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className='space-y-32'
				>
					{/* SECTION 01: Primary Intent */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Section 01
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Primary Intent
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Defining the outbound focus engagement.
							</p>
						</div>
						<div className='space-y-8 md:col-span-8'>
							<form.Field
								name='primaryIntent'
								validators={{
									onChange: digitalDiscoverySchema.shape.primaryIntent,
								}}
								children={(field) => {
									const options = [
										'Budgeting & Spending',
										'Debt Management',
										'Major Purchases',
										'Investing',
										'Retirement',
										'Peace of Mind',
									];
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-sm font-semibold text-navy-900'>
												Primary reason for initiating guidance?
											</FieldLabel>
											<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
												{options.map((opt) => (
													<label
														key={opt}
														className={cn(
															'flex cursor-pointer items-center gap-3 bg-white px-4 py-3 shadow-sm transition-colors hover:bg-slate-50',
															field.state.value.includes(opt) &&
																'border border-navy-900 bg-slate-50',
														)}
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
								name='financialStress'
								validators={{
									onChange: digitalDiscoverySchema.shape.financialStress,
								}}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<FieldLabel className='text-sm font-semibold text-navy-900'>
												Current financial stress level?
											</FieldLabel>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger
													className={cn(
														'bg-white',
														isInvalid ? 'border-red-400' : 'border-slate-200',
													)}
												>
													<SelectValue placeholder='Select your stress level...' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='Low'>
														Low - Under Control
													</SelectItem>
													<SelectItem value='Moderate'>
														Moderate - Seeking Clarity
													</SelectItem>
													<SelectItem value='High'>
														High - Need Immediate Action
													</SelectItem>
												</SelectContent>
											</Select>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>
					</section>

					{/* SECTION 02: Financial Snapshot */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Section 02
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Financial Snapshot
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Quantifying the present landscape.
							</p>
						</div>
						<div className='bg-slate-100 p-8 md:col-span-8'>
							<div className='grid gap-8 sm:grid-cols-2'>
								<form.Field
									name='monthlyNetIncome'
									validators={{
										onChange: digitalDiscoverySchema.shape.monthlyNetIncome,
									}}
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5'
											>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Net Income (USD)
												</FieldLabel>
												<div className='flex items-center gap-2 border-b border-slate-300 pb-2'>
													<span className='text-lg text-slate-500'>$</span>
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
								<form.Field
									name='monthlyExpenses'
									validators={{
										onChange: digitalDiscoverySchema.shape.monthlyExpenses,
									}}
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5'
											>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Expenses
												</FieldLabel>
												<div className='flex items-center gap-2 border-b border-slate-300 pb-2'>
													<span className='text-lg text-slate-500'>$</span>
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

							<div className='mt-10'>
								<form.Field
									name='trackingMethods'
									children={(field) => {
										const options = [
											'Spreadsheet',
											'Budgeting App',
											'Banking Alerts',
											'Pen & Paper',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-sm text-navy-900'>
													Current tracking methods?
												</FieldLabel>
												<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
													{options.map((opt) => (
														<label
															key={opt}
															className='flex cursor-pointer items-center gap-2 bg-white px-3 py-2 text-xs shadow-sm'
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
															<span className='text-slate-600'>{opt}</span>
														</label>
													))}
												</div>
											</Field>
										);
									}}
								/>
							</div>

							<div className='mt-10'>
								<form.Field
									name='currentAssets'
									children={(field) => {
										const options = [
											'High Yield Savings',
											'Retirement (401k/IRA)',
											'Brokerage Accounts',
											'Real Estate',
											'Business Equity',
											'Crypto/Digital',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-sm text-navy-900'>
													Identify Current Assets:
												</FieldLabel>
												<div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
													{options.map((opt) => (
														<label
															key={opt}
															className='flex cursor-pointer items-center gap-2'
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
											</Field>
										);
									}}
								/>
							</div>

							<div className='mt-10 bg-slate-200/50 p-6'>
								<form.Field
									name='debtTypes'
									children={(field) => {
										const options = [
											'Credit Cards',
											'Student Loans',
											'Mortgage',
											'Personal/Auto Loans',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-xs font-medium text-navy-900'>
													Select the debt you currently carry:
												</FieldLabel>
												<div className='grid grid-cols-2 gap-3'>
													{options.map((opt) => (
														<label
															key={opt}
															className='flex cursor-pointer items-center gap-2'
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
											</Field>
										);
									}}
								/>

								<div className='mt-8'>
									<form.Field
										name='approximateTotalDebt'
										validators={{
											onChange:
												digitalDiscoverySchema.shape.approximateTotalDebt,
										}}
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field
													data-invalid={isInvalid}
													className='flex flex-col gap-1.5'
												>
													<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
														Approximate Total Debt Amount
													</FieldLabel>
													<div className='flex items-center gap-2 border-b border-slate-300 pb-2'>
														<span className='text-sm text-slate-500'>$</span>
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
															placeholder='e.g. 45000'
															className='w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none'
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
						</div>
					</section>

					{/* SECTION 03: Vision & Narrative */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Section 03
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Vision & Narrative
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								The subjective weight of your financial future.
							</p>
						</div>
						<div className='space-y-12 md:col-span-8'>
							<form.Field
								name='keepingYouUp'
								validators={{
									onChange: digitalDiscoverySchema.shape.keepingYouUp,
								}}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<FieldLabel className='text-sm text-navy-900'>
												What is keeping you up at night right now?
											</FieldLabel>
											<Textarea
												value={field.state.value}
												label=''
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Briefly describe your financial reality constraints...'
												className={cn(
													'min-h-[100px] resize-none bg-white',
													isInvalid ? 'border-red-400' : 'border-slate-200',
												)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<div className='grid gap-8 sm:grid-cols-2'>
								<form.Field
									name='wealthHorizon'
									validators={{
										onChange: digitalDiscoverySchema.shape.wealthHorizon,
									}}
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5'
											>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
													Primary Wealth Horizon
												</FieldLabel>
												<Select
													value={field.state.value}
													onValueChange={field.handleChange}
												>
													<SelectTrigger className='border-b border-slate-300 bg-transparent px-0 pb-2 shadow-none focus:ring-0'>
														<SelectValue placeholder='Select horizon...' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='1-2 Years'>1-2 Years</SelectItem>
														<SelectItem value='3-5 Years'>3-5 Years</SelectItem>
														<SelectItem value='5-10 Years'>
															5-10 Years
														</SelectItem>
														<SelectItem value='10+ Years'>10+ Years</SelectItem>
													</SelectContent>
												</Select>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>

								<form.Field
									name='desiredOutcomes'
									validators={{
										onChange: digitalDiscoverySchema.shape.desiredOutcomes,
									}}
									children={(field) => {
										const options = [
											'Passive Income Stream',
											'Debt Free Lifestyle',
											'Legacy/Generational Wealth',
											'Professional Launch',
										];
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-3'
											>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
													Desired Outcomes (Pick 2)
												</FieldLabel>
												<div className='flex flex-col gap-3'>
													{options.map((opt) => (
														<label
															key={opt}
															className='flex cursor-pointer items-center gap-2'
														>
															<Checkbox
																checked={field.state.value.includes(opt)}
																onCheckedChange={(checked) => {
																	if (checked) {
																		if (field.state.value.length < 2) {
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
																	field.state.value.length >= 2
																}
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

							<div className='bg-navy-950 p-8'>
								<form.Field
									name='coreBelief'
									children={(field) => {
										return (
											<Field className='flex flex-col gap-3'>
												<FieldLabel className='text-sm font-semibold text-white'>
													A core belief that is weighing on this struggle?
												</FieldLabel>
												<input
													type='text'
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													placeholder='Describe the feeling or format...'
													className='border-b border-slate-600 bg-navy-900 pb-2 pt-4 text-sm text-white placeholder:text-slate-400 focus:border-white focus:outline-none'
												/>
											</Field>
										);
									}}
								/>
							</div>
						</div>
					</section>

					{/* Image Quote Interstitial */}
					<section className='relative h-64 overflow-hidden bg-slate-200 md:h-80'>
						{/* Background geometric placeholder if no image provided */}
						<div className='absolute inset-0 flex items-center justify-center opacity-30'>
							<div className='absolute h-[200%] w-px -rotate-45 bg-slate-400' />
							<div className='absolute h-[200%] w-px rotate-45 bg-slate-400' />
						</div>
						<div className='absolute inset-0 flex items-center bg-navy-900/10 p-8 md:p-16'>
							<h3 className='max-w-2xl font-serif text-3xl font-normal leading-snug text-navy-900 md:text-5xl'>
								"Architecture is not just building; it is a vision of the
								possible."
							</h3>
						</div>
					</section>

					{/* SECTION 04: Constraints */}
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Section 04
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Constraints
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Identifying friction points and upcoming volatility.
							</p>
						</div>
						<div className='space-y-12 md:col-span-8'>
							<form.Field
								name='primaryConstraints'
								validators={{
									onChange: digitalDiscoverySchema.shape.primaryConstraints,
								}}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-sm text-navy-900'>
												Primary constraints to your progress?
											</FieldLabel>
											<RadioGroup
												value={field.state.value}
												onValueChange={field.handleChange}
												className='flex flex-col gap-3'
											>
												{[
													{
														id: 'oversight',
														label: 'Loss of financial oversight',
														desc: 'Missing the big picture due to disorganized tools.',
													},
													{
														id: 'cashflow',
														label: 'Complex cash flow',
														desc: 'Irregular income or multiple unpredictable expenses.',
													},
													{
														id: 'psychological',
														label: 'Psychological friction',
														desc: 'Difficulty initiating new or needed financial action.',
													},
												].map((opt) => (
													<div
														key={opt.id}
														className='flex items-start gap-4 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50'
													>
														<RadioGroupItem
															value={opt.id}
															id={opt.id}
															className='mt-1'
														/>
														<div className='grid gap-1'>
															<label
																htmlFor={opt.id}
																className='font-semibold text-navy-900'
															>
																{opt.label}
															</label>
															<p className='text-xs text-slate-500'>
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
								name='upcomingLifeEvents'
								children={(field) => {
									return (
										<Field className='flex flex-col gap-1.5'>
											<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
												Upcoming Major Life Events (12 Months)
											</FieldLabel>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g., Marriage, Relocation, New venture...'
												className='border-b border-slate-300 bg-transparent pb-2 pt-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
											/>
										</Field>
									);
								}}
							/>

							<form.Field
								name='decisionConfidence'
								validators={{
									onChange: digitalDiscoverySchema.shape.decisionConfidence,
								}}
								children={(field) => {
									return (
										<Field className='flex flex-col gap-6 pt-4'>
											<div className='flex items-center justify-between'>
												<FieldLabel className='text-sm text-navy-900'>
													Decision-making confidence:
												</FieldLabel>
												<span className='font-serif text-xl italic text-navy-900'>
													{field.state.value[0]}
													<span className='text-sm not-italic text-slate-400'>
														/10
													</span>
												</span>
											</div>
											<div className='px-2'>
												<Slider
													value={field.state.value}
													onValueChange={field.handleChange}
													max={10}
													min={1}
													step={1}
													className='py-4'
												/>
												<div className='flex justify-between text-[10px] uppercase tracking-widest text-slate-400'>
													<span>Relaxed</span>
													<span>Stressed</span>
												</div>
											</div>
										</Field>
									);
								}}
							/>
						</div>
					</section>

					{/* SECTION 05: Definition of Success */}
					<section className='bg-slate-100 p-8 md:p-16'>
						<form.Field
							name='definitionOfSuccess'
							validators={{
								onChange: digitalDiscoverySchema.shape.definitionOfSuccess,
							}}
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='mx-auto flex max-w-2xl flex-col items-center gap-6 text-center'
									>
										<h2 className='font-serif text-3xl text-navy-900'>
											The Definition of Success
										</h2>
										<FieldLabel className='text-sm font-normal italic text-slate-500'>
											In your own words, what would happen for this engagement
											to be considered a definitive success?
										</FieldLabel>
										<div className='w-full border-b border-slate-300 px-4 pb-2 pt-8'>
											<Textarea
												value={field.state.value}
												label=''
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Your thoughts here...'
												className='min-h-[100px] w-full resize-none border-none bg-transparent text-center text-lg focus-visible:ring-0 focus-visible:ring-offset-0'
											/>
										</div>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</section>

					{/* SECTION 06: Authentication & Contact */}
					<section className='mx-auto max-w-2xl pb-32 text-center'>
						<h2 className='font-serif text-2xl text-navy-900'>
							Authentication & Contact
						</h2>
						<p className='mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
							Private & Confidential
						</p>

						<div className='mt-12 grid gap-8 sm:grid-cols-2 text-left'>
							<form.Field
								name='fullName'
								validators={{
									onChange: digitalDiscoverySchema.shape.fullName,
								}}
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
								validators={{
									onChange: digitalDiscoverySchema.shape.emailAddress,
								}}
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
								// validators={{
								// 	onChange: digitalDiscoverySchema.shape.phoneNumber,
								// }}
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
										className='w-full sm:w-auto min-w-[240px] bg-navy-900 px-8 py-6 text-xs uppercase tracking-widest text-white hover:bg-navy-800'
									>
										{isSubmitting ? 'Initializing...' : 'Initialize Discovery'}
									</Button>
								)}
							/>
							<p className='mt-6 text-[9px] uppercase tracking-widest text-slate-400'>
								By submitting, you agree to our Terms of Service & Privacy
								Policy.
							</p>
						</div>
					</section>
				</form>
			</div>
		</div>
	);
}
