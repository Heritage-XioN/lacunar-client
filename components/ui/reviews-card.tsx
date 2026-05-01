import { ReviewsCardProps } from '@/types/reviews';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export function ReviewsCard({
	feedback,
	fullName,
	role,
	social,
	organisation,
}: ReviewsCardProps) {
	return (
		<div className='flex flex-col justify-between border border-slate-200 bg-white p-8'>
			<p className='text-sm leading-relaxed text-slate-600'>{feedback}</p>
			<div className='mt-8 flex items-center gap-4 border-t border-slate-100 pt-6'>
				<div>
					<p className='text-xs font-semibold text-navy-900 font-body'>
						<Link href={social}>{fullName}</Link>
					</p>
					<p className='text-xs text-slate-500'>{role}</p>
					<p className='text-sm text-navy-900 font-bold'>{organisation}</p>
				</div>
			</div>
		</div>
	);
}

export function ReviewsCardSkeleton() {
	return (
		<div className='flex flex-col justify-between border border-slate-200 bg-white p-8'>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-11/12' />
				<Skeleton className='h-4 w-4/5' />
				<Skeleton className='h-4 w-3/4' />
			</div>
			<div className='mt-8 flex items-center gap-4 border-t border-slate-100 pt-6'>
				<div className='space-y-2 w-full'>
					<Skeleton className='h-3 w-32' />
					<Skeleton className='h-3 w-24' />
					<Skeleton className='h-4 w-40' />
				</div>
			</div>
		</div>
	);
}
