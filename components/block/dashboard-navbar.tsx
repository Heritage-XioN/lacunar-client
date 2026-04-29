import { Bell, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
	{ label: 'Clients', href: '/dashboard/clients' },
	{ label: 'consultants', href: '/dashboard/consultants' },
];

export function DashboardNavbar() {
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
						{links.map((items) => (
							<Link
								key={items.href}
								href={items.href}
								className='text-[10px] font-semibold tracking-widest text-slate-400 hover:text-navy-900'
							>
								{items.label}
							</Link>
						))}
					</nav>
				</div>

				{/* Right: Icons & Avatar */}
				{/* <div className='flex items-center gap-6'>
					<button className='text-slate-500 hover:text-navy-900'>
						<Bell className='h-5 w-5' />
					</button>
					<button className='text-slate-500 hover:text-navy-900'>
						<Settings className='h-5 w-5' />
					</button>
					<div className='h-9 w-9 overflow-hidden rounded-md'>
						<Image
							src='/avatar-alistair.png'
							alt='Alistair Vance'
							width={36}
							height={36}
							className='h-full w-full object-cover'
						/>
					</div>
				</div> */}
			</div>
		</header>
	);
}
