'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { StepOneForm } from './step-one-form';
import { StepTwoForm } from './step-two-form';
import { FinalStepForm } from './final-step-form';
import { Transition } from '@headlessui/react';

/* ─── Schema ─── */
const formSchema = z.object({
	organizationName: z.string().min(2, 'Organization name is required.'),
	industry: z.string().min(1, 'Please select your industry.'),
	contactPerson: z.string().min(2, 'Contact person is required.'),
	engagementScope: z.array(z.string()).min(1, 'Select at least one scope.'),
	preferredKickoff: z.string().min(1, 'Select a preferred kickoff.'),
	projectDuration: z.string().min(1, 'Select a project duration.'),
});

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

export function useFormState() {
	const form = useForm({
		defaultValues: {
			organizationName: '',
			industry: '',
			contactPerson: '',
			engagementScope: [] as string[],
			preferredKickoff: '',
			projectDuration: '',
		},

		validators: {
			onSubmit: formSchema,
			onBlur: formSchema,
		},

		onSubmit: async ({ value }) => {
			console.log('Onboarding finalized!', value);
			alert('Onboarding finalized! Our advisors will begin alignment shortly.');
		},
	});

	return form;
}
export function MultiStepForm() {
	const [step, setStep] = React.useState(0);
	const form = useFormState();

	const handleNext = () => {
		if (step === 0) {
			const { organizationName, industry, contactPerson } = form.state.values;
			let isValid = form.state.isTouched && form.state.isValid;
			if (isValid) setStep(1);
		} else if (step === 1) {
			const { engagementScope, preferredKickoff, projectDuration } =
				form.state.values;
			let isValid = form.state.isTouched && form.state.isValid;
			if (isValid) setStep(2);
		}
	};

	const handleBack = () => {
		if (step > 0) setStep(step - 1);
	};

	/* ─── Helpers for Review Step ─── */
	const getSelectedScopes = () => {
		return engagementOptions.filter((opt) =>
			form.state.values.engagementScope.includes(opt.value),
		);
	};

	const getKickoffLabel = () => {
		const found = kickoffOptions.find(
			(k) => k.value === form.state.values.preferredKickoff,
		);
		return found || null;
	};

	const getDurationLabel = () => {
		const found = durationOptions.find(
			(d) => d.value === form.state.values.projectDuration,
		);
		return found?.label || '';
	};

	return (
		<form
			id='consultation-form'
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className='flex min-h-screen flex-col bg-white'>
				{/* ─── Step 1: Logo-centered header layout ─── */}
				<Transition
					show={step === 0}
					enter='transition-opacity duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition-opacity duration-300'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div>
						<StepOneForm form={form} onNext={handleNext} />
					</div>
				</Transition>

				{/* ─── Step 2: Timeline & Delivery ─── */}
				<Transition
					show={step === 1}
					enter='transition-opacity duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition-opacity duration-300'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div>
						<StepTwoForm form={form} onNext={handleNext} onBack={handleBack} />
					</div>
				</Transition>

				{/* ─── Step 3: Review & Submit ─── */}
				<Transition
					show={step === 2}
					enter='transition-opacity duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition-opacity duration-300'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div>
						<FinalStepForm
							form={form}
							onBack={handleBack}
							selectedScopes={getSelectedScopes()}
							kickoff={getKickoffLabel()}
							duration={getDurationLabel()}
						/>
					</div>
				</Transition>
			</div>
		</form>
	);
}
