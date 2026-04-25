'use client';

import { useForm } from '@tanstack/react-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const personalFinanceSchema = z.object({
	primaryCatalyst: z.array(z.string()).min(1, 'Select at least one catalyst'),
	financialStress: z.array(z.number()),
	monthlyNetIncome: z.number().min(0, 'Must be positive').optional(),
	incomeCurrency: z.string(),
	monthlyCoreExpenses: z.number().min(0, 'Must be positive').optional(),
	trackingMethodologies: z.array(z.string()),
	activeAssets: z.array(z.string()),
	debtProfile: z.array(z.string()),
	financialReality: z.string().optional(),
	timeHorizon: z.string().min(1, 'Select a time horizon'),
	vision730Day: z.string().optional(),
	desiredOutcomes: z
		.array(z.string())
		.min(2, 'Select exactly 2 outcomes')
		.max(2, 'Select exactly 2 outcomes'),
	operationalObstacle: z.string().min(1, 'Select a primary obstacle'),
	decisionConfidence: z.string().min(1, 'Select your confidence index'),
	successDefinition: z.string().min(1, 'Please define success'),
	legalName: z.string().min(1, 'Full name is required'),
	secureEmail: z.string().email('Invalid email address'),
	directContact: z.string().optional(),
});

export function PersonalFinanceForm() {
	const form = useForm({
		defaultValues: {
			primaryCatalyst: [] as string[],
			financialStress: [5],
			monthlyNetIncome: undefined as number | undefined,
			incomeCurrency: 'USD',
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
			legalName: '',
			secureEmail: '',
			directContact: '',
		},
		onSubmit: async ({ value }) => {
			console.log('Form submitted:', value);
			alert('Personal Finance Intake Submitted! Check console for data.');
		},
	});

	return (
		<div className='min-h-screen bg-[#F8F9FA] font-sans text-navy-900 pb-32'>
			{/* Top Nav (Optional/Inline) */}
			<header className='flex items-center justify-between px-6 py-6 md:px-12'>
				<div className='font-serif text-xl font-bold tracking-tight'>
					StratEdge Consulting
				</div>
				<div className='hidden items-center gap-8 text-sm text-slate-500 md:flex'>
					<a href='#' className='hover:text-navy-900'>
						Our Strategy
					</a>
					<a href='#' className='hover:text-navy-900'>
						Case Studies
					</a>
					<a href='#' className='hover:text-navy-900'>
						Intelligence
					</a>
					<a
						href='#'
						className='hover:text-navy-900 uppercase text-[10px] tracking-widest'
					>
						Connect With
					</a>
					<Button className='bg-navy-900 px-6 py-2 text-[10px] uppercase tracking-widest text-white hover:bg-navy-800 rounded-none'>
						Schedule Consultation
					</Button>
				</div>
			</header>

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
								validators={{
									onChange: personalFinanceSchema.shape.primaryCatalyst,
								}}
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
											<div className='flex flex-col gap-4'>
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
								name='financialStress'
								children={(field) => {
									return (
										<Field className='flex flex-col gap-6 pt-4'>
											<div className='flex items-center justify-between'>
												<FieldLabel className='text-xs font-serif text-navy-900'>
													Internal Financial Stress Level
												</FieldLabel>
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
													<span>Serene</span>
													<span>Acute</span>
												</div>
											</div>
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
										return (
											<Field className='flex flex-col gap-1.5'>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Net Income
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
																<option value='USD'>USD</option>
																<option value='EUR'>EUR</option>
																<option value='GBP'>GBP</option>
															</select>
														)}
													/>
												</div>
											</Field>
										);
									}}
								/>
								<form.Field
									name='monthlyCoreExpenses'
									children={(field) => {
										return (
											<Field className='flex flex-col gap-1.5'>
												<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
													Monthly Core Expenses
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
											</Field>
										);
									}}
								/>
							</div>

							<form.Field
								name='trackingMethodologies'
								children={(field) => {
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
										const options = [
											'LIQUID SAVINGS',
											'REAL ESTATE',
											'BROKERAGE',
											'RETIREMENT',
										];
										return (
											<Field className='flex flex-col gap-4'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Active Assets
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
																	'px-4 py-2 text-[10px] font-semibold tracking-widest transition-colors',
																	isSelected
																		? 'bg-slate-200 text-navy-900'
																		: 'bg-slate-50 text-slate-500 hover:bg-slate-100',
																)}
															>
																{opt}
															</button>
														);
													})}
												</div>
											</Field>
										);
									}}
								/>

								<form.Field
									name='debtProfile'
									children={(field) => {
										const options = [
											'Consumer Credit',
											'Student Obligations',
											'Mortgage',
											'Business Debt',
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
											</Field>
										);
									}}
								/>
							</div>

							<form.Field
								name='financialReality'
								children={(field) => {
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
												className='min-h-[120px] resize-none border-none bg-slate-100 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
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
								validators={{
									onChange: personalFinanceSchema.shape.timeHorizon,
								}}
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
												className='min-h-[100px] resize-none border-none bg-slate-100 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
										</Field>
									);
								}}
							/>

							<form.Field
								name='desiredOutcomes'
								validators={{
									onChange: personalFinanceSchema.shape.desiredOutcomes,
								}}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Absolute Financial Autonomy',
										'Optimization of Tax Liabilities',
										'Aggressive Growth Trajectory',
										'Stability & Risk Mitigation',
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
									validators={{
										onChange: personalFinanceSchema.shape.operationalObstacle,
									}}
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
								validators={{
									onChange: personalFinanceSchema.shape.decisionConfidence,
								}}
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

							<div className='bg-[#2A2311] p-8 md:p-10 text-white'>
								<form.Field
									name='successDefinition'
									validators={{
										onChange: personalFinanceSchema.shape.successDefinition,
									}}
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
														'mt-2 min-h-[100px] resize-none border bg-[#1E180B] text-sm text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-gold-500',
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
					<section className='grid gap-8 md:grid-cols-12'>
						<div className='md:col-span-4'>
							<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500'>
								Phase 06
							</p>
							<h2 className='mt-2 font-serif text-2xl text-navy-900'>
								Authentication
							</h2>
							<p className='mt-4 text-xs text-slate-500'>
								Finalize your dossier for consultation.
							</p>
						</div>
						<div className='md:col-span-8'>
							<div className='grid gap-8 sm:grid-cols-2'>
								<form.Field
									name='legalName'
									validators={{
										onChange: personalFinanceSchema.shape.legalName,
									}}
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5 sm:col-span-2'
											>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Legal Full Name
												</FieldLabel>
												<input
													type='text'
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													className='border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
								<form.Field
									name='secureEmail'
									validators={{
										onChange: personalFinanceSchema.shape.secureEmail,
									}}
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field
												data-invalid={isInvalid}
												className='flex flex-col gap-1.5'
											>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Secure Email
												</FieldLabel>
												<input
													type='email'
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													className='border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none'
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
								<form.Field
									name='directContact'
									children={(field) => {
										return (
											<Field className='flex flex-col gap-1.5'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
													Direct Contact
												</FieldLabel>
												<input
													type='tel'
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
													className='border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none'
												/>
											</Field>
										);
									}}
								/>
							</div>

							<div className='flex flex-col items-center pt-16'>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
									children={([canSubmit, isSubmitting]) => (
										<Button
											type='submit'
											disabled={!canSubmit}
											className='w-full sm:w-auto min-w-[280px] rounded-none bg-navy-900 px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-navy-800'
										>
											{isSubmitting ? 'Submitting...' : 'Submit Intake Dossier'}
										</Button>
									)}
								/>
								<p className='mt-4 flex items-center gap-2 text-[9px] text-slate-400'>
									<span className='h-2 w-2 rounded-full bg-navy-900' />
									Encrypted transmission for the security of your privacy and
									financial architecture.
								</p>
							</div>
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
