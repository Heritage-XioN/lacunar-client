import type { Metadata } from 'next';
import { StrategicPlanningPage } from '@/components/template/strategic-planning-page';

export const metadata: Metadata = {
	title: 'Strategic Planning | Lacunar consulting',
	description:
		'Navigating Institutional Legacy and Disruptive Foresight to architect sustainable competitive advantage.',
};

export default function StrategicPlanning() {
	return <StrategicPlanningPage />;
}
