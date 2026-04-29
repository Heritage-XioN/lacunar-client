import { clients } from '@/types/clients';
import { columns } from '../ui/client-table-columns';
import { DataTable } from '../ui/data-table';

const ClientsTable = async () => {
	// simulates fetch data
	const data: clients[] = [
		{
			id: 1,
			fullName: 'heritage iyoke',
			email: 'iheriage2001@gmail.com',
			phoneNumber: '09055883022',
			createdAt: '12',
		},
		{
			id: 2,
			fullName: 'heritage iyoke',
			email: 'i2001@gmail.com',
			phoneNumber: '09055883022',
			createdAt: '12',
		},
		{
			id: 3,
			fullName: 'heritage iyoke',
			email: 'iher2@gmail.com',
			phoneNumber: '09055883022',
			createdAt: '12',
		},
		{
			id: 4,
			fullName: 'heritage iyoke',
			email: 'xh@gmail.com',
			phoneNumber: '09055883022',
			createdAt: '12',
		},
	];

	// the DataTable component is a reusable shadcn data-table component
	// if you want to adjust(add, remove, modify) the column(s)
	// do not change anything in the DataTable component unless you know what you are doing
	// instead check the users-table-column.tsx file
	// to see how the columns are implemented and imported here and passed to the DataTable
	// if you added or removed a column you may need to modify the types/users.ts file to reflect the current shape of the table
	return (
		<div className='container mx-auto bg-[#ffffff]'>
			<DataTable columns={columns} data={data} filterBy={'email'} />
		</div>
	);
};

export default ClientsTable;
