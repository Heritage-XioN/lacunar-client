import { SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ClientsHeader() {
	return (
		<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
			{/* Left — Title  */}
			<div>
				<h1 className='font-serif text-4xl font-bold text-navy-900 md:text-5xl'>
					Clients
				</h1>
				<p className='mt-2 max-w-md text-sm leading-relaxed text-slate-500'>
					Executive portfolio overview. Managed and active strategic partnerships
					across multiple global sectors.
				</p>
			</div>

			{/* Right — Actions */}
			<div className='flex items-center gap-3'>
				<Button
					variant='outline'
					className='gap-2 border-slate-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-900 hover:bg-slate-50'
					type='button'
				>
					<SlidersHorizontal className='h-4 w-4' />
					Filter
				</Button>
				<Button
					className='gap-2 bg-navy-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-navy-800'
					type='button'
				>
					<Plus className='h-4 w-4' />
					Onboard Client
				</Button>
			</div>
		</div>
	);
}
