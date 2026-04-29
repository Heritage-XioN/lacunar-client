export type clients = {
	id: number;
	fullName: string;
	email: string;
	phoneNumber: string;
	createdAt: string;
};

export type consultations = {
	id: number;
	userId: number;
	category: string;
	status: string;
	onBoardingDetails: string;
	createdAt: string;
	updatedAt: string;
};
