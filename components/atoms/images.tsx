import Image from "next/image";
import React from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { GalleryImageProps } from "../interface/images";

export default function PropretyImage(props: GalleryImageProps) {
	const [topBarDisplayed, setTopBarDisplayed] = React.useState<boolean>(false);
	const imageRef = React.useRef<null | HTMLImageElement>(null);

	return (
		<div
			className="w_auto h_auto hidde border-gray"
			onMouseOver={() => setTopBarDisplayed(true)}
			onMouseLeave={() => setTopBarDisplayed(false)}>
			{topBarDisplayed ? (
				<span className="image_topbar_in_proprety_gallery space_between txt_normal color_w">
					<a href={imageRef.current?.currentSrc} download={"shesh"}>
						<MdDownload size="18px" color="white" />{" "}
					</a>
					<MdDelete size="18px" onClick={props.deleter} />
				</span>
			) : (
				""
			)}
			<Image
				ref={imageRef}
				className="h_auto w_max"
				src={props.source}
				width={300}
				height={300}
				alt={props.description}
			/>
		</div>
	);
}
