import { CtaSection } from '../block/cta';
import { Footer } from '../block/footer';
import { Foundation } from '../block/foundation';
import { Hero } from '../block/hero';
import { Navbar } from '../block/navbar';
import { QuoteSection } from '../block/quote';
import { Services } from '../block/services';
import { ReviewsSection } from '../block/reviews-section';

export function LandingPage() {
	return (
		<div className='min-h-screen'>
			<Navbar />
			<main>
				<Hero />
				<Foundation />
				<Services />
				<QuoteSection />
				<ReviewsSection />
				<CtaSection />
			</main>
			<Footer />
		</div>
	);
}
