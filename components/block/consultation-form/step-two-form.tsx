import { z } from 'zod';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const engagementOptions = [
	{
		value: 'operational-strategy',
		title: 'Operational Strategy',
		description:
			'Full-scale transformation including digital infrastructure and executive alignment.',
	},
	{
		value: 'global-presence',
		title: 'Global Presence',
		description:
			'Multilateral expansion across EMEA and APAC regions with localized compliance.',
	},
	{
		value: 'digital-transformation',
		title: 'Digital Transformation',
		description:
			'End-to-end modernization of legacy systems with cloud-native architecture.',
	},
];

const kickoffOptions = [
	{ value: 'october-2024', label: 'October 2024', tag: 'Q4 Strategic' },
	{ value: 'january-2025', label: 'January 2025', tag: 'Q1 Launch' },
	{ value: 'april-2025', label: 'April 2025', tag: 'Q2 Accelerator' },
];

const durationOptions = [
	{ value: '8-10-weeks', label: '8-10 Weeks' },
	{ value: '12-14-weeks', label: '12-14 Weeks' },
	{ value: '16-20-weeks', label: '16-20 Weeks' },
	{ value: '24-plus-weeks', label: '24+ Weeks' },
];

export function StepTwoForm({
	form,
	onNext,
	onBack,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any;
	onNext: () => void;
	onBack: () => void;
}) {
	const toggleScope = (value: string) => {
		const current: string[] = form.state.values.engagementScope;
		if (current.includes(value)) {
			form.setFieldValue(
				'engagementScope',
				current.filter((v: string) => v !== value),
			);
		} else {
			form.setFieldValue('engagementScope', [...current, value]);
		}
	};

	return (
		<div className='flex min-h-screen flex-col'>
			<main className='mx-auto w-full max-w-3xl flex-1 px-6 pt-12 pb-8'>
				{/* Step Badge */}
				<div className='flex justify-center'>
					<span className='rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-50'>
						Step 2 of 3
					</span>
				</div>

				<h1 className='mt-4 text-center font-serif text-4xl font-bold text-navy-900 md:text-5xl'>
					Scope & Timeline
				</h1>
				<p className='mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-slate-500'>
					Define the strategic verticals and preferred delivery cadence for your
					engagement.
				</p>

				{/* Two columns */}
				<div className='mt-12 grid gap-10 md:grid-cols-2'>
					{/* Left — Engagement Scope */}
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
							Engagement Scope
						</p>
						<div className='mt-4 space-y-3'>
							{engagementOptions.map((opt) => {
								const isSelected = form.state.values.engagementScope.includes(
									opt.value,
								);
								return (
									<button
										key={opt.value}
										type='button'
										onClick={() => toggleScope(opt.value)}
										className={cn(
											'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all',
											isSelected
												? 'border-navy-900 bg-navy-900/[0.03]'
												: 'border-slate-200 hover:border-slate-300',
										)}
									>
										<div
											className={cn(
												'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
												isSelected
													? 'border-navy-900 bg-navy-900 text-white'
													: 'border-slate-300',
											)}
										>
											{isSelected && (
												<svg
													className='h-3 w-3'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth={3}
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M5 13l4 4L19 7'
													/>
												</svg>
											)}
										</div>
										<div>
											<p className='text-sm font-semibold text-navy-900'>
												{opt.title}
											</p>
											<p className='mt-0.5 text-xs leading-relaxed text-slate-500'>
												{opt.description}
											</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Right — Timeline & Delivery */}
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
							Timeline & Delivery
						</p>

						{/* Preferred Kickoff */}
						<div className='mt-4'>
							<p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-400'>
								Preferred Kickoff
							</p>
							<form.Field name='preferredKickoff'>
								{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
								{(field: any) => (
									<Select
										name={field.name}
										value={field.state.value}
										onValueChange={field.handleChange}
									>
										<SelectTrigger className='mt-2 w-full rounded-none border-x-0 border-t-0 border-b border-slate-200 bg-transparent px-0 py-3 text-base shadow-none focus:ring-0'>
											<SelectValue placeholder='Select kickoff quarter' />
										</SelectTrigger>
										<SelectContent>
											{kickoffOptions.map((k) => (
												<SelectItem key={k.value} value={k.value}>
													{k.label}{' '}
													<span className='text-slate-400'>({k.tag})</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							</form.Field>
						</div>

						{/* Est. Project Duration */}
						<div className='mt-8'>
							<p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-400'>
								Est. Project Duration
							</p>
							<form.Field name='projectDuration'>
								{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
								{(field: any) => (
									<Select
										name={field.name}
										value={field.state.value}
										onValueChange={field.handleChange}
									>
										<SelectTrigger className='mt-2 w-full rounded-none border-x-0 border-t-0 border-b border-slate-200 bg-transparent px-0 py-3 text-base shadow-none focus:ring-0'>
											<SelectValue placeholder='Select duration range' />
										</SelectTrigger>
										<SelectContent>
											{durationOptions.map((d) => (
												<SelectItem key={d.value} value={d.value}>
													{d.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							</form.Field>
						</div>

						{/* Insight box */}
						<div className='mt-8 rounded-sm border-l-4 border-gold-400 bg-gold-200/20 px-5 py-4'>
							<p className='text-xs leading-relaxed text-slate-600'>
								Kickoff dates are provisional. Final alignment will be confirmed
								during your initial strategist call.
							</p>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<div className='mt-16 flex items-center justify-between'>
					<button
						type='button'
						onClick={onBack}
						className='flex items-center gap-2 text-sm font-medium text-navy-900 transition-colors hover:text-navy-700'
					>
						<ArrowLeft className='h-4 w-4' />
						Back to Identity
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
		</div>
	);
}
