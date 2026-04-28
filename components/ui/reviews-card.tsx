import { ReviewsCardProps } from '@/types/reviews';
import Image from 'next/image';
import Link from 'next/link';

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
					<p className='text-xs font-semibold text-navy-900 font-[family-name:var(--font-body)]'>
						<Link href={social}>{fullName}</Link>
					</p>
					<p className='text-xs text-slate-500'>{role}</p>
					<p className='text-sm text-navy-900 font-bold'>{organisation}</p>
				</div>
			</div>
		</div>
	);
}
