import { CtaSection } from '../block/cta';
import { Footer } from '../block/footer';
import { Hero } from '../block/hero';
import { Navbar } from '../block/navbar';
import { QuoteSection } from '../block/quote';
import { Services } from '../block/services';
import { Testimonials } from '../block/testimonials';

export function LandingPage() {
	return (
		<div className='min-h-screen'>
			<Navbar />
			<main>
				<Hero />
				<Services />
				<QuoteSection />
				<Testimonials />
				<CtaSection />
			</main>
			<Footer />
		</div>
	);
}
