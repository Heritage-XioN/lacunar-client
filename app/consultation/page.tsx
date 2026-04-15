import type { Metadata } from 'next';
import { ConsultationPage } from '@/components/template/consultation-page';

export const metadata: Metadata = {
	title: 'Strategic Consultation | Vantage Strategy',
	description:
		'Initialize your engagement. Select a window for architectural analysis of your current organizational challenges.',
};

export default function Consultation() {
	return <ConsultationPage />;
}
