import Image from "next/image";
import { HiPlusSm } from "react-icons/hi";
import { PropretyStore, propretyStore } from "../../store/proprety";
import { MdDelete, MdDownload } from "react-icons/md";
import React, { useRef, useState } from "react";
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

interface UploadToCloudButton {
	proprety: PropretyStore;
	_setDispalyUploadImages: (state: boolean) => void;
}

function PropretyImage(props: ImageProps) {
	const [topBarDisplayed, setTopBarDisplayed] = React.useState<boolean>(false);
	const imageRef = useRef<null | HTMLImageElement>(null);

	return (
		<div
			className="w_max h_auto hidden border-gray m_y-10"
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

function UploadToCloudButton({
	proprety,
	_setDispalyUploadImages,
}: UploadToCloudButton) {
	const [upload, _setUpload] = useState<Boolean>(false);

	return (
		<div
			className="m_x-10_0 btn_p btn br color_w"
			onClick={async () => {
				_setUpload(true);
				for (let i = 0; i < proprety.updateDescription.files.length; i++) {
					await uploadImage({
						file: proprety.updateDescription.files[i],
						getUrl: () => {},
						getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
						clearFileFunction: () => proprety.updateDescription.deleteFile(0),
						getImage: proprety.updateDescription.addImagesToGallery,
					});
					if (i === proprety.updateDescription.files.length - 1) {
						const sendToServerData = {
							path: "/proprety/" + proprety.proprety._id,
							data: {
								description: proprety.proprety.description,
							},
							getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
						};
						sendToServer(sendToServerData);
						_setUpload(false);
						_setDispalyUploadImages(false);
					}
				}
			}}>
			{upload ? (
				<span className="uploading"></span>
			) : (
				proprety.updateDescription.updatingGalleryStatus
			)}
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
			{proprety.proprety.description.gallery.length > 0 ? (
				<div
					style={{
						columnCount:
							proprety.proprety.description.gallery.length > 2 ? 2 : 1,
					}}
					className="m_y-10">
					{proprety.proprety.description.gallery.map((img) => (
						<PropretyImage
							source={img.url}
							description={img.publicId + img.uploadDate}
							deleter={() =>
								proprety.updateDescription.deleteImageFromGallery(img.url)
							}
							key={img.publicId}
						/>
					))}
				</div>
			) : (
				""
			)}
			{displayUploadImages ? (
				<div className="fixed displayer_uploaded_images_card">
					<div className="bg-white m_x-20 br h_75">
						<div className="m-10 flex space_between">
							<div>
								<b>Gallery : </b>
								{proprety.updateDescription.files.length} Images selectionés
							</div>
							<div className="flex">
								<button
									className="btn_s btn br color_b txt_normal"
									onClick={() => {
										proprety.updateDescription.cleanFiles();
										_setDispalyUploadImages(false);
									}}>
									Annuler
								</button>
								<UploadToCloudButton
									proprety={proprety}
									_setDispalyUploadImages={_setDispalyUploadImages}
								/>
							</div>
						</div>
						<div
							style={{
								height: "80%",
								overflow: "hidden",
								overflowY: "scroll",
							}}
							className="m_x-10 br border-gray">
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
				</div>
			) : (
				""
			)}
			<label htmlFor="file" className="btn_s btn color_b br flex w_hug">
				<HiPlusSm size={18} className="m_right-5" /> Ajouter une image
			</label>
			<input
				type={"file"}
				id="file"
				className="hide"
				multiple
				accept="image/*"
				onChange={(e) => {
					proprety.updateDescription.setFiles(
						Array.prototype.slice
							.call(e.target.files)
							.filter((file, index) => index < 15)
					);
					_setDispalyUploadImages(true);
				}}
			/>
		</>
	);
}
