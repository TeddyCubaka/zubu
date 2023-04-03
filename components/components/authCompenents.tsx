import { useState } from "react";
import {
	Input,
	InputHasDetails,
	InputProps,
	sendToServer,
} from "./updatePropretyComponents";
import { userStore } from "../../store/user";
import { BiShow, BiHide } from "react-icons/bi";

interface InputedPassword {
	firstPassword: string;
	lastPassword: string;
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
				{subject}{" "}
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
				<BiShow onClick={() => changeLocalState()} size={20} />
			) : (
				<BiHide onClick={() => changeLocalState()} size={20} />
			)}
		</div>
	);
}

export function Signup() {
	const user = userStore();
	const [inputedPasswords, getInputedPassword] = useState<InputedPassword>({
		firstPassword: "",
		lastPassword: "",
	});
	const passwordVerificator = () => {
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
		<div className="space_between-y  m_x-20 m_y-10 row_gap-10 ">
			<Input
				value={user.user.username}
				sendToStore={user.seter._setUsername}
				subject={"Nom d'utilisateur :"}
				placeholder={"votre nom"}
			/>
			<Input
				value={user.user.mail}
				sendToStore={user.seter._setMail}
				subject={"mail :"}
				placeholder={"votre mail"}
			/>
			<Input
				value={user.user.phone_number}
				sendToStore={user.seter._setPhoneNumber}
				subject={"Numéro de téléphone :"}
				placeholder={"votre numéro de téléphone"}
			/>
			<InputHasDetails
				detailsData={["Homme", "Femme", "Autre"]}
				store={user.user.gender}
				object={"Genre :"}
				sendToStore={user.seter._setGender}
			/>
			<InputPassword
				value={inputedPasswords.firstPassword}
				sendToStore={(e) =>
					getInputedPassword((prev) => ({ ...prev, firstPassword: e }))
				}
				subject={"Mot de passe :"}
				customClass={passwordVerificator()}
				placeholder={"votre mot de passe"}
			/>
			<InputPassword
				value={inputedPasswords.lastPassword}
				sendToStore={(e) =>
					getInputedPassword((prev) => ({ ...prev, lastPassword: e }))
				}
				subject={"Répeter le mot de pass :"}
				customClass={passwordVerificator()}
				placeholder={"votre mot de passe"}
			/>
			<button
				className="btn_p color_w br txt_normal btn w_max flex_center-xy one_line_txt"
				onClick={() => {
					if (
						inputedPasswords.firstPassword === inputedPasswords.lastPassword
					) {
						const newUserData = {
							mail: user.user.mail,
							phone_number: user.user.phone_number,
							password: inputedPasswords.firstPassword,
							username: user.user.username,
							gender: user.user.gender,
						};

						const sendToServerData = {
							path: "/user",
							data: newUserData,
							getStatus: user.status.getSignup,
							getData: user.status.getSignupData,
							doAfterSuccess: (e: any) => {
								window.localStorage.setItem("token", e.token);
								window.localStorage.setItem("userId", e.user._id);
								window.localStorage.setItem("user", e.user);
								window.location.href = "/";
							},
						};
						sendToServer(sendToServerData);
					}
				}}>
				S&apos;inscrire
			</button>
		</div>
	);
}

export function Login() {
	const [loginData, getLoginData] = useState<LoginData>({
		mail: "",
		password: "",
	});
	return (
		<div className="space_between-y m_x-20 m_y-10 row_gap-10">
			<Input
				value={loginData.mail}
				sendToStore={(e) => getLoginData((prev) => ({ ...prev, mail: e }))}
				subject={"Numéro de téléphone :"}
				placeholder={"votre numéro de téléphone"}
			/>
			<InputPassword
				value={loginData.password}
				sendToStore={(e) => getLoginData((prev) => ({ ...prev, password: e }))}
				subject={"Mot de passe :"}
				customClass={""}
				placeholder={"votre mot de passe"}
			/>
			<button
				className="btn_p color_w br txt_normal btn w_max flex_center-xy one_line_txt"
				onClick={() => {
					if (loginData.mail.length > 9 && loginData.password.length > 3) {
						const sendToServerData = {
							path: "/user/auth",
							data: loginData,
							getStatus: () => {},
							doAfterSuccess: (e: any) => {
								window.localStorage.setItem("token", e.token);
								window.localStorage.setItem("userId", e.user._id);
								window.localStorage.setItem("user", e.user);
								window.location.href = "/";
							},
						};
						sendToServer(sendToServerData);
					}
				}}>
				Se connecter
			</button>
		</div>
	);
}
