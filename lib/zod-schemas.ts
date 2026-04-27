import z from 'zod';

export const businessConsultingSchema = z.object({
	businessPhase: z.string().min(1, 'Select a business phase'),
	interventionAreas: z.array(z.string()).min(1, 'select at least 1'),
	existingSystems: z.array(z.string()).min(1, 'select at least 1'),
	recognizedBenefits: z
		.array(z.string())
		.min(2, 'Select exactly 2 benefits')
		.max(2, 'Select exactly 2 benefits'),
	vision12Month: z.string().min(1, 'pls provide some values'),
	tomorrowQuestion: z.string().min(1, 'pls provide some values'),
	primaryBottleneck: z.string().min(1, 'Select a primary bottleneck'),
	organizationalReadiness: z.array(z.number()),
	valueIndicator: z.string().min(1, 'pls provide some values'),
	relationshipSuccess: z
		.string()
		.min(1, 'Relationship success definition is required'),
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	phoneNumber: z.string().min(1, 'provide a value'),
});

export const sustainingFamilyWealthSchema = z.object({
	governanceStructure: z.string().min(1, 'Select a governance structure'),
	familyOpenness: z.string().min(1, 'Select a value on the scale'),
	familyAssets: z.array(z.string()).min(1, 'Select at least one assets class'),
	primaryObjectives: z
		.array(z.string())
		.min(1, 'Select at least one objective'),
	qualitativeVision: z.string().min(2, 'enter a value'),
	currentObstacles: z.string().min(2, 'enter a value'),
	successMetric: z.string().min(1, 'Success metric is mandatory'),
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	phoneNumber: z.string().min(2, 'enter a value'),
});

export const personalFinanceSchema = z.object({
	primaryCatalyst: z.string().min(1, 'select one'),
	financialStress: z.string().min(1, 'select one'),
	monthlyNetIncome: z.number().min(0, 'Must be positive'),
	incomeCurrency: z.string().min(1, 'provide a value'),
	monthlyCoreExpenses: z.number().min(0, 'Must be positive'),
	trackingMethodologies: z.array(z.string()).min(1, 'select at least one'),
	activeAssets: z.array(z.string()).min(1, 'select at least one'),
	debtProfile: z.array(z.string()).min(1, 'select at least one'),
	financialReality: z.string().min(2, 'provided a value'),
	timeHorizon: z.string().min(1, 'Select a time horizon'),
	vision730Day: z.string().min(1, 'Select a time horizon'),
	desiredOutcomes: z
		.array(z.string())
		.min(3, 'Select exactly 3 outcomes')
		.max(3, 'Select exactly 3 outcomes'),
	operationalObstacle: z.string().min(1, 'Select a primary obstacle'),
	decisionConfidence: z.string().min(1, 'Select your confidence index'),
	successDefinition: z.string().min(1, 'Please define success'),
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	phoneNumber: z.string().min(1, 'Select a time horizon'),
});

export const governmentNgoSchema = z.object({
	orgType: z.string().min(1, 'Select an organization type'),
	primaryChallenge: z.string().min(1, 'Primary challenge is required'),
	existingInfrastructure: z
		.array(z.string())
		.min(1, 'Select existing infrastructure'),
	beneficiaryOutcomes: z.string().min(1, 'Beneficiary outcomes are required'),
	orgSuccessMetrics: z.array(z.string()).min(1, 'Select org success metrics'),
	vision24Month: z.string().min(1, 'Vision 24 Month is required'),
	primaryConstraint: z.string().min(1, 'Select a constraint'),
	innovationAppetite: z
		.array(z.number())
		.min(1, 'Innovation appetite is required'),
	evidence: z.string().min(1, 'Evidence is required'),
	partnershipAnchor: z.string().min(1, 'Partnership anchor is required'),
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	phoneNumber: z.string().min(1, 'must be greater than 1'),
});

export const digitalDiscoverySchema = z.object({
	primaryIntent: z.array(z.string()).min(1, 'Select at least one option'),
	financialStress: z.string().min(1, 'Select a stress level'),
	monthlyNetIncome: z.number().min(0, 'Must be positive'),
	monthlyExpenses: z.number().min(0, 'Must be positive'),
	trackingMethods: z.array(z.string()),
	currentAssets: z.array(z.string()),
	debtTypes: z.array(z.string()),
	approximateTotalDebt: z.number().min(0, 'Must be positive').optional(),
	keepingYouUp: z.string().min(1, 'Please provide an answer'),
	wealthHorizon: z.string().min(1, 'Select a wealth horizon'),
	desiredOutcomes: z
		.array(z.string())
		.min(2, 'Select exactly 2 outcomes')
		.max(2, 'Select exactly 2 outcomes'),
	coreBelief: z.string().optional(),
	primaryConstraints: z.string().min(1, 'Select a primary constraint'),
	upcomingLifeEvents: z.string().optional(),
	decisionConfidence: z.array(z.number()).min(1),
	definitionOfSuccess: z.string().min(1, 'Please define success'),
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	phoneNumber: z.string().optional(),
});

export const editorialReviewSchema = z.object({
	engagementQuality: z
		.string()
		.min(1, 'Please select an engagement quality tier'),
	fullLegalName: z.string().min(1, 'Full legal name is required'),
	executiveTitle: z.string().min(1, 'Executive title is required'),
	organization: z.string().min(1, 'Organization is required'),
	socials: z.url('Social media handle is required'),
	strategicFeedback: z
		.string()
		.min(20, 'Strategic feedback must be at least 20 characters'),
});
