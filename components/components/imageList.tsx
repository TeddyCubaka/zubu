import Image from "next/image";
import React, { useRef } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { getDownloadLink } from "../usefulFuction/dowloadImageLink";

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
	"https://res.cloudinary.com/di64z9yxk/image/upload/v1675790424/zubu/kz8osezdfagsvvld6hys.png",
	"https://res.cloudinary.com/di64z9yxk/image/upload/v1675790424/zubu/kz8osezdfagsvvld6hys.png",
];

function PropretyImage(props: ImageProps) {
	const [topBarDisplayed, setTopBarDisplayed] = React.useState<boolean>(false);
	const imageRef = useRef<HTMLDivElement>();

	return (
		<div
			className="w_max h_auto hidden border-w"
			onMouseOver={() => setTopBarDisplayed(true)}
			onMouseLeave={() => setTopBarDisplayed(false)}>
			{topBarDisplayed ? (
				<div
					className="image_topbar_in_proprety_gallery space_between txt_normal color_w"
					onClick={() =>
						imageRef.current
							? console.log(imageRef.current.offsetWidth)
							: console.log("null")
					}>
					<a href={getDownloadLink(props.source)} download={"zubu_image"}>
						<MdDownload size="18px" color="white" />{" "}
					</a>
					<MdDelete size="18px" />
				</div>
			) : (
				""
			)}
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
		Math.round(link.length / 2),
		link.length
	);
	console.log(link.length);

	return (
		<div className="two_part">
			<div className="border-w_25">
				{firstColumn.map((image, index) => (
					<PropretyImage
						source={image}
						description="BreackFasct"
						key={image + index}
					/>
				))}
			</div>
			<div className="border-w_25">
				{secondColumn.map((image, index) => (
					<PropretyImage
						source={image}
						description="BreackFasct"
						key={image + index}
					/>
				))}
			</div>
		</div>
	);
}
