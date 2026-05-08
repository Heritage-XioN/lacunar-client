'use client';

import { useRouter } from 'next/navigation';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { TpConsultantsFormValidators } from '@/lib/zod-schemas';

export function TpConsultantForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			schoolOrTeamName: '',
			objectives: '',
			progressReport: '',
			fullName: '',
			email: '',
			phoneNumber: '',
		},
		validationLogic: revalidateLogic({
			mode: 'submit', // Before first submit, validate only on submit
			modeAfterSubmission: 'change', // After first submit, validate on every change
		}),

		validators: TpConsultantsFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch('/api/consultations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						category: 'student-finance-community',
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
		<div className='min-h-screen bg-slate-50 font-sans text-navy-900 pb-32'>
			<div className='mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8'>
				{/* Form Header */}
				<div className='mb-24 text-center'>
					<h1 className='font-serif text-4xl font-normal text-navy-900 md:text-5xl lg:text-6xl'>
						Join Our Student Finance Community
					</h1>
					<p className='mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500'>
						Join a community where students learn the skills in consulting,
						investing and business skills from experienced mentors.
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
					{/* 01 Student Finance Community */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>01</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								School Or Team Name
							</h2>
						</div>
						<div className='space-y-8 pl-10'>
							<form.Field
								name='schoolOrTeamName'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g. The investment society FUTO'
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

					{/* 02 Objectives */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>02</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								What is your main objective?
							</h2>
						</div>
						<div className='space-y-8 pl-10'>
							<form.Field
								name='objectives'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g. questions or observations about course module.'
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

					{/* 03 Progress Report */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>03</span>
							<h2 className='font-serif text-2xl text-navy-900'>
								Progress Report
							</h2>
						</div>
						<div className='space-y-8 pl-10'>
							<form.Field
								name='progressReport'
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											className='flex flex-col gap-3'
										>
											<input
												type='text'
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												placeholder='e.g. updates on the last team progress'
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

					{/* 04 Administrative Lead Data */}
					<section className='space-y-8'>
						<div className='flex items-baseline gap-4'>
							<span className='font-serif text-2xl text-gold-500'>04</span>
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
										className='w-full sm:w-auto min-w-70 rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800 cursor-pointer'
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
