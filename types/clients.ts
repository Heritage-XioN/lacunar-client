export type clients = {
	id: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	createdAt: string;
};

export type consultations = {
	id: string;
	clientId: string;
	category: string;
	status: string;
	onBoardingDetails: unknown;
	createdAt: string;
	updatedAt: string;
};
