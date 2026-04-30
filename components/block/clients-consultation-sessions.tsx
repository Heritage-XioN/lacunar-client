import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ConsultantionsTable from './consultation-table';
import { consultations } from '@/types/clients';

const sessionsData = [
	{
		id: 1,
		date: 'Oct 14, 2023',
		time: '10:00 AM',
		title: 'Asset Allocation Audit',
		status: 'COMPLETED',
	},
	{
		id: 2,
		date: 'Sep 02, 2023',
		time: '03:30 PM',
		title: 'Estate Planning Draft',
		status: 'FINALIZED',
	},
	{
		id: 3,
		date: 'Aug 12, 2023',
		time: '11:00 AM',
		title: 'Discovery Session',
		status: 'ARCHIVED',
	},
	{
		id: 4,
		date: 'Jul 20, 2023',
		time: '09:15 AM',
		title: 'Initial Financial Briefing',
		status: 'COMPLETED',
	},
];

export function ConsultationSessions({ data }: { data: consultations[] }) {
	return (
		<div>
			<div className='mb-6 flex items-center justify-between'>
				<h2 className='font-serif text-2xl font-bold text-navy-900'>
					Consultation Sessions
				</h2>
				<Link
					href='#'
					className='text-[10px] font-bold uppercase tracking-widest text-yellow-600 hover:text-yellow-700'
				>
					Export History
				</Link>
			</div>

			<div className='border border-slate-100 bg-white px-2'>
				<ConsultantionsTable data={data} />
			</div>
		</div>
	);
}
