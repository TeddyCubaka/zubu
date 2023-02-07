import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

interface ImageProps {
	source: string;
	description: string;
}
const link = [
	"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
	"https://static.orpi.com/images/orpibackend/article-header-media/6079557fdfa94_GettyImages-1165384568.jpg",
	"https://media.gettyimages.com/id/1199873461/fr/photo/appartement-de-conception-moderne-vide-de-marque-pour-la-location.jpg?s=612x612&w=gi&k=20&c=LzojrBP3zRcAKHW4V1JYU6ajCWbQgKYSpH58PGyJ7tM=",
	"https://www.book-a-flat.com/magazine/wp-content/uploads/2016/12/espace-optimise-appartement-meuble-paris.jpg",
	"https://media.gettyimages.com/id/1199873461/fr/photo/appartement-de-conception-moderne-vide-de-marque-pour-la-location.jpg?s=612x612&w=gi&k=20&c=LzojrBP3zRcAKHW4V1JYU6ajCWbQgKYSpH58PGyJ7tM=",
	"https://www.book-a-flat.com/magazine/wp-content/uploads/2016/12/espace-optimise-appartement-meuble-paris.jpg",
];

function PropretyImage(props: ImageProps) {
	return (
		<div className="w_max h_auto hidden border-w">
			<Image
				className="h_auto w_max"
				src={props.source}
				width={300}
				height={300}
				alt={props.description}
			/>
		</div>
	);
}

export function AdaptedImages() {
	const firstColumn: string[] = link.slice(0, Math.round(link.length / 2));
	const secondColumn: string[] = link.slice(
		Math.round(link.length / 2) + 1,
		link.length
	);

	return (
		<div className="two_part">
			<div className="border-w_25">
				{firstColumn.map((image) => (
					<PropretyImage source={image} description="BreackFasct" />
				))}
			</div>
			<div className="border-w_25">
				{secondColumn.map((image) => (
					<PropretyImage source={image} description="BreackFasct" />
				))}
			</div>
		</div>
	);
}
