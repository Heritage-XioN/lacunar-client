import { ArchitectFuture } from '../block/architect-future';
import { Methodology } from '../block/methodology';
import { ModernizationCta } from '../block/modernization-cta';
import { Outcomes } from '../block/outcomes';
import { ServiceHero } from '../block/service-hero';
import { ServicesFooter } from '../block/services-footer';
import { ServicesNavbar } from '../block/services-navbar';

export function StrategicPlanningPage() {
	return (
		<div className='min-h-screen bg-white'>
			<ServicesNavbar />
			<main>
				<ServiceHero />
				<Methodology />
				<Outcomes />
				<ModernizationCta />
				<ArchitectFuture />
			</main>
			<ServicesFooter />
		</div>
	);
}
