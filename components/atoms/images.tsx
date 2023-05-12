import Image from "next/image";
import React from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { GalleryImageProps } from "../interface/images";

export default function PropretyImage(props: GalleryImageProps) {
	const [topBarDisplayed, setTopBarDisplayed] = React.useState<boolean>(false);
	const imageRef = React.useRef<null | HTMLImageElement>(null);
	return (
		<div
			className="max-md:w-[200px] max-md:h-[200px]  border-[#808080]"
			onMouseOver={() => setTopBarDisplayed(true)}
			onMouseLeave={() => setTopBarDisplayed(false)}>
			{topBarDisplayed ? (
				<div className="relative h-0">
					<span className="z-10 py-[5px] px-2.5 bg-[#00000080]  flex justify-between font-normal text-white">
						<a href={imageRef.current?.currentSrc} download={"shesh"}>
							<MdDownload size="18px" color="white" />{" "}
						</a>
						{props.hiderDeleter ? (
							""
						) : (
							<MdDelete size="18px" onClick={props.deleter} />
						)}
					</span>
				</div>
			) : (
				""
			)}
			<Image
				style={{ minWidth: "200px" }}
				ref={imageRef}
				className="h-auto w-full max-md:w-[200px]"
				src={props.source}
				width={300}
				height={300}
				alt={props.description}
			/>
		</div>
	);
}
