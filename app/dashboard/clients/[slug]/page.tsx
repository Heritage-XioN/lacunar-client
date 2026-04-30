import { ClientDetailPage } from '@/components/template/client-data-page';
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
	const { slug } = await params;
	return <ClientDetailPage slug={slug} />;
}
