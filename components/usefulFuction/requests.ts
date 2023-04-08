import axios from "axios";
import { AskToServerDataType, SendToServerType } from "../interface/requests";

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
			// console.log(res);
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
