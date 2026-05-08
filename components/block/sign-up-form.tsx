'use client';

import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { signUpFormValidators } from '@/lib/zod-schemas';

export function SignUpForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			phoneNumber: '',
			password: '',
		},

		validationLogic: revalidateLogic({
			mode: 'submit',
			modeAfterSubmission: 'change',
		}),

		validators: signUpFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch('/api/auth/sign-up', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(value),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Signup Successful!');
					form.reset();
					router.push('/sign-in');
				} else {
					toast.error(`signup failed: ${data?.error}`);
				}
			} catch (error) {
				toast.error('An unexpected error occurred');
			}
		},
	});

	return (
		<div className='relative min-h-screen bg-slate-50'>
			{/* Decorative background stripes */}
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='absolute -right-20 top-0 h-full w-1/3 -skew-x-12 bg-slate-100/70' />
				<div className='absolute -right-32 top-0 h-full w-1/4 -skew-x-12 bg-slate-100/50' />
			</div>

			{/* Top header */}
			<div className='relative z-10 pt-12 pb-8 text-center'>
				<p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400'>
					Institutional Access
				</p>
				<p className='mt-1.5 font-heading text-lg italic text-navy-900'>
					Architectural Strategy
				</p>
			</div>

			{/* Form card */}
			<div className='relative z-10 mx-auto max-w-lg px-6 pb-16 sm:px-10'>
				<div className='bg-white px-8 py-12 shadow-sm md:px-12 md:py-14'>
					{/* Heading */}
					<h1 className='font-heading text-2xl font-semibold text-navy-900'>
						Consultant Application
					</h1>
					<p className='mt-3 max-w-sm text-sm leading-relaxed text-slate-500'>
						Join an elite network of strategic advisors. Begin your onboarding
						by establishing your professional credentials.
					</p>

					{/* Form */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className='mt-10 space-y-8'
					>
						{/* Full Name */}
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
											placeholder='Julian Thorne'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Email Address */}
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
											Email Address
										</FieldLabel>
										<input
											type='email'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='j.thorne@strategy.global'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Phone Number */}
						<form.Field
							name='phoneNumber'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Phone Number
										</FieldLabel>
										<input
											type='tel'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='+1 (555) 000-0000'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Password */}
						<form.Field
							name='password'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<div className='flex items-center justify-between'>
											<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
												Password
											</FieldLabel>
											<Link
												href='#'
												className='text-[10px] font-bold uppercase tracking-widest text-navy-700 underline-offset-4 transition-colors hover:text-gold-500 hover:underline'
											>
												Forgot Password?
											</Link>
										</div>
										<input
											type='password'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='••••••••••'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Submit */}
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type='submit'
									disabled={!canSubmit}
									className='w-full cursor-pointer rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800'
								>
									{isSubmitting ? 'Processing...' : 'Submit Application'}
								</Button>
							)}
						/>

						{/* Sign In CTA */}
						<p className='text-center text-[10px] font-bold uppercase tracking-widest text-slate-400'>
							Already have access?{' '}
							<Link
								href='/sign-in'
								className='font-bold text-navy-900 underline-offset-4 transition-colors hover:underline'
							>
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
