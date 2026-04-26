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
	businessEmail: z.string().email('Invalid email address'),
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
	emailAddress: z.string().email('Invalid email address'),
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
	email: z.string().email('Invalid email address'),
	phoneNumber: z.string().min(1, 'Select a time horizon'),
});
