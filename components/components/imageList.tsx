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
	const [uploadingImagesToCloud, setUploadingImagesToCloud] =
		useState<boolean>(false);

	const firstColumn: string[] = galleryUrls.slice(
		0,
		Math.round(galleryUrls.length / 2)
	);
	const secondColumn: string[] = galleryUrls.slice(
		Math.round(galleryUrls.length / 2),
		galleryUrls.length
	);

	const uploadImagesToCloud = async () => {
		setUploadingImagesToCloud(true);
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
				setUploadingImagesToCloud(false);
			});
		} else console.log("Empty");
	};

	useEffect(() => {
		if (proprety.updateDescription.files.length > 0) {
			proprety.updateDescription.files.map((file, index) => {
				if (index < 16 && didThisFilesSizePass(file)) {
					setGalleryUrls((oldFiles) => [
						URL.createObjectURL(file) + "there is index" + index,
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
	}, [
		proprety.proprety.description.gallery,
		proprety.proprety._id,
		proprety.proprety.description,
		proprety.updateDescription.setUpdatingGalleryStatus,
	]);

	function PropretyImage(props: ImageProps) {
		const [topBarDisplayed, setTopBarDisplayed] =
			React.useState<boolean>(false);
		const imageRef = useRef<null | HTMLImageElement>(null);
		const galleryUrlsFilter = (urlToDelete: string) => {
			console.log(Number(urlToDelete.split("there is index")[1]));
			proprety.updateDescription.deleteFile(
				Number(urlToDelete.split("there is index")[1])
			);
			proprety.updateDescription.deleteImageFromGallery(urlToDelete);
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
				uploadImages={() => {
					if (proprety.updateDescription.files.length > 0)
						uploadImagesToCloud();
					else
						sendToServer({
							path: "/proprety/" + proprety.proprety._id,
							data: {
								description: proprety.proprety.description,
							},
							getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
						});
				}}
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
				<button onClick={() => console.log(proprety.updateDescription.files)}>
					Click
				</button>
				{uploadingImagesToCloud ? (
					<div>Envoies des images au cloud...</div>
				) : (
					<div className="two_part">
						<div className="border-w_25">
							{firstColumn.map((image, index) => (
								<PropretyImage
									source={image.split("there is index")[0]}
									description="BreackFasct"
									key={image + index}
								/>
							))}
						</div>
						<div className="border-w_25">
							{secondColumn.map((image, index) => (
								<PropretyImage
									source={image.split("there is index")[0]}
									description="BreackFasct"
									key={image + index}
								/>
							))}
						</div>
						<input
							type="file"
							multiple
							max={4}
							accept=".png, .jpg, .jpeg"
							onChange={(e) => {
								if (e.target.files) console.log(e.target.files);
								// 	if (e.target.files && Array.from(e.target.files).length > -1) {
								// 		proprety.updateDescription.setFiles(
								// 			Array.from(e.target.files)
								// 		);
								// 		Array.from(e.target.files).map((file, index) => {
								// 			if (index < 16) {
								// 				setGalleryUrls((oldFiles) => [
								// 					URL.createObjectURL(file) + "there is index" + index,
								// 					...oldFiles,
								// 				]);
								// 			}
								// 		});
								// 	}
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
}
