'use client';

import { columns } from '../ui/consultants-table-columns';
import { DataTable } from '../ui/data-table';
import { consultants } from '@/types/consultants';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const ConsultantsTable = () => {
	const { data } = useSWR<{ data: consultants[] }>('/api/clientlist', fetcher);
	return (
		<div className='container mx-auto bg-[#ffffff]'>
			<DataTable columns={columns} data={data?.data || []} filterBy={'email'} />
		</div>
	);
};

export default ConsultantsTable;
