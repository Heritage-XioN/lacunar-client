import { DigitalDiscoveryForm } from '@/components/block/consultation-form/digital-discovery-form';
import { SustainingFamilyWealthForm } from '@/components/block/consultation-form/sustaining-family-wealth-form';
import { GovernmentNgoForm } from '@/components/block/consultation-form/government-ngo-form';
import { PersonalFinanceForm } from '@/components/block/consultation-form/personal-finance-form';
import { BusinessConsultingForm } from '@/components/block/consultation-form/business-consulting-form';

export function ConsultationFormTemplate({ slug }: { slug: string }) {
	switch (slug) {
		case 'sustaining-family-wealth':
			return <SustainingFamilyWealthForm />;
		case 'government-ngo-consulting':
			return <GovernmentNgoForm />;
		case 'personal-finance':
			return <PersonalFinanceForm />;
		case 'business-consulting':
			return <BusinessConsultingForm />;
		case 'lacunar-business-model':
		case 'investment-and-capital-advisory':
		default:
			return <DigitalDiscoveryForm />;
	}
}
