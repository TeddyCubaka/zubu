import Image from "next/image";
import React from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { GalleryImageProps } from "../interface/images";

export default function PropretyImage(props: GalleryImageProps) {
	const imageRef = React.useRef<null | HTMLImageElement>(null);
	return (
		<div className="group max-md:w-fit max-md:h-auto md:max-w-[400px] border-[#808080]">
			<div className="group-hover:opacity-100 opacity-0 max-md:opacity-100 relative h-0">
				<span className="z-10 py-[5px] group-hover:block px-2.5 bg-[#00000080] flex justify-between font-normal text-white">
					{props.downloadBtn ? (
						<a href={imageRef.current?.currentSrc} download={"shesh"}>
							<MdDownload size="18px" color="white" />{" "}
						</a>
					) : (
						""
					)}
					{props.hiderDeleter ? (
						""
					) : (
						<MdDelete size="18px" onClick={props.deleter} />
					)}
				</span>
			</div>
			<Image
				style={{ minWidth: "200px" }}
				ref={imageRef}
				className="h-auto w-full"
				src={props.source}
				width={300}
				height={300}
				alt={props.description}
			/>
		</div>
	);
}
