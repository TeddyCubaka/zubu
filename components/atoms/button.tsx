import React from "react";
import { UploadToCloudButtonProps, ButtonProps } from "../interface/button";
import { SendToServerType } from "../interface/requests";
import { sendToServer, uploadImage } from "../usefulFuction/requests";

export function PrimaryButton(props: ButtonProps) {
	return (
		<button
			type="button"
			className={
				(props.notWidthMax ? "" : "w-full ") +
				`text-white font-light text-normal rounded border-2 flex justify-center items-center whitespace-nowrap btn ${
					props.conditionToPass
						? " bg-[#123853]  border-blue"
						: " bg-[#123853b4] border-[#123853b4] "
				}`
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
				`text-blue font-light text-normal rounded border-2 flex justify-center items-center whitespace-nowrap btn border-blue`
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
