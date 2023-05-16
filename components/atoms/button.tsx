import React from "react";
import { UploadToCloudButtonProps, ButtonProps } from "../interface/button";
import { SendToServerType } from "../interface/requests";
import { sendToServer, uploadImage } from "../usefulFuction/requests";

const img = () => {
	return (
		<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	);
};

export function PrimaryButton(props: ButtonProps) {
	return (
		<button
			type="button"
			className={
				(props.notWidthMax ? "" : "w-full ") +
				(props.widthHalf ? "w-2/4" : "") +
				(props.widthHalf && !props.notWidthMax ? "w-fit" : "") +
				(props.fullRounded ? " rounded-3xl " : " rounded ") +
				(props.conditionToPass
					? " bg-[#123853]  border-[#123853]"
					: " bg-[#123853b4] border-transparent ") +
				" text-white font-light text-normal border-2 p-2 flex justify-center items-center whitespace-nowrap h-fit hover:font-medium"
			}
			onClick={() => {
				if (!props.conditionToPass) {
					props.doIfConditionDoesNotPass
						? props.doIfConditionDoesNotPass()
						: "";
				}
				if (props.conditionToPass) {
					props.doOnClick();
				}
			}}>
			{props.subject}
		</button>
	);
}

export function UploadToCloudButton({
	proprety,
	_setDispalyUploadImages,
}: UploadToCloudButtonProps) {
	const [upload, _setUpload] = React.useState<boolean>(false);

	return (
		<div
			className="ml-2.5 btn br text-white"
			onClick={async () => {
				_setUpload(true);
				for (let i = 0; i < proprety.updateDescription.files.length; i++) {
					await uploadImage({
						file: proprety.updateDescription.files[i],
						getUrl: () => {},
						getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
						clearFileFunction: () => proprety.updateDescription.deleteFile(0),
						getImage: proprety.updateDescription.addImagesToGallery,
						doAfterResponse(e) {
							const sendToServerData: SendToServerType = {
								path: "/proprety/" + proprety.proprety._id,
								data: {
									description: {
										...proprety.proprety.description,
										gallery: [...proprety.proprety.description.gallery, e],
									},
								},
								getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
								doAfterSuccess: (e) => console.log(e),
							};
							sendToServer(sendToServerData);
							_setUpload(false);
							_setDispalyUploadImages(false);
						},
					});
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

export function SecondaryButton(props: ButtonProps) {
	return (
		<button
			type="button"
			className={
				(props.notWidthMax ? "" : "w-full ") +
				" text-blue font-light text-normal border-2 border-[#123853] p-2 flex justify-center items-center whitespace-nowrap hover:bg-[#123853] hover:text-white hover:transition-all hover:duration-200  " +
				(props.fullRounded ? "rounded-3xl" : "rounded")
			}
			onClick={() => {
				if (!props.conditionToPass) {
					props.doIfConditionDoesNotPass
						? props.doIfConditionDoesNotPass()
						: "";
				}
				if (props.conditionToPass) {
					props.doOnClick();
				}
			}}>
			{props.subject}
		</button>
	);
}
