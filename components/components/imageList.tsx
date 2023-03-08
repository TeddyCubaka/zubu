import axios from "axios";
import Image from "next/image";
import { PropretyStore, propretyStore } from "../../store/proprety";
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
	deleter: any;
}

interface UploadImagesToCloudProps {
	setGalleryUrls: (urls: string[]) => void;
	setUploadingImagesToCloud: (state: boolean) => void;
	proprety: PropretyStore;
}

const uploadImagesToCloud = async ({
	setUploadingImagesToCloud,
	proprety,
}: UploadImagesToCloudProps) => {
	setUploadingImagesToCloud(true);
	let images: File[] = [];
	if (proprety.updateDescription.files.length > 0) {
		images = proprety.updateDescription.files;
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

function PropretyImage(props: ImageProps) {
	const [topBarDisplayed, setTopBarDisplayed] = React.useState<boolean>(false);
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
					<MdDelete size="18px" onClick={props.deleter} />
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

function UploadToCloudButton() {
	const [upload, _setUpload] = useState<Boolean>(false);

	return (
		<div className="m_x-10_0 btn_p btn br color_w" onClick={() => (upload ? _setUpload(false) : _setUpload(true))}>
			{upload ? <span className="uploading"></span> : "Sauvegarder"}
		</div>
	);
}

export function AdaptedImages() {
	const proprety = propretyStore();
	const [displayUploadImages, _setDispalyUploadImages] =
		useState<boolean>(false);

	return (
		<>
			<SectionHead
				title={"Gallery"}
				uploadImages={() => {
					if (proprety.updateDescription.files.length > 0)
						// uploadImagesToCloud();
						console.log("siuuu");
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
					Click here
				</button>
				<button onClick={() => _setDispalyUploadImages(true)}>display</button>
				<input
					type={"file"}
					multiple
					accept="image/*"
					onChange={(e) => {
						proprety.updateDescription.setFiles(
							Array.prototype.slice.call(e.target.files)
						);
						console.log(Array.prototype.slice.call(e.target.files));
						_setDispalyUploadImages(true);
					}}
				/>
			</div>
			{displayUploadImages ? (
				<div className="fixed displayer_uploaded_images_card">
					<div className="bg-white m_x-20 br h_max">
						<div className="m-10 flex space_between">
							<div>
								<b>Gallery : </b>
								{proprety.updateDescription.files.length} Images selectionés
							</div>
							<div className="flex">
								<button className="btn_s btn br color_b txt_normal" onClick={() => _setDispalyUploadImages(false)}>
									Annuler
								</button>
								<UploadToCloudButton />
							</div>
						</div>
						<div className="displayer_uploaded_images">
							{proprety.updateDescription.files.map((file, index) => (
								<PropretyImage
									key={file.lastModified + file.name}
									source={URL.createObjectURL(file)}
									description={`Image ${index} de Teddy actiuo`}
									deleter={() => proprety.updateDescription.deleteFile(index)}
								/>
							))}
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}
