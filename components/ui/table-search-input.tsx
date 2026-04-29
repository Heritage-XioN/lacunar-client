import { tableSearchInput } from '@/types/table-search';

// reuseable search input for the data-table
const TableSearchInput = ({
	placeholder,
	value,
	onChange,
}: tableSearchInput) => {
	return (
		<input
			type='text'
			className='text-[16px] font-normal leading-6 px-4 py-4 w-full outline-0'
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

export default TableSearchInput;
