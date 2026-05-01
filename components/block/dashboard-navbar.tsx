'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoutDialogBtn } from '../ui/logout-dialog-btn';

const links = [
	{ label: 'Clients', href: '/dashboard/clients' },
	{ label: 'Consultants', href: '/dashboard/consultants' },
];

export function DashboardNavbar() {
	const pathname = usePathname();

	return (
		<header className='border-b border-slate-200 bg-white'>
			<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16'>
				{/* Left: Logo & Nav Links */}
				<div className='flex items-center gap-12'>
					{/* Logo */}
					<Link
						href='/dashboard'
						className='font-serif text-2xl font-bold italic text-navy-900'
					>
						Lacunar consulting
					</Link>

					{/* Navigation */}
					<nav className='hidden items-center gap-8 md:flex'>
						{links.map((items) => {
							const isActive = pathname.startsWith(items.href);
							return (
								<Link
									key={items.href}
									href={items.href}
									className={cn(
										'text-[10px] font-semibold tracking-widest transition-colors hover:text-navy-900',
										isActive
											? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-900'
											: 'text-slate-400',
									)}
								>
									{items.label}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* Right: Icons & Avatar */}
				<div className='flex items-center gap-6'>
					<LogoutDialogBtn />
				</div>
			</div>
		</header>
	);
}
