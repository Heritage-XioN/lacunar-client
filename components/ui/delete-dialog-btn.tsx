'use client';

import { Trash2Icon } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

export function AlertDialogDestructive({
	url,
	msg,
}: {
	url: string;
	msg: string;
}) {
	const { mutate } = useSWRConfig();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className='ml-2 text-red-500'>Delete</button>
			</AlertDialogTrigger>
			<AlertDialogContent size='sm'>
				<AlertDialogHeader>
					<AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>Delete</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete this chat conversation.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							try {
								const result = await fetch(url, { method: 'DELETE' });
								const data = await result.json();
								if (data.success) {
									toast.success('Deleted successfully!');
									mutate(url);
								} else {
									toast.error(`Deletion failed: ${data.error}`);
								}
							} catch (error) {
								toast.error('An unexpected error occurred');
							}
						}}
						variant='destructive'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
