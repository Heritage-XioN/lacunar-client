import { ChevronLeft, ChevronRight, Check, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const calendarRows = [
	[28, 29, 30, 1, 2, 3, 4],
	[5, 6, 7, 8, 9, 10, 11],
	[12, 13, 14, 15, 16, 17, 18],
	[19, 20, 21, 22, 23, null, null],
];

const timeSlots = [
	{ time: '09:00 — 10:30', selected: false },
	{ time: '13:00 — 14:30', selected: true },
	{ time: '15:30 — 17:00', selected: false },
];

export function BookingForm() {
	return (
		<div className='space-y-10'>
			{/* Page heading */}
			<div>
				<h1 className='text-4xl font-semibold italic text-navy-900 sm:text-5xl'>
					Strategic<br />Consultation
				</h1>
				<p className='mt-4 max-w-md text-sm leading-relaxed text-slate-500'>
					Initialize your engagement. Select a window for architectural
					analysis of your current organizational challenges.
				</p>
			</div>

			{/* Section 01 — Temporal Selection */}
			<div>
				<div className='flex items-center gap-3'>
					<span className='inline-flex h-6 w-7 items-center justify-center bg-navy-900 text-[10px] font-bold text-white'>
						01
					</span>
					<span className='text-[10px] font-bold uppercase tracking-[0.25em] text-navy-900'>
						Temporal Selection
					</span>
				</div>

				<div className='mt-6 grid gap-8 lg:grid-cols-[1fr_auto]'>
					{/* Calendar */}
					<div className='rounded border border-slate-200 p-5'>
						{/* Month header */}
						<div className='flex items-center justify-between'>
							<span className='text-sm font-semibold text-navy-900 font-[family-name:var(--font-body)]'>
								October 2024
							</span>
							<div className='flex gap-1'>
								<button
									type='button'
									className='inline-flex h-7 w-7 items-center justify-center text-slate-400 hover:text-navy-900 transition-colors'
									aria-label='Previous month'
								>
									<ChevronLeft className='h-4 w-4' />
								</button>
								<button
									type='button'
									className='inline-flex h-7 w-7 items-center justify-center text-slate-400 hover:text-navy-900 transition-colors'
									aria-label='Next month'
								>
									<ChevronRight className='h-4 w-4' />
								</button>
							</div>
						</div>

						{/* Day headers */}
						<div className='mt-4 grid grid-cols-7 text-center'>
							{daysOfWeek.map((day) => (
								<span
									key={day}
									className='py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400'
								>
									{day}
								</span>
							))}
						</div>

						{/* Calendar grid */}
						<div className='grid grid-cols-7 text-center'>
							{calendarRows.map((row, rowIndex) =>
								row.map((day, colIndex) => {
									if (day === null) return <span key={`empty-${rowIndex}-${colIndex}`} />;

									const isGrayed =
										(rowIndex === 0 && day > 20);
									const isSelected = day === 12 && rowIndex === 2;

									return (
										<span
											key={`${rowIndex}-${colIndex}`}
											className={`
												inline-flex h-9 w-9 items-center justify-center mx-auto text-sm font-[family-name:var(--font-body)]
												${isGrayed ? 'text-slate-300' : 'text-navy-900'}
												${isSelected ? 'rounded-full bg-navy-900 text-white font-semibold' : ''}
												${!isGrayed && !isSelected ? 'hover:bg-slate-50 rounded-full cursor-pointer transition-colors' : ''}
											`}
										>
											{day}
										</span>
									);
								})
							)}
						</div>
					</div>

					{/* Available intervals */}
					<div className='space-y-3'>
						<p className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400'>
							Available Intervals (GMT+1)
						</p>
						<div className='space-y-2'>
							{timeSlots.map((slot) => (
								<button
									key={slot.time}
									type='button'
									className={`
										flex w-full items-center justify-between border px-5 py-3.5 text-sm transition-colors font-[family-name:var(--font-body)]
										${slot.selected
											? 'border-navy-900 bg-navy-900/[0.03] text-navy-900 font-semibold'
											: 'border-slate-200 text-slate-500 hover:border-slate-300'
										}
									`}
								>
									<span>{slot.time}</span>
									{slot.selected && (
										<Check className='h-4 w-4 text-navy-900' />
									)}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Section 02 — Institutional Context */}
			<div>
				<div className='flex items-center gap-3'>
					<span className='inline-flex h-6 w-7 items-center justify-center bg-navy-900 text-[10px] font-bold text-white'>
						02
					</span>
					<span className='text-[10px] font-bold uppercase tracking-[0.25em] text-navy-900'>
						Institutional Context
					</span>
				</div>

				<div className='mt-6 grid gap-8 sm:grid-cols-2'>
					<Input
						label='Representative Name'
						placeholder='Arthur P. Vance'
					/>
					<Input
						label='Institutional Affiliation'
						placeholder='Global Meridian Holdings'
					/>
				</div>

				<div className='mt-8'>
					<Textarea
						label='Strategic Challenge Description'
						placeholder='Briefly outline the structural inquiry or market pressure...'
					/>
				</div>
			</div>

			{/* Confirm section */}
			<div className='flex flex-col items-start gap-5 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex items-start gap-3'>
					<Info className='mt-0.5 h-4 w-4 shrink-0 text-gold-500' />
					<p className='text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-slate-400'>
						Sessions are strictly confidential. A secure<br />
						brief will be dispatched upon confirmation.
					</p>
				</div>

				<Button
					variant='primary'
					className='w-full px-10 py-4 text-xs uppercase tracking-[0.2em] sm:w-auto'
					type='button'
				>
					Confirm Appointment
				</Button>
			</div>
		</div>
	);
}
