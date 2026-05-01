import { consultants } from './consultants';

export interface TimelineEntry {
	id: number;
	createdAt: string;
	title: string;
	summary: string;
	consultant: consultants;
}
