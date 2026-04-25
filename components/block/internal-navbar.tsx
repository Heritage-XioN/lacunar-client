import { Bell, Search, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Archive', href: '/archive' },
	{ label: 'Consultations', href: '/clients' },
	{ label: 'Reports', href: '/reports' },
];

interface InternalNavbarProps {
	activeLink?: string;
}

export function InternalNavbar({ activeLink = 'Dashboard' }: InternalNavbarProps) {
	return (
		<header className='border-b border-slate-200 bg-white'>
			<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 lg:px-16'>
				{/* Left — Logo + Nav */}
				<div className='flex items-center gap-10'>
					{/* Logo */}
					<a
						href='/'
						className='font-serif text-lg font-semibold italic text-navy-900'
					>
						The Stratagem
					</a>

					{/* Nav Links */}
					<div className='hidden items-center gap-6 md:flex'>
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className={cn(
									'text-sm transition-colors duration-200',
									link.label === activeLink
										? 'font-semibold text-navy-900 underline underline-offset-[6px] decoration-navy-900 decoration-2'
										: 'text-slate-400 hover:text-navy-900',
								)}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>

				{/* Right — Search + Icons */}
				<div className='hidden items-center gap-3 md:flex'>
					{/* Search */}
					<div className='flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5'>
						<Search className='h-4 w-4 text-slate-400' />
						<input
							type='text'
							placeholder='Search portfolio...'
							className='w-36 bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none'
						/>
					</div>

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
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-navy-900'>
						<User className='h-4 w-4 text-white' />
					</div>
				</div>
			</nav>
		</header>
	);
}
