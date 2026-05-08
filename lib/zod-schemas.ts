import { z } from 'zod';
const requiredText = (label: string) =>
	z.string().trim().min(1, `${label} is required`);

const securePassword = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
	.regex(/[0-9]/, 'Password must contain at least one number')
	.regex(
		/[^A-Za-z0-9]/,
		'Password must contain at least one special character',
	);

const minText = (label: string, minimum: number) =>
	z
		.string()
		.trim()
		.min(minimum, `${label} must be at least ${minimum} characters`);

const requiredEmail = z.email('Enter a valid email address');

const requiredPhone = z.string().trim().min(7, 'Enter a valid phone number');

const requiredSelection = (label: string) => requiredText(label);

const requiredSelections = (label: string, minimum = 1) =>
	z.array(z.string()).min(minimum, `Select at least ${minimum} ${label}`);

const exactSelections = (label: string, count: number) =>
	z
		.array(z.string())
		.min(count, `Select exactly ${count} ${label}`)
		.max(count, `Select exactly ${count} ${label}`);

const nonNegativeNumber = (label: string) =>
	z
		.number({ error: `${label} is required` })
		.min(0, `${label} must be 0 or greater`);

const sliderSelection = (
	label: string,
	{ min, max }: { min: number; max: number },
) => z.array(z.number().min(min).max(max)).length(1, `${label} is required`);

const requiredUrl = z.string().trim().url('Enter a valid URL');

const createFormValidators = <TSchema extends z.ZodType>(schema: TSchema) => ({
	// onBlur: schema,
	// onSubmit: schema,
	onDynamic: schema,
});

export const businessConsultingSchema = z.object({
	businessPhase: requiredSelection('Business phase'),
	interventionAreas: requiredSelections('intervention area'),
	existingSystems: requiredSelections('existing system'),
	recognizedBenefits: exactSelections('benefit', 2),
	vision12Month: requiredText('12-month vision'),
	tomorrowQuestion: requiredText('Tomorrow question'),
	primaryBottleneck: requiredSelection('Primary bottleneck'),
	organizationalReadiness: sliderSelection('Organizational readiness', {
		min: 1,
		max: 5,
	}),
	valueIndicator: requiredText('12-month value indicator'),
	relationshipSuccess: requiredText('Relationship success definition'),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
});

export const businessConsultingFormValidators = createFormValidators(
	businessConsultingSchema,
);

export const sustainingFamilyWealthSchema = z.object({
	governanceStructure: requiredSelection('Governance structure'),
	familyOpenness: requiredSelection('Family openness'),
	familyAssets: requiredSelections('family asset'),
	primaryObjectives: requiredSelections('primary objective'),
	qualitativeVision: minText('Qualitative vision snapshot', 2),
	currentObstacles: minText('Current obstacles', 2),
	successMetric: requiredText('Success metric'),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
});

export const sustainingFamilyWealthFormValidators = createFormValidators(
	sustainingFamilyWealthSchema,
);

export const personalFinanceSchema = z.object({
	primaryReason: requiredSelection('Primary reason'),
	financialStress: requiredSelection('Financial stress level'),
	monthlyNetIncome: nonNegativeNumber('Monthly net income'),
	incomeCurrency: requiredSelection('Income currency'),
	monthlyCoreExpenses: nonNegativeNumber('Monthly core expenses'),
	activeAssets: requiredSelections('active asset'),
	debtProfile: requiredSelections('debt type'),
	investmentReality: minText('Financial reality', 2),
	timeHorizon: requiredSelection('Time horizon'),
	vision730Day: requiredText('730-day vision'),
	desiredOutcomes: exactSelections('desired outcome', 3),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
});

export const personalFinanceFormValidators = createFormValidators(
	personalFinanceSchema,
);

export const governmentNgoSchema = z.object({
	orgType: requiredSelection('Organization type'),
	primaryChallenge: requiredText('Primary challenge'),
	existingInfrastructure: requiredSelections('infrastructure option'),
	beneficiaryOutcomes: requiredText('Beneficiary outcomes'),
	orgSuccessMetrics: requiredSelections('success metric'),
	vision24Month: requiredText('24-month vision'),
	primaryConstraint: requiredSelection('Primary constraint'),
	innovationAppetite: sliderSelection('Innovation appetite', {
		min: 1,
		max: 10,
	}),
	evidence: requiredText('Evidence'),
	partnershipAnchor: requiredText('Partnership anchor'),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
});

export const governmentNgoFormValidators =
	createFormValidators(governmentNgoSchema);

export const TpConsultantsSchema = z.object({
	schoolOrTeamName: requiredSelection('School or team name'),
	objectives: requiredText('Objectives'),
	progressReport: requiredText('Progress report'),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
});

export const TpConsultantsFormValidators =
	createFormValidators(TpConsultantsSchema);

export const digitalDiscoverySchema = z.object({
	primaryIntent: requiredSelections('primary intent'),
	financialStress: requiredSelection('Financial stress level'),
	monthlyNetIncome: nonNegativeNumber('Monthly net income'),
	monthlyExpenses: nonNegativeNumber('Monthly expenses'),
	trackingMethods: z.array(z.string()),
	currentAssets: z.array(z.string()),
	debtTypes: z.array(z.string()),
	approximateTotalDebt: z
		.number()
		.min(0, 'Total debt must be 0 or greater')
		.optional(),
	keepingYouUp: requiredText('Response'),
	wealthHorizon: requiredSelection('Wealth horizon'),
	desiredOutcomes: exactSelections('desired outcome', 2),
	coreBelief: z.string().trim().optional(),
	primaryConstraints: requiredSelection('Primary constraint'),
	upcomingLifeEvents: z.string().trim().optional(),
	decisionConfidence: sliderSelection('Decision confidence', {
		min: 1,
		max: 10,
	}),
	definitionOfSuccess: requiredText('Definition of success'),
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone.optional(),
});

export const digitalDiscoveryFormValidators = createFormValidators(
	digitalDiscoverySchema,
);

export const ReviewSchema = z.object({
	engagementQuality: requiredSelection('Engagement quality'),
	fullName: requiredText('Full legal name'),
	role: requiredText('Executive title'),
	organisation: requiredText('Organization'),
	social: requiredUrl,
	feedback: minText('Feedback', 20),
});

export const ReviewFormValidators = createFormValidators(ReviewSchema);

export const signInSchema = z.object({
	email: requiredEmail,
	password: securePassword,
});

export const signInFormValidators = createFormValidators(signInSchema);

export const signUpSchema = z.object({
	fullName: requiredText('Full name'),
	email: requiredEmail,
	phoneNumber: requiredPhone,
	password: securePassword,
});

export const signUpFormValidators = createFormValidators(signUpSchema);

export const summarySchema = z.object({
	title: requiredText('summary title'),
	summary: minText('Summary', 10),
});

export const summaryFormValidators = createFormValidators(summarySchema);
