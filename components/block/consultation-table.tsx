import { consultations } from '@/types/clients';
import { columns } from '../ui/consultation-table-columns';
import { DataTable } from '../ui/data-table';

const ConsultantionsTable = ({ data }: { data: consultations[] }) => {
	// the DataTable component is a reusable shadcn data-table component
	// if you want to adjust(add, remove, modify) the column(s)
	// do not change anything in the DataTable component unless you know what you are doing
	// instead check the users-table-column.tsx file
	// to see how the columns are implemented and imported here and passed to the DataTable
	// if you added or removed a column you may need to modify the types/users.ts file to reflect the current shape of the table
	return (
		<div className='container mx-auto bg-[#ffffff]'>
			<DataTable columns={columns} data={data} filterBy={'category'} />
		</div>
	);
};

export default ConsultantionsTable;
