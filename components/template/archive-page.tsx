import { InternalNavbar } from '@/components/block/internal-navbar';
import { ArchiveSidebar } from '@/components/block/archive/archive-sidebar';
import { ArchiveTimeline } from '@/components/block/archive/archive-timeline';
import { ArchiveCta } from '@/components/block/archive/archive-cta';
import { ArchiveFooter } from '@/components/block/archive/archive-footer';

export function ArchivePage() {
	return (
		<div className='flex min-h-screen flex-col bg-white'>
			{/* Navbar */}
			<InternalNavbar activeLink='Archive' />

			{/* Main Content — Two-column layout */}
			<main className='mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-10 lg:px-16'>
				<div className='grid gap-12 lg:grid-cols-12'>
					{/* Left Column — Sidebar */}
					<div className='lg:col-span-4'>
						<ArchiveSidebar />
					</div>

					{/* Right Column — Timeline */}
					<div className='lg:col-span-8'>
						<ArchiveTimeline />
					</div>
				</div>

				{/* CTA Banner */}
				<div className='mt-16'>
					<ArchiveCta />
				</div>
			</main>

			{/* Footer */}
			<ArchiveFooter />
		</div>
	);
}
