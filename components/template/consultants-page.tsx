import { DashboardNavbar } from '../block/dashboard-navbar';
import ConsultantsTable from '../block/consultants-table';

export function ConsultantsPage() {
	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Navbar */}
			<DashboardNavbar />

			{/* Main Content */}
			<main className='mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16'>
				{/* Header */}
				<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
					{/* Left — Title  */}
					<div>
						<h1 className='font-serif text-4xl font-bold text-navy-900 md:text-5xl'>
							Consultants
						</h1>
						<p className='mt-2 max-w-md text-sm leading-relaxed text-slate-500'>
							List of all registered consultants
						</p>
					</div>
				</div>

				{/* ─── Client Table ─── */}
				<div className='mt-10 min-h-[420px] rounded-lg border border-slate-200 bg-white px-2'>
					<ConsultantsTable />
				</div>
			</main>
		</div>
	);
}
