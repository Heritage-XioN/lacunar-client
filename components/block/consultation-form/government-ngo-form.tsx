'use client';

import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { submitConsultationForm } from '@/actions/consultation';
import { toast } from 'sonner';
import { governmentNgoSchema } from '@/lib/zod-schemas';

export function GovernmentNgoForm() {
	const form = useForm({
		defaultValues: {
			orgType: '',
			primaryChallenge: '',
			existingInfrastructure: [] as string[],
			beneficiaryOutcomes: '',
			orgSuccessMetrics: [] as string[],
			vision24Month: '',
			primaryConstraint: '',
			innovationAppetite: [5],
			evidence: '',
			partnershipAnchor: '',
			fullName: '',
			emailAddress: '',
			phoneNumber: '',
		},
		validators: {
			onSubmit: governmentNgoSchema,
			onBlur: governmentNgoSchema,
		},
		onSubmit: async ({ value }) => {
			const result = await submitConsultationForm('government-ngo', value);
			if (result.success) {
				toast.success('Government / NGO Intake Submitted Successfully!');
				form.reset();
			} else {
				toast.error(`Submission Failed: ${result.error}`);
			}
		},
	});

	return (
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900 pb-32'>
			<div className='mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-24 text-center'>
					<h1 className='font-serif text-4xl font-normal text-navy-900 md:text-5xl lg:text-6xl'>
						Shaping the Architecture of
						<br />
						Public Progress.
					</h1>
					<p className='mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500'>
						Lacunar Strategic partners with governments and NGOs to resolve
						complex structural challenges. Begin your engagement by defining the
						parameters of your mission.
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
					{/* 01 Institutional Context */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>01</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Institutional Context
							</h2>
						</div>

						<div className='space-y-8 pl-10'>
							<form.Field
								name='orgType'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Org Type
											</FieldLabel>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger
													className={cn(
														'bg-white border-slate-200',
														isInvalid && 'border-red-400',
													)}
												>
													<SelectValue placeholder='Select institutional category...' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='government'>
														Government Agency
													</SelectItem>
													<SelectItem value='ngo'>
														Non-Governmental Organization (NGO)
													</SelectItem>
													<SelectItem value='nonprofit'>Non-Profit</SelectItem>
													<SelectItem value='multilateral'>
														Multilateral Institution
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

							<form.Field
								name='primaryChallenge'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Primary Challenge
											</FieldLabel>
											<Textarea
												value={field.state.value}
												label=''
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Describe the structural or operational impasse your organization faces...'
												className='min-h-[120px] px-3 resize-none bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='existingInfrastructure'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'Legacy Digital Frameworks',
										'Inter-departmental Data Silos',
										'Fixed Procurement Protocols',
										'Established Public Trust Assets',
									];
									return (
										<Field className='flex flex-col gap-4'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Existing Infrastructure
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
						</div>
					</section>

					<hr className='border-slate-200' />

					{/* 02 Human-Centric Goals */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>02</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Human-Centric Goals
							</h2>
						</div>

						<div className='space-y-8 pl-10'>
							<form.Field
								name='beneficiaryOutcomes'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Beneficiary Outcomes
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Identify the specific societal shifts your target population should experience...'
												className='min-h-[100px] px-3 resize-none bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='orgSuccessMetrics'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const options = [
										'OPERATIONAL EFFICIENCY',
										'PUBLIC SENTIMENT SCORE',
										'POLICY COMPLIANCE',
										'RESOURCE SCALABILITY',
										'SYSTEMIC RESILIENCE',
									];
									return (
										<Field className='flex flex-col gap-4'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Org Success Metrics
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
																'border px-4 py-2 text-[10px] tracking-widest transition-colors',
																isSelected
																	? 'border-navy-900 bg-navy-900 text-white'
																	: 'border-slate-300 bg-transparent text-slate-600 hover:border-navy-900',
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
								name='vision24Month'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												24-Month Vision
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Where does this project stand in two years from launch?'
												className='min-h-[100px] px-3 resize-none bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-navy-900'
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

					{/* 03 Operational Reality */}
					<section className='bg-slate-100 p-8 md:p-12'>
						<div className='flex items-baseline gap-4 mb-8'>
							<span className='font-serif text-2xl text-gold-500'>03</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Operational Reality
							</h2>
						</div>

						<div className='space-y-8 pl-10'>
							<form.Field
								name='primaryConstraint'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-4'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Primary Constraint
											</FieldLabel>
											<RadioGroup
												value={field.state.value}
												onValueChange={field.handleChange}
												className='flex flex-col gap-3'
											>
												{[
													{
														id: 'time',
														label: 'Time-Sensitive Implementation (Immediate)',
													},
													{
														id: 'political',
														label: 'Political & Regulatory Approval Window',
													},
													{ id: 'capex', label: 'CapEx / Budgetary Caps' },
												].map((opt) => (
													<div key={opt.id} className='flex items-center gap-3'>
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
								name='innovationAppetite'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-6 pt-4'>
											<div className='flex items-center justify-between'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
													Innovation Appetite
												</FieldLabel>
												<span className='font-bold text-navy-900'>
													Level {field.state.value[0]}
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
												<div className='mt-2 flex justify-between text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-500'>
													<span>Follow Best Tech</span>
													<span>Balanced Risk</span>
													<span>High Transformative Risk</span>
												</div>
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

					{/* 04 Success & Partnership */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>04</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Success & Partnership
							</h2>
						</div>

						<div className='space-y-8 pl-10'>
							<form.Field
								name='evidence'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field className='flex flex-col gap-3'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Evidence
											</FieldLabel>
											<Textarea
												label=''
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='List existing data or prior pilot findings that inform this intake...'
												className='min-h-[100px] px-3 resize-none bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name='partnershipAnchor'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<div className='grid gap-1'>
												<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
													Partnership Anchor{' '}
													<span className='text-red-500'>*</span>
												</FieldLabel>
												<p className='text-[10px] text-slate-500'>
													Define the single most vital element you require from
													Lacunar Strategic.
												</p>
											</div>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g., Independent audit, Strategic roadmap, Implementation oversight...'
												className={cn(
													'w-full border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-navy-900',
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
						</div>
					</section>

					{/* 05 Administrative Lead Data */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>05</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Administrative Lead Data
							</h2>
						</div>

						<div className='grid gap-8 sm:grid-cols-2 pl-10'>
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
												Full Name
											</FieldLabel>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='Jonathan Doe'
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
								name='emailAddress'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-1.5'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Official Email
											</FieldLabel>
											<input
												type='email'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='j.doe@organization.gov'
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
								name='phoneNumber'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-1.5 sm:col-span-2'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Phone Number
											</FieldLabel>
											<input
												type='tel'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='+1 (000) 000-0000'
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

						<div className='flex flex-col items-center pt-12 pl-10'>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										type='submit'
										disabled={!canSubmit}
										className='w-full sm:w-auto min-w-[280px] rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800 cursor-pointer'
									>
										{isSubmitting ? 'Submitting...' : 'Submit Strategic Intake'}
									</Button>
								)}
							/>
							<p className='mt-4 text-[9px] text-slate-400 text-center max-w-sm'>
								Confidential institutional data protected per Lacunar's Privacy
								Shield protocols.
							</p>
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
