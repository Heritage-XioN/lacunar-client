import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import z from 'zod';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useFormState } from './multi-step-form';

const industries = [
	'Financial Services',
	'Technology',
	'Healthcare',
	'Manufacturing',
	'Energy & Utilities',
	'Real Estate',
	'Government & Public Sector',
	'Telecommunications',
	'Retail & Consumer',
];

export function StepOneForm({
	form,
	onNext,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: ReturnType<typeof useFormState>;
	onNext: () => void;
}) {
	return (
		<div className='flex min-h-screen flex-col'>
			{/* Logo Header */}
			<div className='flex items-center justify-center gap-3 pt-6 pb-2'>
				<div className='flex h-10 w-10 items-center justify-center rounded-md bg-navy-900 font-serif text-lg font-bold italic text-white'>
					A
				</div>
				<div className='leading-tight'>
					<p className='font-serif text-lg font-semibold text-navy-900'>
						LACUNAR
					</p>
					<p className='text-xs font-medium uppercase tracking-widest text-navy-600'>
						Consulting
					</p>
				</div>
			</div>

			{/* Main Content */}
			<main className='mx-auto w-full max-w-2xl flex-1 px-6 pt-10 pb-8'>
				{/* Title Row */}
				<div className='flex items-end justify-between'>
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.25em] text-slate-400'>
							Onboarding Journal
						</p>
						<h1 className='mt-1 font-serif text-3xl italic text-navy-900 md:text-4xl'>
							Get Started
						</h1>
					</div>
					{/* Step Badge */}
					<div className='flex justify-center'>
						<span className='rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-50'>
							Step 1 of 3
						</span>
					</div>
				</div>

				<Separator className='mt-4 mb-10 bg-slate-200' />

				{/* Section Title */}
				<h2 className='font-serif text-2xl font-semibold text-navy-900'>
					Primary Identity
				</h2>
				<p className='mt-2 text-sm leading-relaxed text-slate-500'>
					Please provide the foundational details of your entity to align our
					strategic framework with your operational reality.
				</p>

				{/* Form Fields */}
				<div className='mt-10 space-y-8'>
					<FieldGroup>
						{/* Organization Name */}
						<form.Field
							name='organizationName'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<FieldLabel
											htmlFor={field.name}
											className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'
										>
											Organization Name
										</FieldLabel>
										<input
											type='text'
											id='organizationName'
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											aria-invalid={isInvalid}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												field.handleChange(e.target.value)
											}
											className={cn(
												'border-b bg-transparent pb-3 text-base text-navy-900 transition-colors placeholder:text-slate-300 focus:border-navy-900 focus:outline-none',
												isInvalid ? 'border-red-400' : 'border-slate-200',
											)}
											placeholder='Acme Strategic Holdings'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Industry Select */}
						<form.Field name='industry'>
							{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
							{(field: any) => {
								const hasError =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;
								return (
									<div className='flex flex-col gap-1.5'>
										<label className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
											Industry
										</label>
										<Select
											name={field.name}
											value={field.state.value}
											onValueChange={field.handleChange}
										>
											<SelectTrigger
												id='industry'
												className={cn(
													'w-full rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 py-3 text-base shadow-none focus:ring-0',
													hasError ? 'border-red-400' : 'border-slate-200',
													field.state.value
														? 'text-navy-900'
														: 'text-slate-400',
												)}
											>
												<SelectValue placeholder='Select your sector' />
											</SelectTrigger>
											<SelectContent>
												{industries.map((ind) => (
													<SelectItem key={ind} value={ind}>
														{ind}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{hasError && (
											<p className='text-xs text-red-500'>
												{field.state.meta.errors.join(', ')}
											</p>
										)}
									</div>
								);
							}}
						</form.Field>

						{/* Contact Person */}
						<form.Field
							name='contactPerson'
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field
										data-invalid={isInvalid}
										className='flex flex-col gap-1.5'
									>
										<FieldLabel
											htmlFor={field.name}
											className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'
										>
											Contact person
										</FieldLabel>
										<input
											type='text'
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											aria-invalid={isInvalid}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												field.handleChange(e.target.value)
											}
											className={cn(
												'border-b bg-transparent pb-3 text-base text-navy-900 transition-colors placeholder:text-slate-300 focus:border-navy-900 focus:outline-none',
												isInvalid ? 'border-red-400' : 'border-slate-200',
											)}
											placeholder='Acme Strategic Holdings'
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</div>

				{/* Consultant Insight Callout */}
				<div className='mt-10 rounded-sm border-l-4 border-gold-400 bg-gold-200/20 px-5 py-4'>
					<div className='flex items-center gap-2'>
						<Lightbulb className='h-4 w-4 text-gold-500' />
						<p className='text-xs font-semibold uppercase tracking-[0.2em] text-navy-900'>
							Consultant Insight
						</p>
					</div>
					<p className='mt-2 text-sm leading-relaxed text-slate-600'>
						By providing accurate industry context, you allow our AI-driven
						modeling to benchmark your organization against sector leaders in
						real-time.
					</p>
				</div>

				{/* Navigation */}
				<div className='mt-16 flex items-center justify-between'>
					<button
						type='button'
						className='flex items-center gap-2 text-sm font-medium text-navy-900 transition-colors hover:text-navy-700'
					>
						<ArrowLeft className='h-4 w-4' />
						Return to Introduction
					</button>
					<Button
						type='button'
						onClick={onNext}
						className='gap-2 bg-navy-900 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-navy-800'
					>
						Continue
						<ArrowRight className='h-4 w-4' />
					</Button>
				</div>
			</main>

			{/* Internal Footer */}
			<footer className='border-t border-slate-100 bg-white'>
				<div className='mx-auto flex max-w-2xl items-center justify-between px-6 py-4'>
					<p className='text-[10px] font-semibold uppercase tracking-widest text-slate-300'>
						LACUNAR Internal Onboarding v4.2
					</p>
					<div className='flex gap-6'>
						<p className='text-[10px] font-semibold uppercase tracking-widest text-slate-300'>
							Confidential
						</p>
						<p className='text-[10px] font-semibold uppercase tracking-widest text-slate-300'>
							ISO 27001
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
