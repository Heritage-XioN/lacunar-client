import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps extends DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> {
	variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
	className = '',
	variant = 'primary',
	...props
}: ButtonProps) {
	const baseStyles =
		'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer';

	const variants: Record<string, string> = {
		primary:
			'bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-md',
		secondary:
			'bg-navy-800 text-white border border-navy-600 hover:bg-navy-700',
		outline:
			'bg-transparent text-white border border-white/30 hover:bg-white/10',
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...props}
		/>
	);
}
