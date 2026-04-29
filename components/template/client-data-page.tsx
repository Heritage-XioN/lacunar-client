import { DashboardNavbar } from '@/components/block/dashboard-navbar';
import { ConsultationSessions } from '@/components/block/clients-consultation-sessions';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ClientDetailPage() {
	return (
		<div className='min-h-screen bg-white'>
			<main className='mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16'>
				<div className='py-12'>
					<p className='text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-600'>
						Primary Account Holder
					</p>
					<h1 className='mt-2 font-serif text-5xl font-bold tracking-tight text-navy-900'>
						Alistair Vance
					</h1>
					<div className='mt-6 flex flex-wrap items-center gap-8 text-sm text-slate-500'>
						<div className='flex items-center gap-2'>
							<Mail className='h-4 w-4 text-slate-400' />
							<span>a.vance@globalwealth.com</span>
						</div>
						<div className='flex items-center gap-2'>
							<Phone className='h-4 w-4 text-slate-400' />
							<span>+1 (555) 012-9938</span>
						</div>
					</div>
				</div>

				<div className='mt-8'>
					{/* Consultation Sessions */}
					<div className='lg:col-span-8'>
						<ConsultationSessions />
					</div>
				</div>
			</main>
		</div>
	);
}
