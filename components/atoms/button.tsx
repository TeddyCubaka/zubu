import React, { useEffect } from "react";
import { UploadToCloudButtonProps, ButtonProps } from "../interface/button";
import { SendToServerType } from "../interface/requests";
import { sendToServer, uploadImage } from "../usefulFuction/requests";

const Img = () => {
	return (
		<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
			<circle
				className="opacity-10"
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
			{props.isLoading ? <Img /> : ""}
			{props.subject}
		</button>
	);
}

export function UploadToCloudButton({
	proprety,
	_setDispalyUploadImages,
	initialLength,
}: UploadToCloudButtonProps) {
	const [upload, _setUpload] = React.useState<boolean>(false);
	const [hasCloudFinish, _setHasCloudFinish] = React.useState<boolean>(false);

	useEffect(() => {
		if (hasCloudFinish) {
			const sendToServerData: SendToServerType = {
				path: "/proprety/" + proprety.proprety._id,
				data: {
					description: {
						...proprety.proprety.description,
						gallery: [...proprety.proprety.description.gallery],
					},
				},
				getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
				doAfterSuccess: (e) => {
					_setUpload(false);
					_setDispalyUploadImages(false);
				},
			};
			sendToServer(sendToServerData);
		}
	}, [hasCloudFinish, _setDispalyUploadImages, _setUpload]);

	return (
		<div
			className="ml-2.5 rounded text-blue font-light text-normal border-2 border-[#123853] p-2 flex justify-center items-center whitespace-nowrap hover:bg-[#123853] hover:text-white hover:transition-all hover:duration-200  "
			onClick={() => {
				_setUpload(true);
				proprety.updateDescription.files.map(async (file, index) => {
					await uploadImage({
						file: file,
						getStatus: proprety.updateDescription.setUpdatingGalleryStatus,
						clearFileFunction: () => {},
						getImage: proprety.updateDescription.addImagesToGallery,
						doAfterResponse(e) {},
					});
					if (index === proprety.updateDescription.files.length - 1)
						_setHasCloudFinish(true);
				});
			}}>
			{upload ? <Img /> : ""} {proprety.updateDescription.updatingGalleryStatus}
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
				(props.fullRounded ? "rounded-3xl " : "rounded ") +
				(props.fullWidthOnMobile ? " max-md:w-full" : "")
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
			{props.isLoading ? <Img /> : ""}
			{props.subject}
		</button>
	);
}
