import { InternalNavbar } from '@/components/block/internal-navbar';
import { SummarySidebar } from '@/components/block/summary/summary-sidebar';
import { SummaryTimeline } from '@/components/block/summary/summary-timeline';
import { DashboardNavbar } from '../block/dashboard-navbar';

export function SummaryPage({ id }: { id: string }) {
	return (
		<div className='flex min-h-screen flex-col bg-slate-50'>
			{/* Navbar */}
			<DashboardNavbar />

			{/* Main Content — Two-column layout */}
			<main className='mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-10 lg:px-16'>
				<div className='grid gap-12 lg:grid-cols-12'>
					{/* Left Column — Sidebar */}
					<div className='lg:col-span-4'>
						<SummarySidebar id={id} />
					</div>

					{/* Right Column — Timeline */}
					<div className='lg:col-span-8'>
						<SummaryTimeline id={id} />
					</div>
				</div>
			</main>
		</div>
	);
}
