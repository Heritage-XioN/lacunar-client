'use client';

import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { signInFormValidators } from '@/lib/zod-schemas';

export function SignInForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},

		validationLogic: revalidateLogic({
			mode: 'submit',
			modeAfterSubmission: 'change',
		}),

		validators: signInFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch('/api/auth/sign-in', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(value),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Form submitted successfully!');
					form.reset();
					router.push('/dashboard/clients');
				} else {
					toast.error(`signin failed: ${data?.error}`);
				}
			} catch (error) {
				toast.error('An unexpected error occurred');
			}
		},
	});

	return (
		<div className='flex min-h-screen'>
			{/* Left Panel – Hero / Branding */}
			<div className='relative hidden w-full max-w-md flex-col justify-between overflow-hidden bg-navy-900 p-10 lg:flex xl:max-w-lg'>
				{/* Background image */}
				<Image
					src='/signin-hero.png'
					alt='Architectural strategy'
					fill
					className='z-0 object-cover opacity-40'
					priority
					quality={85}
				/>

				{/* Dark overlay */}
				<div className='absolute inset-0 z-10 bg-navy-950/60' />
				<div className='absolute inset-0 z-10 bg-linear-to-b from-navy-950/40 via-transparent to-navy-950/80' />

				{/* Top – Brand label */}
				<div className='relative z-20'>
					<p className='font-heading text-base italic text-gold-400'>
						Architectural Strategy
					</p>
				</div>

				{/* Center – Quote */}
				<div className='relative z-20'>
					<blockquote className='font-heading text-2xl leading-snug font-light italic text-white xl:text-3xl'>
						&ldquo;Precision in thought leads to excellence in execution.&rdquo;
					</blockquote>
					<p className='mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400'>
						The Informed Authority
					</p>
				</div>

				{/* Bottom – Carousel dots */}
				<div className='relative z-20 flex items-center gap-2'>
					<div className='h-0.5 w-8 bg-gold-500' />
					<div className='h-0.5 w-4 bg-slate-500' />
				</div>
			</div>

			{/* Right Panel – Form */}
			<div className='relative flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12'>
				{/* Decorative watermark */}
				<span
					aria-hidden='true'
					className='pointer-events-none absolute -top-4 right-4 select-none font-heading text-[12rem] font-bold leading-none text-slate-100 sm:text-[16rem]'
				>
					A
				</span>

				<div className='relative z-10 w-full max-w-md'>
					{/* Mobile branding */}
					<div className='mb-10 lg:hidden'>
						<Link
							href='/'
							className='text-xs font-bold uppercase tracking-widest text-navy-900'
						>
							Lacunar Consulting Firm
						</Link>
					</div>

					{/* Heading */}
					<h1 className='font-heading text-3xl font-semibold text-navy-900 sm:text-4xl'>
						Welcome Back
					</h1>
					<p className='mt-2 text-sm leading-relaxed text-slate-500'>
						Enter your credentials to access the strategy portal.
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
						{/* Email */}
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
											Consultant Email
										</FieldLabel>
										<input
											type='email'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='name@authority.com'
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
										<FieldLabel className='text-[10px] font-bold uppercase tracking-widest text-navy-900'>
											Secure Password
										</FieldLabel>
										<input
											type='password'
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder='••••••••'
											className='border-b border-slate-300 bg-transparent pb-2 pt-2 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:outline-none'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Remember / Forgot */}
						<div className='flex items-center justify-between'>
							<label className='flex cursor-pointer items-center gap-2'>
								<Checkbox className='border-slate-300 data-checked:border-navy-900 data-checked:bg-navy-900' />
								<span className='text-sm text-navy-900'>Remember device</span>
							</label>
							<Link
								href='#'
								className='text-sm text-navy-700 underline-offset-4 transition-colors hover:text-gold-500 hover:underline'
							>
								Forgot Password?
							</Link>
						</div>

						{/* Submit */}
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type='submit'
									disabled={!canSubmit}
									className='w-full cursor-pointer rounded-none bg-navy-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-800'
								>
									{isSubmitting ? (
										'Authenticating...'
									) : (
										<>
											Sign In to Portal <ArrowRight className='ml-2 h-4 w-4' />
										</>
									)}
								</Button>
							)}
						/>

						{/* Divider */}
						<div className='flex items-center gap-4'>
							<div className='h-px flex-1 bg-slate-200' />
							<span className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
								New Associate?
							</span>
							<div className='h-px flex-1 bg-slate-200' />
						</div>

						{/* Sign Up CTA */}
						<Button
							type='button'
							variant='outline'
							className='w-full cursor-pointer rounded-none border-slate-200 px-8 py-6 text-xs font-bold uppercase tracking-widest text-navy-900 hover:bg-slate-50'
							asChild
						>
							<Link href='/sign-up'>Request Access / Signup</Link>
						</Button>
					</form>

					{/* Confidentiality notice */}
					<p className='mt-10 text-[9px] font-bold uppercase leading-relaxed tracking-wider text-slate-400'>
						Confidentiality Notice: Access is restricted to authorized
						consultants. All sessions are logged for security purposes.
					</p>
				</div>
			</div>
		</div>
	);
}
