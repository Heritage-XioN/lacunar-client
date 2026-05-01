import { ClientDetailPage } from '@/components/template/client-data-page';
import { verifyAuth } from '@/lib/dal';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Client Dashboard | Sovereign Blue',
	description: 'Primary Account Holder - Alistair Vance',
};

export default async function ClientRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const session = await verifyAuth();
	const { slug } = await params;
	return <ClientDetailPage slug={slug} />;
}
