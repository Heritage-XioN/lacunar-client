'use client';

import { clients } from '@/types/clients';
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
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { AlertDialogDestructive } from './delete-dialog-btn';

export const columns: ColumnDef<clients>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'fullName',
		header: 'Full Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Phone Number',
	},
	{
		id: 'actions',
		cell: function ActionCell({ row }) {
			const id = row.getValue('id') as string;
			const client = row.getValue('fullName') as string;

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
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/clients/${id}`}>Consultations</Link>
						</DropdownMenuItem>
						<AlertDialogDestructive
							url={`/api/client/${id}`}
							msg={`Are you sure you want to delete ${client}`}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
