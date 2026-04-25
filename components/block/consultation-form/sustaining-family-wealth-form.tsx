'use client';

import { useForm } from '@tanstack/react-form';
import z from 'zod';
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const sustainingFamilyWealthSchema = z.object({
	governanceStructure: z.string().min(1, 'Select a governance structure'),
	familyOpenness: z.string().min(1, 'Select a value on the scale'),
	primaryObjectives: z
		.array(z.string())
		.min(1, 'Select at least one objective'),
	qualitativeVision: z.string().optional(),
	currentObstacles: z.string().optional(),
	successMetric: z.string().min(1, 'Success metric is mandatory'),
	fullName: z.string().min(1, 'Full name is required'),
	emailAddress: z.string().email('Invalid email address'),
	preferredTime: z.string().min(1, 'Select a preferred time'),
});

export function SustainingFamilyWealthForm() {
	const form = useForm({
		defaultValues: {
			governanceStructure: '',
			familyOpenness: '',
			primaryObjectives: [] as string[],
			qualitativeVision: '',
			currentObstacles: '',
			successMetric: '',
			fullName: '',
			emailAddress: '',
			preferredTime: '',
		},
		onSubmit: async ({ value }) => {
			console.log('Form submitted:', value);
			alert(
				'Sustaining Family Wealth Intake Submitted! Check console for data.',
			);
		},
	});

	return (
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900 pb-32'>
			{/* Top Nav (Optional/Inline) */}
			<header className='flex items-center justify-between px-6 py-6 md:px-12'>
				<div className='font-serif text-xl font-bold tracking-tight'>
					Sustaining Family Wealth
				</div>
				<div className='hidden items-center gap-8 text-sm text-slate-500 md:flex'>
					<a href='#governance' className='hover:text-navy-900'>
						Governance
					</a>
					<a href='#goals' className='hover:text-navy-900'>
						Goals
					</a>
					<a href='#constraints' className='hover:text-navy-900'>
						Constraints
					</a>
					<a href='#success' className='hover:text-navy-900'>
						Success
					</a>
					<Button className='bg-navy-900 px-6 py-2 text-xs uppercase tracking-widest text-white hover:bg-navy-800 rounded-none'>
						Contact Advisor
					</Button>
				</div>
			</header>

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
								validators={{
									onChange:
										sustainingFamilyWealthSchema.shape.governanceStructure,
								}}
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
								validators={{
									onChange: sustainingFamilyWealthSchema.shape.familyOpenness,
								}}
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
													className='flex gap-4'
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
								validators={{
									onChange:
										sustainingFamilyWealthSchema.shape.primaryObjectives,
								}}
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
												className='min-h-[120px] resize-none border-none bg-slate-50 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
										</Field>
									);
								}}
							/>
						</section>

						{/* Image Interstitial */}
						<section className='relative h-64 overflow-hidden bg-slate-200'>
							<div className='absolute inset-0 flex items-center justify-center opacity-30'>
								<div className='absolute h-[200%] w-px -rotate-45 bg-slate-400' />
								<div className='absolute h-[200%] w-px rotate-45 bg-slate-400' />
							</div>
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
												className='min-h-[100px] resize-none border-none bg-slate-50 p-4 focus-visible:ring-1 focus-visible:ring-navy-900'
											/>
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
										validators={{
											onChange:
												sustainingFamilyWealthSchema.shape.successMetric,
										}}
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
									validators={{
										onChange: sustainingFamilyWealthSchema.shape.fullName,
									}}
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
									name='emailAddress'
									validators={{
										onChange: sustainingFamilyWealthSchema.shape.emailAddress,
									}}
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
								name='preferredTime'
								validators={{
									onChange: sustainingFamilyWealthSchema.shape.preferredTime,
								}}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Preferred Time For Consultation
											</FieldLabel>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<SelectTrigger
													className={cn(
														'border-b border-slate-300 bg-transparent px-0 pb-2 shadow-none focus:ring-0 rounded-none border-x-0 border-t-0',
														isInvalid && 'border-red-400',
													)}
												>
													<SelectValue placeholder='Select a time...' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='Early Morning'>
														Early Morning (8am - 10am)
													</SelectItem>
													<SelectItem value='Late Morning'>
														Late Morning (10am - 12pm)
													</SelectItem>
													<SelectItem value='Afternoon'>
														Afternoon (1pm - 4pm)
													</SelectItem>
													<SelectItem value='Evening'>
														Evening (4pm - 6pm)
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

							<div className='flex flex-col items-center pt-8'>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
									children={([canSubmit, isSubmitting]) => (
										<Button
											type='submit'
											disabled={!canSubmit}
											className='w-full sm:w-auto min-w-[280px] rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800'
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
