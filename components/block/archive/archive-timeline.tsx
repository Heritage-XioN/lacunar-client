import { cn } from '@/lib/utils';
import { User, Paperclip, ChevronDown } from 'lucide-react';

interface TimelineEntry {
	date: string;
	badge: string;
	badgeColor: 'navy' | 'slate' | 'gold';
	title: string;
	description: string;
	consultant: string;
	attachment?: string;
}

const entries: TimelineEntry[] = [
	{
		date: 'OCT 24, 2025 · 14:00 EST',
		badge: 'POST-MERGER INTEGRATION',
		badgeColor: 'navy',
		title: 'Market Dominance & Cultural Alignment Briefing',
		description:
			'The session focused on the friction between the acquired technology stack and legacy operational protocols. We identified three non-negotiable cultural anchors that must be preserved to prevent brain drain during the transition phase.',
		consultant: 'Principal Consultant',
		attachment: 'Strategy_Deck_V4.pdf',
	},
	{
		date: 'SEP 16, 2025 · 09:30 EST',
		badge: 'CAPITAL EXPENDITURE',
		badgeColor: 'slate',
		title: 'Q4 Fiscal Resilience Strategy',
		description:
			'Reviewed the projected volatility in international supply chains. Decision reached to front-load essential raw material acquisitions, despite short-term cash flow pressures. The long-term stability outweighs the immediate liquidity trade-off.',
		consultant: 'Global Strategy Lead',
		attachment: 'Audio_Transcript.mp3',
	},
	{
		date: 'AUG 05, 2025 · 16:15 EST',
		badge: 'CRISIS MANAGEMENT',
		badgeColor: 'gold',
		title: 'Internal Communication Audit',
		description:
			'The audit revealed a significant gap between executive intent and frontline execution. Recommended the immediate implementation of "The Stratagem Sync" – a bi-weekly authoritative broadcast to align all tiers of management.',
		consultant: 'Managing Director',
	},
];

const badgeStyles: Record<string, string> = {
	navy: 'bg-navy-900/10 text-navy-900',
	slate: 'bg-slate-100 text-slate-600',
	gold: 'bg-gold-200/40 text-gold-500',
};

export function ArchiveTimeline() {
	return (
		<div className='relative'>
			{/* Timeline entries */}
			<div className='space-y-0'>
				{entries.map((entry, idx) => (
					<div key={idx} className='relative pb-10'>
						{/* Timeline dot + line */}
						<div className='absolute left-0 top-1.5 flex flex-col items-center'>
							<div className='h-2.5 w-2.5 rounded-full border-2 border-navy-900 bg-white' />
							{idx < entries.length - 1 && (
								<div className='mt-0.5 w-px flex-1 bg-slate-200' style={{ minHeight: '100%' }} />
							)}
						</div>

						{/* Content */}
						<div className='pl-7'>
							{/* Top row: date + badge */}
							<div className='flex flex-wrap items-center justify-between gap-2'>
								<p className='text-xs font-medium text-slate-400'>
									{entry.date}
								</p>
								<span
									className={cn(
										'rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest',
										badgeStyles[entry.badgeColor],
									)}
								>
									{entry.badge}
								</span>
							</div>

							{/* Title */}
							<h3 className='mt-3 font-serif text-xl font-semibold text-navy-900'>
								{entry.title}
							</h3>

							{/* Description */}
							<p className='mt-2 text-sm leading-relaxed text-slate-500'>
								{entry.description}
							</p>

							{/* Footer: consultant + attachment */}
							<div className='mt-4 flex flex-wrap items-center gap-5'>
								<div className='flex items-center gap-1.5'>
									<User className='h-3.5 w-3.5 text-slate-400' />
									<span className='text-xs font-medium text-slate-500'>
										{entry.consultant}
									</span>
								</div>
								{entry.attachment && (
									<div className='flex items-center gap-1.5'>
										<Paperclip className='h-3.5 w-3.5 text-slate-400' />
										<span className='text-xs font-medium text-slate-500'>
											{entry.attachment}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Load Legacy Archives */}
			<div className='mt-4 flex justify-center'>
				<button
					type='button'
					className='flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-navy-900'
				>
					Load Legacy Archives
					<ChevronDown className='h-3.5 w-3.5' />
				</button>
			</div>
		</div>
	);
}
