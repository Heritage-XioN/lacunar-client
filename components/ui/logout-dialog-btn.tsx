import { logoutAction } from '@/actions/auth';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
export function LogoutDialogBtn() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<LogOut className='h-5 w-5 cursor-pointer' />
			</AlertDialogTrigger>
			<AlertDialogContent size='sm'>
				<AlertDialogHeader>
					<AlertDialogTitle>Logout?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to logout?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='cursor-pointer'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className='cursor-pointer'
						onClick={() => logoutAction()}
					>
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
