import { ArchivePage } from '@/components/template/archive-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Consultation History | The Stratagem',
	description:
		'A definitive log of strategic interventions, executive dialogues, and tactical shifts across your engagement history.',
};

export default function ArchiveRoute() {
	return <ArchivePage />;
}
