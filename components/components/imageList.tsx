import { HiPlusSm } from "react-icons/hi";
import { propretyStore } from "../../store/proprety";
import React, { useState } from "react";
import { SectionHead } from "./updatePropretyComponents";
import { sendToServer } from "../usefulFuction/requests";
import PropretyImage from "../atoms/images";
import { UploadToCloudButton } from "../atoms/button";

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
				<div className="m_y-10 proprety_gallery_images">
					{proprety.proprety.description.gallery.map((img) => (
						<>
							<PropretyImage
								source={img.url}
								description={img.publicId + img.uploadDate}
								deleter={() =>
									proprety.updateDescription.deleteImageFromGallery(img.url)
								}
								key={img.publicId + img._id}
							/>
						</>
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
										deleter={() => {
											proprety.updateDescription.deleteFile(index);
											proprety.updateDescription.setUpdatingGalleryStatus(
												"Sauvegarder"
											);
										}}
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
