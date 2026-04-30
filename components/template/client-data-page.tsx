'use client';

import { ConsultationSessions } from '@/components/block/clients-consultation-sessions';
import { clients, consultations } from '@/types/clients';
import { Mail, MapPin, Phone } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ClientDetailPage({ slug }: { slug: string }) {
	const { data: client } = useSWR<clients>(`/api/client/${slug}`, fetcher);
	const { data: consultation } = useSWR<consultations[]>(
		`/api/consultations/${slug}`,
		fetcher,
	);
	return (
		<div className='min-h-screen bg-white'>
			<main className='mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16'>
				<div className='py-12'>
					<p className='text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-600'>
						Client Profile
					</p>
					<h1 className='mt-2 font-serif text-5xl font-bold tracking-tight text-navy-900'>
						{client?.fullName}
					</h1>
					<div className='mt-6 flex flex-wrap items-center gap-8 text-sm text-slate-500'>
						<div className='flex items-center gap-2'>
							<Mail className='h-4 w-4 text-slate-400' />
							<span>{client?.email}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Phone className='h-4 w-4 text-slate-400' />
							<span>{client?.phoneNumber}</span>
						</div>
					</div>
				</div>

				<div className='mt-8'>
					{/* Consultation Sessions */}
					<div className='lg:col-span-8'>
						<ConsultationSessions data={consultation || []} />
					</div>
				</div>
			</main>
		</div>
	);
}
