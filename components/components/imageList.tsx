import { HiPlusSm } from "react-icons/hi";
import { PropretyStore, propretyStore } from "../../store/proprety";
import React, { useEffect, useState } from "react";
import { SectionHead } from "./updatePropretyComponents";
import { sendToServer } from "../usefulFuction/requests";
import PropretyImage from "../atoms/images";
import { UploadToCloudButton } from "../atoms/button";

interface LocalPorps {
	proprety: PropretyStore;
	_setDispalyUploadImages: (state: boolean) => void;
}

function UploadedFiles({ proprety, _setDispalyUploadImages }: LocalPorps) {
	return (
		<div className="fixed w-screen h-screen bg-[rgba(0,0,0,0.445)] top-0 left-0 z-30 flex justify-center items-center ">
			<div className="bg-white mx-5 rounded h-[75%] ">
				<div className="m-[10px] flex justify-between items-center">
					<div>
						<b>Gallery : </b>
						{proprety.updateDescription.files.length} images selectionées
					</div>
					<div className="flex">
						<button
							className="btn_s btn rounded text-[#123853] txt_normal"
							onClick={() => {
								proprety.updateDescription.cleanFiles();
								_setDispalyUploadImages(false);
							}}>
							Annuler
						</button>
						<UploadToCloudButton
							initialLength={proprety.proprety.description.gallery.length}
							proprety={proprety}
							_setDispalyUploadImages={_setDispalyUploadImages}
						/>
					</div>
				</div>
				<div className="mx-[10px] border rounded border-[#808080] h-[80%] overflow-hidden overflow-y-scroll ">
					<div className="p-2.5 my-auto mx-0 flex flex-wrap justify-between gap-5  ">
						{proprety.updateDescription.files.map((file, index) => (
							<PropretyImage
								key={file.lastModified + file.name}
								source={URL.createObjectURL(file)}
								description={`Image ${index} de ${localStorage.getItem(
									"zubu_username"
								)}`}
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
				<div className="my-[10px] grid grid-cols-2 max-md:flex max-md:flex-wrap max-md:items-center max-md:gap-5 gap-5 max-md:overflow-hidden max-md:overflow-x-scroll">
					{proprety.proprety.description.gallery.map((img) => (
						<>
							<PropretyImage
								source={img.url}
								description={img.publicId + img.uploadDate}
								deleter={() =>
									proprety.updateDescription.deleteImageFromGallery(img.url)
								}
								key={img.publicId + img._id + img.url}
							/>
						</>
					))}
				</div>
			) : (
				""
			)}
			{displayUploadImages ? (
				<UploadedFiles
					_setDispalyUploadImages={_setDispalyUploadImages}
					proprety={proprety}
				/>
			) : (
				""
			)}
			<label
				htmlFor="file"
				className="text-blue font-light text-normal border-2 border-[#123853] p-2 flex justify-center items-center whitespace-nowrap hover:bg-[#123853] hover:text-white hover:transition-all hover:duration-200  text-[#123853] rounded">
				<HiPlusSm size={18} className="m_right-5" /> Ajouter une image
			</label>
			<input
				type={"file"}
				id="file"
				className="hidden"
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
