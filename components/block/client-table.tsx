'use client';

import { clients } from '@/types/clients';
import { columns } from '../ui/client-table-columns';
import { DataTable } from '../ui/data-table';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClientsTable = () => {
	const { data } = useSWR<{ data: clients[] }>('/api/clientlist', fetcher);
	return (
		<div className='container mx-auto bg-[#ffffff]'>
			<DataTable columns={columns} data={data?.data || []} filterBy={'email'} />
		</div>
	);
};

export default ClientsTable;
