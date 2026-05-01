'use client';

import { toast } from 'sonner';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { summaryFormValidators } from '@/lib/zod-schemas';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { Textarea } from '@/components/ui/textarea';

export function DraftSummaryForm({ id }: { id: string }) {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const form = useForm({
		defaultValues: {
			title: '',
			summary: '',
		},
		validationLogic: revalidateLogic({
			mode: 'submit',
			modeAfterSubmission: 'change',
		}),
		validators: summaryFormValidators,
		onSubmit: async ({ value }) => {
			try {
				const result = await fetch(`/api/summary/${id}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(value),
				});
				const data = await result.json();
				if (data.success) {
					toast.success('Summary submitted successfully!');
					mutate(`/api/summary/${id}`);
					form.reset();
				} else {
					toast.error(`Submission failed: ${data?.error}`);
				}
			} catch (error) {
				toast.error('An unexpected error occurred');
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name='title'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid} className='mt-6'>
							<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400'>
								Session Title
							</FieldLabel>
							<input
								type='text'
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								placeholder='Enter formal briefing name...'
								className='mt-2 w-full rounded-md border border-transparent bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-300 focus:border-slate-200 focus:outline-none'
							/>
							{isInvalid && (
								<FieldError errors={field.state.meta.errors} className='mt-1' />
							)}
						</Field>
					);
				}}
			/>

			<form.Field
				name='summary'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid} className='mt-5'>
							<FieldLabel className='text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400'>
								Executive Summary
							</FieldLabel>
							<Textarea
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								placeholder="Capture the core insight of today's briefing..."
								rows={3}
								className='mt-2 w-full resize-none rounded-md border border-transparent bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-300 focus:border-slate-200 focus:outline-none'
								label={''}
							/>
							{isInvalid && (
								<FieldError errors={field.state.meta.errors} className='mt-1' />
							)}
						</Field>
					);
				}}
			/>

			<form.Subscribe
				selector={(state) => [state.isSubmitting]}
				children={([isSubmitting]) => (
					<Button
						type='submit'
						disabled={isSubmitting}
						className='mt-5 w-full bg-navy-900 h-10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-navy-800'
					>
						{isSubmitting ? 'Committing...' : 'Commit to Archive'}
					</Button>
				)}
			/>
		</form>
	);
}
