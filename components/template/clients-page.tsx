import { ClientsHeader } from '@/components/block/clients-header';
import ClientsTable from '../block/client-table';
import { DashboardNavbar } from '../block/dashboard-navbar';

export function ClientsPage() {
	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Navbar */}
			<DashboardNavbar />

			{/* Main Content */}
			<main className='mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16'>
				{/* Header */}
				<ClientsHeader />

				{/* ─── Client Table ─── */}
				<div className='mt-10 min-h-[420px] rounded-lg border border-slate-200 bg-white px-2'>
					<ClientsTable />
				</div>
			</main>
		</div>
	);
}
