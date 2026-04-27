import { ConsultationFormTemplate } from '@/components/template/consultation-form-template';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Consultation Form | Lacunar consulting',
	description: 'Book your free initial consultation with Lacunar consulting.',
};

export default async function ConsultationFormPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return <ConsultationFormTemplate slug={slug} />;
}
