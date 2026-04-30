'use client';

import { consultations } from '@/types/clients';
import { ColumnDef } from '@tanstack/react-table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './badge';

export const columns: ColumnDef<consultations>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return (
				<Badge
					variant='secondary'
					className={`rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
						status === 'COMPLETED'
							? 'bg-slate-200 text-slate-600 hover:bg-slate-200'
							: status === 'FINALIZED'
								? 'bg-[#f8e5b9] text-amber-800 hover:bg-[#f8e5b9]'
								: 'bg-slate-200/60 text-slate-500 hover:bg-slate-200/60'
					}`}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Disable</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={`/dashboard/summary/${id}`}>view summary</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='text-red-600'>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
