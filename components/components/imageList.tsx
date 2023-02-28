import axios from "axios";
import Image from "next/image";
import { propretyStore } from "../../store/proprety";
import { MdDelete, MdDownload } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { didThisFilesSizePass } from "../usefulFuction/files";
import {
	SectionHead,
	sendToServer,
	uploadImage,
} from "./updatePropretyComponents";

interface ImageProps {
	source: string;
	description: string;
}

export function AdaptedImages() {
	const proprety = propretyStore();
	const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

	const firstColumn: string[] = galleryUrls.slice(
		0,
		Math.round(galleryUrls.length / 2)
	);
	const secondColumn: string[] = galleryUrls.slice(
		Math.round(galleryUrls.length / 2),
		galleryUrls.length
	);

	const uploadImagesToCloud = async () => {
		let images: File[] = [];
		setGalleryUrls([]);
		if (proprety.updateDescription.files.length > 0) {
			images = Array.from(proprety.updateDescription.files);
			images.map(async (file) => {
				uploadImage({
					file: file,
					getUrl: () => {},
					getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
					clearFileFunction: proprety.updateDescription.cleanFiles,
					getImage: proprety.updateDescription.addImagesToGallery,
				});
			});
		} else console.log("Empty");
	};

	useEffect(() => {
		if (proprety.updateDescription.files.length > 0) {
			proprety.updateDescription.files.map((file, index) => {
				if (index < 16 && didThisFilesSizePass(file)) {
					setGalleryUrls((oldFiles) => [
						URL.createObjectURL(file),
						...oldFiles,
					]);
				}
			});
		}
	}, [proprety.updateDescription.files]);

	useEffect(() => {
		setGalleryUrls([]);
		proprety.proprety.description.gallery.map((image) =>
			setGalleryUrls((prev) => [...prev, image.url])
		);
		sendToServer({
			path: "/proprety/" + proprety.proprety._id,
			data: {
				description: proprety.proprety.description,
			},
			getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
		});
	}, [proprety.proprety.description.gallery, proprety.updateDescription.files]);

	function PropretyImage(props: ImageProps) {
		const [topBarDisplayed, setTopBarDisplayed] =
			React.useState<boolean>(false);
		const imageRef = useRef<null | HTMLImageElement>(null);
		const galleryUrlsFilter = (urlToDelete: string) => {
			setGalleryUrls((oldGallery) =>
				oldGallery.filter((url) => url !== urlToDelete)
			);
		};

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
						<MdDelete
							size="18px"
							onClick={() => {
								galleryUrlsFilter(props.source);
							}}
						/>
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
		<>
			<SectionHead
				title={"Gallery"}
				uploadImages={uploadImagesToCloud}
				sendToServerProps={{
					path: "/proprety/" + proprety.proprety._id,
					data: {
						description: proprety.proprety.description,
					},
					getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
				}}
				updatingStatus={proprety.updateDescription.updatingGalleryStatus}
				setUpdatingStatus={proprety.updateDescription.setUpdatingGalleryStatus}
			/>
			<div>
				<button onClick={() => console.log(proprety.proprety.description)}>
					Click
				</button>
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
							console.log(e.target.files);
							if (e.target.files && Array.from(e.target.files).length > -1) {
								proprety.updateDescription.setFiles(Array.from(e.target.files));
							}
						}}
					/>
				</div>
			</div>
		</>
	);
}
