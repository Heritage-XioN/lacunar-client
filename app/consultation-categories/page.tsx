import type { Metadata } from 'next';
import { ConsultationCategoriesPage } from '@/components/template/consultation-categories-page';

export const metadata: Metadata = {
	title: 'Areas of Command | Consultation',
	description:
		'Select your institutional intelligence area of command to begin the consultation process.',
};

export default function ConsultationCategoriesRoute() {
	return <ConsultationCategoriesPage />;
}
