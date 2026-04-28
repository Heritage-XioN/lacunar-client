import { ClientsPage } from '@/components/template/clients-page';
import { verifyAuth } from '@/lib/dal';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Clients | The Stratagem',
	description:
		'Executive portfolio overview. Managed and active strategic partnerships across multiple global sectors.',
};

export default async function ClientsRoute() {
	const session = await verifyAuth();
	return <ClientsPage />;
}
