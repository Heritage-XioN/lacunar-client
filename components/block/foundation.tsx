'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

const DEFAULT_VIDEO_URL =
	'https://res.cloudinary.com/demo/video/upload/v1/samples/sea-turtle';

export function Foundation({
	videoUrl = DEFAULT_VIDEO_URL,
}: {
	videoUrl?: string;
}) {
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const isVisibleRef = useRef(false);

	const pauseVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		video.pause();
		setIsPlaying(false);
	}, []);

	const playVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		video.play().catch(() => {
			// Autoplay may be blocked by browser policy
		});
		setIsPlaying(true);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		const container = videoContainerRef.current;
		if (!video || !container) return;

		// Intersection Observer — watches the video container, not the full section
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisibleRef.current = entry.isIntersecting;
				if (entry.isIntersecting) {
					// Only autoplay if the document tab is also visible
					if (document.visibilityState === 'visible') {
						playVideo();
					}
				} else {
					pauseVideo();
				}
			},
			{ threshold: 0.3 },
		);

		observer.observe(container);

		// Page visibility — pause when user switches tabs
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') {
				pauseVideo();
			} else if (document.visibilityState === 'visible' && isVisibleRef.current) {
				playVideo();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			observer.disconnect();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [playVideo, pauseVideo]);

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			playVideo();
		} else {
			pauseVideo();
		}
	};

	return (
		<section className='bg-slate-100 py-20 sm:py-28 lg:py-32'>
			<div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
				<div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
					{/* Left — Copy */}
					<div className='space-y-6'>
						<p className='text-xs font-semibold uppercase tracking-widest text-gold-500'>
							The Foundation
						</p>

						<h2 className='font-serif text-3xl font-normal leading-snug text-navy-900 sm:text-4xl lg:text-5xl'>
							The <em className='italic'>Lacunar</em>
							<br />
							Vision
						</h2>

						<p className='max-w-md text-sm leading-relaxed text-slate-500'>
							Explore the thinking behind our work and our mission to empower
							institutions. Relentless pursuit, methodological with
							micro-solutions to build system-driven infrastructure.
						</p>
					</div>

					{/* Right — Video Player */}
					<div
						ref={videoContainerRef}
						className='group relative aspect-video w-full overflow-hidden rounded-lg bg-slate-200'
					>
						<video
							ref={videoRef}
							className='h-full w-full object-cover rounded-lg'
							muted
							loop
							playsInline
							preload='metadata'
							poster='/hero-cityscape.png'
							src={videoUrl}
						></video>

						{/* Play/Pause overlay — only visible on hover */}
						<button
							onClick={togglePlay}
							aria-label={isPlaying ? 'Pause video' : 'Play video'}
							className='absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-all duration-300 group-hover:bg-navy-900/25 group-hover:opacity-100 cursor-pointer'
						>
							<div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm transition-transform scale-90 group-hover:scale-100'>
								{isPlaying ? (
									<Pause className='h-6 w-6 text-white' />
								) : (
									<Play className='ml-1 h-6 w-6 text-white' />
								)}
							</div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

