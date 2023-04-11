import axios from "axios";
import {
	AskToServerDataType,
	SendToServerType,
	UploadImageProps,
} from "../interface/requests";

export function sendToServer(props: SendToServerType) {
	axios({
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		method: "POST",
		url: process.env.NEXT_PUBLIC_DB_SERVER_URL + props.path,
		data: props.data,
	})
		.then((res) => {
			if (props.getData) props.getData(res.data);
			console.log(res.data);
			props.getStatus("À jour");
			if (props.doAfterSuccess) props.doAfterSuccess(res.data);
		})
		.catch((err) => {
			console.log(err);
			if (props.getData) props.getData(err);
			if (props.doIfError) props.doIfError(err);
			props.getStatus("Echec");
		});
}

export function askToServerData(props: AskToServerDataType) {
	axios({
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		method: "GET",
		url: process.env.NEXT_PUBLIC_DB_SERVER_URL + props.path,
		data: props.data,
	})
		.then((res) => {
			props.getData(res.data);
			props.getStatus("À jour");
			if (props.doAfterSuccess) props.doAfterSuccess(res.data);
		})
		.catch((err) => {
			delete err["stack"];
			console.log("error :", err);
			if (props.getData) props.getData(err);
			if (props.doIfError) props.doIfError(err);
			props.getStatus("Echec");
		});
}

export const uploadImage = async (props: UploadImageProps) => {
	props.getStatus("Envoie d'images");
	const formData = new FormData();
	formData.append("file", props.file);
	formData.append("upload_preset", "zubustein");
	await axios
		.post("https://api.cloudinary.com/v1_1/di64z9yxk/image/upload", formData)
		.then(async (res) => {
			const image = {
				_id: res.data._id,
				url: res.data.secure_url,
				width: res.data.width,
				height: res.data.height,
				size: res.data.bytes,
				uploadDate: res.data.created_at,
				publicId: res.data.public_id,
			};
			if (props.getUrl) props.getUrl(res.data.secure_url);
			if (props.doAfterResponse) props.doAfterResponse(image);
			props.getImage(image);
			props.getStatus("finish");
			props.clearFileFunction();
		})
		.catch((err) => {
			props.getStatus("error");
		});
};