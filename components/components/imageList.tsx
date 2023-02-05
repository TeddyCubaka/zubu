import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React from "react";

function srcset(image: string, size: number, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${
			size * rows
		}&fit=crop&auto=format&dpr=2 2x`,
	};
}

interface ImageProps {
	source: string;
	description: string;
	colmun?: string;
	row?: string;
}

function PropretyImage(props: ImageProps) {
	return (
		<div
			className="w_max h_max hidden border-w"
			style={{
				gridRow: props.row,
				gridColumn: props.colmun,
			}}>
			<Image
				className="h_max w_auto"
				src={props.source}
				width={50}
				height={50}
				alt={props.description}
			/>
		</div>
	);
}

const TwoImage = () => {
	return (
		<div className="flex h_max">
			<PropretyImage
				source="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
				description="BreackFasct"
			/>
			<PropretyImage
				source="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
				description="BreackFasct"
			/>
		</div>
	);
};
const FourImage = () => {
	return (
		<div className="flex column h_max">
			<TwoImage />
			<TwoImage />
		</div>
	);
};
const OneImage = () => {
	return (
		<div className="h_max">
			<PropretyImage
				source="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
				description="BreackFasct"
			/>
		</div>
	);
};
export function ImageListZubuWithFirstBigImage() {
	return (
		<div className="two_part h_auto" style={{ height: "200px" }}>
			<OneImage />
			<FourImage />
		</div>
	);
}
export function ImageListZubuWithLastBigImage() {
	return (
		<div className="two_part h_auto" style={{ height: "200px" }}>
			<FourImage />
			<OneImage />
		</div>
	);
}
