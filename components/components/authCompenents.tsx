import { useEffect, useState } from "react";
import { Input, InputHasDetails } from "../atoms/form";
import { userStore } from "../../store/user";
import { BiShow, BiHide } from "react-icons/bi";
import { PrimaryButton } from "../atoms/button";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import { InputProps } from "../interface/atoms";
import { SendToServerType } from "../interface/requests";
import { sendToServer } from "../usefulFuction/requests";

interface InputedPassword {
	firstPassword: string;
	lastPassword: string;
	requid?: boolean;
}

interface LoginData {
	mail: string;
	password: string;
}

export function InputPassword({
	value,
	sendToStore,
	type,
	subject,
	customClass,
	placeholder,
	required,
}: InputProps) {
	const [fullInputWidth, setFullInputWidth] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const changeLocalState = () => {
		if (showPassword) setShowPassword(false);
		else setShowPassword(true);
	};

	return (
		<div
			className={"input_w_label " + customClass}
			onClick={() => setFullInputWidth(true)}
			onMouseLeave={() => setFullInputWidth(false)}>
			<label className={fullInputWidth ? "hide" : "txt_meddium one_line_txt"}>
				{" "}
				{subject}
				{required ? <span className="color_red">*</span> : ""}
				{" :"}
			</label>
			<input
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				className={
					"br w_max txt_normal " + (type === "date" ? "txt_center" : "")
				}
				value={value ? value : ""}
				onChange={(e) => {
					e.preventDefault();
					sendToStore(e.target.value);
				}}
			/>
			{showPassword ? (
				<BiShow onClick={() => changeLocalState()} size={"18px"} />
			) : (
				<BiHide onClick={() => changeLocalState()} size={"18px"} />
			)}
		</div>
	);
}

export function Signup() {
	const router = useRouter();
	const [getUserSignupStatus, sendingData, user, userSeter, _setErrorData] =
		userStore((store) => [
			store.status.getSignup,
			store.status._setSendingData,
			store.user,
			store.seter,
			store.status._setErrorData,
		]);
	const [inputedPasswords, getInputedPassword] = useState<InputedPassword>({
		firstPassword: "",
		lastPassword: "",
	});
	const [SendingDataState, _setSendingDataState] = useState<boolean>(false);

	const passwordVerificator = (): boolean => {
		if (
			inputedPasswords.firstPassword == "" &&
			inputedPasswords.lastPassword == ""
		)
			return false;
		else if (inputedPasswords.firstPassword === inputedPasswords.lastPassword)
			return true;
		else return false;
	};
	const passwordsChecker = () => {
		if (
			inputedPasswords.firstPassword == "" &&
			inputedPasswords.lastPassword == ""
		)
			return "";
		else if (inputedPasswords.firstPassword === inputedPasswords.lastPassword)
			return "br_green";
		else return "br_red";
	};
	return (
		<div className={"space_between-y m_x-20 m_y-10 row_gap-10 "}>
			<Input
				value={user.username}
				sendToStore={userSeter._setUsername}
				subject={"Nom d'utilisateur :"}
				placeholder={"votre nom d'utilisateur"}
				required
			/>
			<Input
				value={user.mail}
				sendToStore={userSeter._setMail}
				subject={"mail :"}
				placeholder={"votre mail"}
				required
			/>
			<Input
				value={user.phone_number}
				sendToStore={userSeter._setPhoneNumber}
				subject={"Numéro de téléphone :"}
				placeholder={"votre numéro de téléphone"}
			/>
			<InputHasDetails
				detailsData={["Homme", "Femme", "Autre"]}
				store={user.gender}
				object={"Genre :"}
				sendToStore={userSeter._setGender}
			/>
			<InputPassword
				value={inputedPasswords.firstPassword}
				sendToStore={(e) =>
					getInputedPassword((prev) => ({ ...prev, firstPassword: e }))
				}
				subject={"Mot de passe"}
				customClass={passwordsChecker()}
				placeholder={"votre mot de passe"}
				required
			/>
			<InputPassword
				value={inputedPasswords.lastPassword}
				sendToStore={(e) =>
					getInputedPassword((prev) => ({ ...prev, lastPassword: e }))
				}
				subject={"Répeter le mot de pass"}
				customClass={passwordsChecker()}
				placeholder={"votre mot de passe"}
				required
			/>
			<PrimaryButton
				subject={SendingDataState ? `Conexion...` : "S'inscrire"}
				conditionToPass={
					passwordVerificator() &&
					user.phone_number.length > 8 &&
					user.mail.length > 10
				}
				doOnClick={() => {
					sendingData(true);
					_setSendingDataState(true);
					_setErrorData({
						message: "",
						error: "",
						hasError: false,
					});
					const newUserData = {
						mail: user.mail,
						phone_number: user.phone_number,
						password: inputedPasswords.firstPassword,
						username: user.username,
						gender: user.gender,
					};
					const sendToServerData: SendToServerType = {
						path: "/user",
						data: newUserData,
						getStatus: getUserSignupStatus,
						doIfError: (err) => {
							sendingData(false);
							_setErrorData({
								message:
									err.response.status == 401
										? "Revoyez les données entrée"
										: "Un problème est survenue. Réessayez plus tard",
								error: err.response.data.error,
								hasError: true,
							});
						},
						doAfterSuccess: (e: any) => {
							window.localStorage.setItem("token", e.token);
							window.localStorage.setItem("userId", e.user._id);
							window.localStorage.setItem("user", e.user);
							window.localStorage.setItem("username", e.user.username);
							window.localStorage.setItem(
								"userPropreties",
								e.user.proprety.join("plös")
							);
							router.back();
							sendingData(false);
						},
					};
					sendToServer(sendToServerData);
				}}
			/>
		</div>
	);
}

export function Login() {
	const router = useRouter();
	const [getUserLoginStatus, sendingData, _setErrorData, _setCurrentUser] =
		userStore((store) => [
			store.status.getLogin,
			store.status._setSendingData,
			store.status._setErrorData,
			store._setCurrentUser,
		]);
	const [loginData, getLoginData] = useState<LoginData>({
		mail: "",
		password: "",
	});
	const [SendingDataState, _setSendingDataState] = useState<boolean>(false);

	return (
		<div className={"space_between-y m_x-20 m_y-10 row_gap-10 "}>
			<Input
				value={loginData.mail}
				sendToStore={(e) => getLoginData((prev) => ({ ...prev, mail: e }))}
				subject={"mail :"}
				placeholder={"votre adresse mail"}
			/>
			<InputPassword
				value={loginData.password}
				sendToStore={(e) => getLoginData((prev) => ({ ...prev, password: e }))}
				subject={"Mot de passe :"}
				customClass={""}
				placeholder={"votre mot de passe"}
			/>
			<PrimaryButton
				subject={SendingDataState ? `Conexion...` : "Se connecter"}
				conditionToPass={
					loginData.mail.length > 9 && loginData.password.length > 3
				}
				doOnClick={() => {
					sendingData(true);
					_setSendingDataState(true);
					_setErrorData({
						message: "",
						error: "",
						hasError: false,
					});
					const sendToServerData: SendToServerType = {
						path: "/user/auth",
						data: loginData,
						getStatus: getUserLoginStatus,
						doIfError: (err) => {
							sendingData(false);
							_setErrorData({
								message: err.response
									? err.response.status == 401
										? "Mot de pass ou mail incorect"
										: "Un problème est survenue. Réessayez plus tard"
									: err.code,
								error: JSON.stringify(err),
								hasError: true,
							});
						},
						doAfterSuccess: (e: any) => {
							window.localStorage.setItem("token", e.token);
							window.localStorage.setItem("userId", e.user._id);
							window.localStorage.setItem("user", JSON.stringify(e.user));
							window.localStorage.setItem("username", e.user.username);
							_setCurrentUser(e.user);
							_setSendingDataState(false);
							router.back();
							sendingData(false);
						},
					};
					sendToServer(sendToServerData);
				}}
			/>
		</div>
	);
}

export function ErrorShower() {
	const [error] = userStore((store) => [store.status.errorData], shallow);
	return (
		<div className="color_red w_max m_x-20 txt_small"> {error.message} </div>
	);
}

export function Error() {
	const [error] = userStore((store) => [store.status.errorData], shallow);
	return <div className="color_red w_max m_x-20"> {error.error} </div>;
}