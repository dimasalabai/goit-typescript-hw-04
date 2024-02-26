import React, { useEffect, useRef } from "react";

interface ObservarProps {
	children: React.ReactElement;
	onContentEndVisible: () => void;
}

// interface Options {
// 	rootMargin: string;
// 	threshold: number;
// 	root: null;
// }

class Options {
	constructor(
		public rootMargin: string,
		public threshold: number,
		public root: null
	) {}
}

// Опишіть Props
export function Observer({ children, onContentEndVisible }: ObservarProps) {
	// Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
	const endContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
		const options = new Options("0px", 1.0, null);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					onContentEndVisible();
					observer.disconnect();
				}
			});
		}, options);

		if (endContentRef.current) {
			observer.observe(endContentRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [onContentEndVisible]);

	return (
		<div>
			{children}
			<div ref={endContentRef} />
		</div>
	);
}
