interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
	return (
		<div className={`flex flex-col ${className}`}>
			<label className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
				{label}
			</label>
			<textarea
				className='mt-2 resize-none border-b border-slate-200 bg-transparent pb-3 text-sm text-navy-900 placeholder:text-slate-300 focus:border-navy-900 focus:outline-none transition-colors font-[family-name:var(--font-body)]'
				rows={3}
				{...props}
			/>
		</div>
	);
}
