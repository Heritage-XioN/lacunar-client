import { SummaryPage } from '@/components/template/summary-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Consultation History | The Stratagem',
	description:
		'A definitive log of strategic interventions, executive dialogues, and tactical shifts across your engagement history.',
};

export default async function ArchiveRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <SummaryPage id={id} />;
}
