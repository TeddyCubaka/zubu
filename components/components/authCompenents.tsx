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
import { isMail } from "../usefulFuction/formDatasValidator";
import { setSyntheticLeadingComments } from "typescript";

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
	const inputStyle =
		" border border-black rounded-[5px] p-2.5 txt-normal flex items-center ";
	const inputWithLabelParentStyle = " rounded-[5px] flex flex-col ";

	return (
		<div
			className={inputWithLabelParentStyle + customClass}
			onClick={() => setFullInputWidth(true)}
			onMouseLeave={() => setFullInputWidth(false)}>
			<label className={fullInputWidth ? "hide" : "font-medium one_line_txt"}>
				{" "}
				{subject}
				{required ? <span className="text-red-600">*</span> : ""}
			</label>
			<div className={inputStyle}>
				<input
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					className={
						"outline-none flex-1 " + type === "date" ? "text-center" : ""
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
		</div>
	);
}

export function Signup() {
	const router = useRouter();
	const [
		getUserSignupStatus,
		sendingData,
		user,
		userSeter,
		_setErrorData,
		errorData,
	] = userStore(
		(store) => [
			store.status.getSignup,
			store.status._setSendingData,
			store.user,
			store.seter,
			store.status._setErrorData,
			store.status.errorData,
		],
		shallow
	);
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
		<>
			<div className={"flex flex-col gap-2 my-2.5 h-full"}>
				<Input
					isInvalid={errorData?.hasError ? true : false}
					value={user.username}
					sendToStore={(e) =>
						typeof e === "string" ? userSeter._setUsername(e) : {}
					}
					subject={"Nom d'utilisateur :"}
					placeholder={"votre nom d'utilisateur"}
					required
				/>
				<Input
					isInvalid={errorData?.hasError ? true : false}
					type="email"
					value={user.mail}
					sendToStore={(e) =>
						typeof e === "string" ? userSeter._setMail(e) : {}
					}
					subject={"mail :"}
					placeholder={"votre mail"}
					required
				/>
				<Input
					isInvalid={errorData?.hasError ? true : false}
					value={user.phone_number}
					sendToStore={(e) =>
						typeof e === "string" ? userSeter._setPhoneNumber(e) : {}
					}
					subject={"Numéro de téléphone :"}
					placeholder={"votre numéro de téléphone"}
				/>
				<InputHasDetails
					detailsData={["Homme", "Femme", "Autre"]}
					store={user.gender}
					object={"Genre :"}
					sendToStore={userSeter._setGender}
				/>
				<Input
					isInvalid={errorData?.hasError ? true : false}
					type="password"
					value={inputedPasswords.firstPassword}
					sendToStore={(e) =>
						!(typeof e === "string")
							? ""
							: getInputedPassword((prev) => ({ ...prev, firstPassword: e }))
					}
					subject={"Mot de passe"}
					customClass={passwordsChecker()}
					placeholder={"votre mot de passe"}
					required
				/>
				<Input
					isInvalid={errorData?.hasError ? true : false}
					type="password"
					value={inputedPasswords.lastPassword}
					sendToStore={(e) =>
						!(typeof e === "string")
							? ""
							: getInputedPassword((prev) => ({ ...prev, lastPassword: e }))
					}
					subject={"Répeter le mot de pass"}
					customClass={passwordsChecker()}
					placeholder={"votre mot de passe"}
					required
				/>{" "}
			</div>
			<PrimaryButton
				subject={SendingDataState ? `Conexion...` : "S'inscrire"}
				notWidthMax
				widthHalf
				conditionToPass={
					passwordVerificator() && user.username.length > 3 && isMail(user.mail)
				}
				doIfConditionDoesNotPass={() => {
					_setErrorData({
						message: "Verifier que tout les champs sont remplis",
						error: "",
						hasError: false,
					});
					setTimeout(
						() =>
							_setErrorData({
								message: "",
								error: "",
								hasError: false,
							}),
						2000
					);
				}}
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
							window.localStorage.setItem("zubu_token", e.token);
							window.localStorage.setItem("zubu_userId", e.user._id);
							window.localStorage.setItem("zubu_user", JSON.stringify(e.user));
							window.localStorage.setItem("zubu_username", e.user.username);
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
		</>
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
		<>
			<div className={"flex flex-col justify-between gap-3 my-2.5"}>
				<Input
					value={loginData.mail}
					sendToStore={(e) =>
						!(typeof e === "string")
							? ""
							: getLoginData((prev) => ({ ...prev, mail: e }))
					}
					subject={"mail :"}
					placeholder={"votre adresse mail"}
				/>
				<Input
					type="password"
					value={loginData.password}
					sendToStore={(e) =>
						!(typeof e === "string")
							? ""
							: getLoginData((prev) => ({ ...prev, password: e }))
					}
					subject={"Mot de passe :"}
					customClass={""}
					placeholder={"votre mot de passe"}
				/>
			</div>
			<PrimaryButton
				subject={SendingDataState ? `Conexion...` : "Se connecter"}
				doIfConditionDoesNotPass={() => {
					_setErrorData({
						message: "Verifier que tout les champs sont remplis",
						error: "",
						hasError: false,
					});
					setTimeout(
						() =>
							_setErrorData({
								message: "",
								error: "",
								hasError: false,
							}),
						2000
					);
				}}
				conditionToPass={
					isMail(loginData.mail) && loginData.password.length > 3
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
							window.localStorage.setItem("zubu_token", e.token);
							window.localStorage.setItem("zubu_user_id", e.user._id);
							window.localStorage.setItem("zubu_user", JSON.stringify(e.user));
							window.localStorage.setItem("zubu_username", e.user.username);
							_setCurrentUser(e.user);
							_setSendingDataState(false);
							router.back();
							router.push("/");
							sendingData(false);
						},
					};
					sendToServer(sendToServerData);
				}}
			/>
		</>
	);
}

export function ErrorShower() {
	const [error] = userStore((store) => [store.status.errorData], shallow);
	return (
		<div className="text-red-600 w-full mx-5 txt_small"> {error.message} </div>
	);
}

export function Error() {
	const [error] = userStore((store) => [store.status.errorData], shallow);
	return <div className="text-red-600 w-full mx-5"> {error.error} </div>;
}
