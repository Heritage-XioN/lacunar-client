import { InternalNavbar } from '@/components/block/internal-navbar';
import { ClientsHeader } from '@/components/block/clients/clients-header';
import { ClientsInsights } from '@/components/block/clients/clients-insights';

export function ClientsPage() {
	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Navbar */}
			<InternalNavbar activeLink='Consultations' />

			{/* Main Content */}
			<main className='mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16'>
				{/* Header */}
				<ClientsHeader />

				{/* ─── Client Table Placeholder ─── */}
				{/* TODO: Add client data table here */}
				<div className='mt-10 min-h-[420px] rounded-lg border border-slate-200 bg-white'>
					{/* Table column headers (visual placeholder) */}
					<div className='grid grid-cols-12 border-b border-slate-100 px-6 py-4'>
						<div className='col-span-5'>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Client Name
							</p>
						</div>
						<div className='col-span-3'>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Sector
							</p>
						</div>
						<div className='col-span-3'>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Status
							</p>
						</div>
						<div className='col-span-1 text-right'>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
								Action
							</p>
						</div>
					</div>

					{/* Empty body — user will add data table here */}
				</div>

				{/* Bottom Insights */}
				<div className='mt-10'>
					<ClientsInsights />
				</div>
			</main>
		</div>
	);
}
