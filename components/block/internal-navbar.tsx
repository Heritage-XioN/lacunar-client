import { Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navLinks = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Archive', href: '/archive' },
	{ label: 'Consultations', href: '/clients' },
	{ label: 'Reports', href: '/reports' },
];

interface InternalNavbarProps {
	activeLink?: string;
}

export function InternalNavbar({
	activeLink = 'Dashboard',
}: InternalNavbarProps) {
	return (
		<header className='bg-slate-50'>
			<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16'>
				{/* Left — Logo + Nav */}
				<div className='flex items-center gap-12'>
					{/* Logo */}
					<a
						href='/'
						className='font-serif text-xl font-bold italic text-navy-900'
					>
						The Stratagem
					</a>

					{/* Nav Links */}
					<div className='hidden items-center gap-8 md:flex'>
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className={cn(
									'text-sm transition-colors duration-200',
									link.label === activeLink
										? 'font-semibold text-navy-900 underline underline-offset-8 decoration-navy-900 decoration-2'
										: 'text-slate-500 hover:text-navy-900',
								)}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>

				{/* Right — Icons + Avatar */}
				<div className='hidden items-center gap-4 md:flex'>
					{/* Icons */}
					<Button
						variant='ghost'
						size='icon'
						className='text-slate-500 hover:text-navy-900'
						aria-label='Notifications'
					>
						<Bell className='h-4 w-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='text-slate-500 hover:text-navy-900'
						aria-label='Settings'
					>
						<Settings className='h-4 w-4' />
					</Button>

					{/* Avatar */}
					<div className='h-8 w-8 overflow-hidden rounded-md ml-2'>
						<Image
							src='/avatar-alistair.png'
							alt='User Avatar'
							width={32}
							height={32}
							className='h-full w-full object-cover'
						/>
					</div>
				</div>
			</nav>
		</header>
	);
}
