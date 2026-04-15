import { AdvisorProfile } from '../block/advisor-profile';
import { BookingForm } from '../block/booking-form';
import { ConsultationFooter } from '../block/consultation-footer';
import { ConsultationNavbar } from '../block/consultation-navbar';

export function ConsultationPage() {
	return (
		<div className='min-h-screen bg-white'>
			<ConsultationNavbar />
			<main className='mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20'>
				<div className='grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-20'>
					<AdvisorProfile />
					<BookingForm />
				</div>
			</main>
			<ConsultationFooter />
		</div>
	);
}
