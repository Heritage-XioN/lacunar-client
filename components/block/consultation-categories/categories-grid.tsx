import {
	ArrowRight,
	Layers,
	LineChart,
	Cpu,
	Crosshair,
	ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CategoryCardProps {
	title: string;
	description: string;
	icon?: React.ReactNode;
	href: string;
	variant?: 'default' | 'dark';
	label?: string;
}

function CategoryCard({
	title,
	description,
	icon,
	href,
	variant = 'default',
	label,
}: CategoryCardProps) {
	if (variant === 'dark') {
		return (
			<div className='flex h-full flex-col justify-center bg-navy-900 p-10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl'>
				{label && (
					<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
						{label}
					</p>
				)}
				<h3 className='mt-4 font-serif text-3xl font-normal italic text-white'>
					{title}
				</h3>
				<p className='mt-4 text-sm leading-relaxed text-slate-300'>
					{description}
				</p>
			</div>
		);
	}

	return (
		<div className='flex h-full flex-col justify-between bg-white p-10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl'>
			<div>
				{/* Icon Box */}
				<div className='flex h-10 w-10 items-center justify-center bg-navy-900 text-white'>
					{icon}
				</div>

				<h3 className='mt-8 font-serif text-2xl font-normal text-navy-900'>
					{title}
				</h3>
				<p className='mt-4 text-sm leading-relaxed text-slate-500'>
					{description}
				</p>
			</div>

			<div className='mt-10'>
				<Link
					href={href}
					className='inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold-400 transition-colors hover:text-gold-500'
				>
					Onboard
					<ArrowRight className='h-3.5 w-3.5' />
				</Link>
			</div>
		</div>
	);
}

export function CategoriesGrid() {
	return (
		<div className='bg-slate-50 px-6 py-20 sm:px-10 lg:px-16'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					<CategoryCard
						title='Personal Finance'
						description='Advisory focused on helping individuals build financial discipline, manage cash flow, and grow wealth through structured planning, investment guidance, and long-term financial strategies.'
						icon={<Layers className='h-5 w-5' />}
						href='/consultation-form/personal-finance'
					/>
					<CategoryCard
						title='Sustaining Family Wealth'
						description='Focused on preserving and transferring wealth across generations, including governance structures, asset protection, succession planning, and financial education for continuity.'
						icon={<LineChart className='h-5 w-5' />}
						href='/consultation-form/sustaining-family-wealth'
					/>
					<CategoryCard
						title='Business Consulting'
						description='Providing businesses with strategic guidance, operational support, growth planning, and performance optimization to build scalable and efficient organizations.'
						icon={<Cpu className='h-5 w-5' />}
						href='/consultation-form/business-consulting'
					/>
					<CategoryCard
						title='Government / NGO Consulting'
						description='Advisory for public and non-profit institutions on policy design, program execution, operational efficiency, and impact measurement to ensure sustainable and measurable outcomes.'
						icon={<Crosshair className='h-5 w-5' />}
						href='/consultation-form/government-ngo-consulting'
					/>
					<CategoryCard
						title='Our Training Program for Consultants'
						description='We train young people in Nigeria to become consultants and smart investors Through finance clubs and student groups, 
						members meet every week with experienced mentors. They learn how to think, solve real problems, 
						and understand the capital market. Our goal is simple: build a strong community of future consultants who can create real value.'
						icon={<ShieldCheck className='h-5 w-5' />}
						href='/consultation-form/lacunar-business-model'
					/>
					<Link
						href='/consultation-form/investment-and-capital-advisory'
						className='block h-full'
					>
						<CategoryCard
							title='Investment and capital advisory'
							description='Advisory focused on capital raising, investment strategy, and financial structuring, helping clients access funding, deploy capital effectively, and maximize returns.'
							variant='dark'
							label='Future Outlook'
							href='/consultation-form'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
