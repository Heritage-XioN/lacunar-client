import Image from 'next/image';

const team = [
	{
		name: 'Frederick Trace',
		role: 'Principal',
		image: '/team/frederick-trace.png',
	},
	{
		name: 'Adam Randall',
		role: 'Principal',
		image: '/team/adam-randall.png',
	},
	{
		name: 'Peter Colin Okonkwi',
		role: 'Principal',
		image: '/team/peter-okonkwi.png',
	},
	{
		name: 'Mayura Gupta',
		role: 'Principal',
		image: '/team/mayura-gupta.png',
	},
];

export function OurPeople() {
	return (
		<section className='bg-slate-50 py-20 sm:py-28'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				{/* Section Header */}
				<div className='mb-16 text-center'>
					<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
						Leadership
					</p>
					<h2 className='mt-3 font-serif text-3xl text-navy-900 sm:text-4xl'>
						Our People
					</h2>
					<p className='mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500'>
						Architects of institutional strategy, each bringing decades of
						expertise to the practice.
					</p>
				</div>

				{/* Team Grid */}
				<div className='grid grid-cols-2 gap-x-8 gap-y-14 sm:gap-x-12 md:grid-cols-4'>
					{team.map((member) => (
						<div key={member.name} className='group text-center'>
							{/* Photo */}
							<div className='relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full bg-navy-900/5 ring-2 ring-slate-200 transition-all duration-300 group-hover:ring-navy-900/30 sm:h-32 sm:w-32'>
								<Image
									src={member.image}
									alt={member.name}
									fill
									className='object-cover object-top'
									sizes='128px'
								/>
							</div>

							{/* Info */}
							<p className='text-[9px] font-bold uppercase tracking-widest text-gold-600'>
								{member.role}
							</p>
							<h3 className='mt-1.5 font-serif text-lg text-navy-900'>
								{member.name}
							</h3>
							<div className='mx-auto mt-2 h-px w-8 bg-slate-300 transition-colors duration-300 group-hover:bg-navy-900' />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
