export function ClientsHeader() {
	return (
		<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
			{/* Left — Title  */}
			<div>
				<h1 className='font-serif text-4xl font-bold text-navy-900 md:text-5xl'>
					Clients
				</h1>
				<p className='mt-2 max-w-md text-sm leading-relaxed text-slate-500'>
					Executive portfolio overview. Managed and active strategic
					partnerships across multiple global sectors.
				</p>
			</div>
		</div>
	);
}
