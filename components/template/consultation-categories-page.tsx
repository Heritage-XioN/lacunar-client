import { ConsultationNavbar } from '../block/consultation-navbar';
import { ConsultationFooter } from '../block/consultation-footer';
import { CategoriesHeader } from '../block/consultation-categories/categories-header';
import { CategoriesGrid } from '../block/consultation-categories/categories-grid';
import { CategoriesCta } from '../block/consultation-categories/categories-cta';

export function ConsultationCategoriesPage() {
	return (
		<div className='min-h-screen bg-slate-50'>
			<main>
				<CategoriesHeader />
				<CategoriesGrid />
				<CategoriesCta />
			</main>
			<ConsultationFooter />
		</div>
	);
}
