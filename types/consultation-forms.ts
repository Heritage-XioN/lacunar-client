interface business {
	businessPhase: string;
	interventionAreas: string[];
	existingSystems: string[];
	recognizedBenefits: string[];
	vision12Month: string;
	tomorrowQuestion: string;
	primaryBottleneck: string;
	organizationalReadiness: number[];
	valueIndicator: string;
	relationshipSuccess: string;
	fullName: string;
	email: string;
	phoneNumber: string;
}

interface government {
	orgType: string;
	primaryChallenge: string;
	existingInfrastructure: string[];
	beneficiaryOutcomes: string;
	orgSuccessMetrics: string[];
	vision24Month: string;
	primaryConstraint: string;
	innovationAppetite: number[];
	evidence: string;
	partnershipAnchor: string;
	fullName: string;
	email: string;
	phoneNumber: string;
}

interface personal {
	primaryCatalyst: string;
	financialStress: string;
	monthlyNetIncome: number | undefined;
	incomeCurrency: string;
	monthlyCoreExpenses: number | undefined;
	trackingMethodologies: string[];
	activeAssets: string[];
	debtProfile: string[];
	financialReality: string;
	timeHorizon: string;
	vision730Day: string;
	desiredOutcomes: string[];
	operationalObstacle: string;
	decisionConfidence: string;
	successDefinition: string;
	fullName: string;
	email: string;
	phoneNumber: string;
}

interface familyWealth {
	governanceStructure: string;
	familyOpenness: string;
	familyAssets: string[];
	primaryObjectives: string[];
	qualitativeVision: string;
	currentObstacles: string;
	successMetric: string;
	fullName: string;
	email: string;
	phoneNumber: string;
}

export type consultationTypes = business | government | personal | familyWealth;
