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
import { toast } from 'sonner';
import { AlertDialogDestructive } from './delete-dialog-btn';

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
						status === 'pending'
							? 'bg-slate-200 text-slate-600 hover:bg-slate-200'
							: status === 'Finalized'
								? 'bg-[#f8e5b9] text-amber-800 hover:bg-[#f8e5b9]'
								: 'bg-green-200/60 text-green-700 hover:bg-green-200/60'
					}`}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		id: 'actions',
		cell: function ActionCell({ row }) {
			const id = row.getValue('id') as string;
			const consulationCategory = row.getValue('category') as string;

			const handleStatusChange = async (status: string) => {
				try {
					const result = await fetch(`/api/consultations/${id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ status }),
					});
					const data = await result.json();
					if (data.success) {
						toast.success(`Status changed to ${status}!`);
						window.location.reload();
					} else {
						toast.error(`Status change failed: ${data.error}`);
					}
				} catch (error) {
					toast.error('An unexpected error occurred');
				}
			};

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
						<DropdownMenuItem onClick={() => handleStatusChange('in progress')}>
							In Progress
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleStatusChange('Finalized')}>
							Finalized
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/summary/${id}`}>view summary</Link>
						</DropdownMenuItem>
						<AlertDialogDestructive
							url={`/api/consultations/${id}`}
							msg={`delete ${consulationCategory}`}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
