import Image from "next/image";
import React, { useRef, useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { getDownloadLink } from "../usefulFuction/dowloadImageLink";
import { didThisFilesSizePass } from "../usefulFuction/files";

interface ImageProps {
	source: string;
	description: string;
}

export function AdaptedImages() {
	const [files, setFiles] = useState<File[]>([]);
	const [urls, setUrls] = useState<string[]>([]);

	const firstColumn: string[] = urls.slice(0, Math.round(urls.length / 2));
	const secondColumn: string[] = urls.slice(
		Math.round(urls.length / 2),
		urls.length
	);

	function PropretyImage(props: ImageProps) {
		const [topBarDisplayed, setTopBarDisplayed] =
			React.useState<boolean>(false);
		const imageRef = useRef<null | HTMLImageElement>(null);

		return (
			<div
				className="w_max h_auto hidden border-w"
				onMouseOver={() => setTopBarDisplayed(true)}
				onMouseLeave={() => setTopBarDisplayed(false)}>
				{topBarDisplayed ? (
					<div className="image_topbar_in_proprety_gallery space_between txt_normal color_w">
						<a href={imageRef.current?.currentSrc} download={"shesh"}>
							<MdDownload size="18px" color="white" />{" "}
						</a>
						<MdDelete size="18px" />
					</div>
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

	return (
		<div>
			<div>
				<span className="txt_meddium">Note :</span> Seules les images avec une
				taille inférieure à 5M sont considérées
			</div>
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
				<input
					type="file"
					multiple
					accept=".png, .jpg, .jpeg"
					onChange={(e) => {
						if (e.target.files && Array.from(e.target.files).length > -1) {
							Array.from(e.target.files).map((file, index) => {
								console.log(didThisFilesSizePass(file), file.size);
								if (index < 16 && didThisFilesSizePass(file)) {
									setFiles((oldFiles) => [...oldFiles, file]);
									setUrls((oldFiles) => [
										URL.createObjectURL(file),
										...oldFiles,
									]);
								}
							});
						}
					}}
				/>
			</div>
		</div>
	);
}
