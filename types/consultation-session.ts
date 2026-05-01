export type consultationSession = {
	id: string;
	clientId: string;
	category: string;
	status: string;
	onBoardingDetails: Record<string, unknown>;
	createdAt: string;
	updatedAt: string;
};
