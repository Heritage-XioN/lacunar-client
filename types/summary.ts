import { consultants } from './consultants';

export interface TimelineEntry {
	id: string;
	createdAt: string;
	title: string;
	summary: string;
	consultant: consultants | null;
}
