import React, { useState, useEffect } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { InputHasDetails, InputLabelLess } from "../atoms/form";
import { PrimaryButton, SecondaryButton } from "../atoms/button";
import SetCurrency from "../atoms/currencyButtons";
import { uploadImage } from "../usefulFuction/requests";
import { FcAddImage } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

interface RentalPrice {
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}

interface Address {
	number: string;
	avenue: string;
	quoter: string;
	township: string;
	city: string;
}

export function GetAddress() {
	const [setAddres, address] = publicationStore(
		(state) => [state.setAddress, state.address],
		shallow
	);
	const [addressSplited, setAddressSplited] = useState<Address>({
		number: address.split("/")[0] || "",
		avenue: address.split("/")[1] || "",
		quoter: address.split("/")[2] || "",
		township: address.split("/")[3] || "",
		city: address.split("/")[4] || "",
	});

	const validator = (string: string) => (string.length > 0 ? string + "/" : "");

	useEffect(() => {
		setAddres(
			validator(addressSplited.number) +
				validator(addressSplited.avenue) +
				validator(addressSplited.city) +
				validator(addressSplited.quoter) +
				(addressSplited.township.length > 0
					? addressSplited.township
					: "//////////")
		);
	}, [
		addressSplited.avenue,
		addressSplited.city,
		addressSplited.number,
		addressSplited.quoter,
		addressSplited.township,
		setAddres,
	]);

	return (
		<div className="flex flex-col flex-wrap gap-2">
			<label>
				Address <span className="text-red-600">*</span>
			</label>
			<div className="flex flex-wrap gap-2.5 items-center">
				<InputLabelLess
					value={addressSplited.number}
					sendToStore={(e) => {
						typeof e == "number"
							? ""
							: setAddressSplited((prev) =>
									Number(e) || e === "" ? { ...prev, number: e } : { ...prev }
							  );
					}}
					subject={"N° : "}
					maxLength={4}
					customClass={" w-[60px] flex-none"}
					placeholder={"n°.."}
				/>
				<InputLabelLess
					value={addressSplited.avenue}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, avenue: e }))
					}
					subject="avenue ou rue : "
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner l'avenue"
				/>
				<InputLabelLess
					value={addressSplited.quoter}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, quoter: e }))
					}
					subject={"quartier : "}
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner le quartier"
				/>
				<InputLabelLess
					value={addressSplited.township}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, township: e }))
					}
					subject=""
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner la commune"
				/>
				<InputLabelLess
					value={addressSplited.city}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, city: e }))
					}
					subject=""
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner la ville"
				/>
			</div>
		</div>
	);
}

export function GetPropretyType() {
	const [setPropretyType, propretyType] = publicationStore(
		(state) => [state.setPropretyType, state.RentalType],
		shallow
	);
	const propretyTypeChoices = [
		"maison meublée",
		"maison vide",
		"appartement",
		"commerce",
		"bureau",
	];

	return (
		<div className="flex flex-col gap-2">
			<label>
				Type du bien <span className="text-red-600">*</span>
			</label>
			<InputHasDetails
				detailsData={propretyTypeChoices}
				store={propretyType}
				sendToStore={setPropretyType}
			/>
		</div>
	);
}

export function GetLosor() {
	const [setLessor, lessor] = publicationStore(
		(state) => [state.setLessor, state.lessor],
		shallow
	);

	return (
		<>
			<div className="flex flex-col gap-2">
				<label>
					Identité du bailleur ( nom et postnom ){" "}
					<span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={lessor.fullName}
					sendToStore={(e) => {
						typeof e == "number" ? "" : setLessor({ ...lessor, fullName: e });
					}}
					subject={"Nom complet : "}
					customClass={"w-full"}
					placeholder={"nom du bailleur ici"}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label>
					Contact du bailleur <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={lessor.contacts}
					sendToStore={(e) => {
						typeof e == "number" ? "" : setLessor({ ...lessor, contacts: e });
					}}
					maxLength={12}
					subject={"numéro de téléphone ou mail : "}
					customClass={"w-full"}
					placeholder="Ex : +243 990 000 000 ou user@gmail.com"
				/>
			</div>
		</>
	);
}

export function GetPrice() {
	const [setRentalPrice, rentalPrice] = publicationStore(
		(state) => [state.setRentalPrice, state.rentalPrice],
		shallow
	);

	return (
		<>
			<div className="flex flex-col gap-2">
				<label>
					Prix du loyer <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={rentalPrice.price}
					sendToStore={(e) => {
						typeof e == "number"
							? ""
							: setRentalPrice({
									...rentalPrice,
									price: Number(e) || e === "" ? e : rentalPrice.price,
							  });
					}}
					subject=""
					customClass={"w-full"}
					placeholder="Ex : 300 ou 600 000">
					<SetCurrency
						monetaryCurrency={rentalPrice.monetaryCurrency}
						setRentalCurrency={(text) =>
							setRentalPrice({
								...rentalPrice,
								monetaryCurrency: text,
							})
						}
					/>
				</InputLabelLess>
				{/* />(e) => setRentalPrice() */}
			</div>
			<div className="flex flex-col gap-2 ">
				<label>
					Nombre de mois de la garantie <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={rentalPrice.guaranteeValue}
					maxLength={2}
					sendToStore={(e) =>
						setRentalPrice({
							...rentalPrice,
							guaranteeValue:
								Number(e) || e === "" ? e + "" : rentalPrice.guaranteeValue,
						})
					}
					subject={"Nom complet : "}
					customClass={"w-full"}
					placeholder="Ex : 4"
				/>
			</div>
		</>
	);
}

export function GetCoverPicture() {
	const [coverPicture, _setCoverPicture, _setCoverPictureAsFile] =
		publicationStore(
			(store) => [
				store.coverPicture,
				store._setCoverPicture,
				store._setCoverPictureAsFile,
			],
			shallow
		);
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				Ajoutez un photo de couverture
				{coverPicture ? (
					<button
						className="flex items-center p-2.5 text-sm w-fit rounded-full text-[#123853] border-2 border-[#123853] hover:bg-[#123853] hover:text-white hover:transition-all hover:duration-200"
						onClick={() => _setCoverPicture("")}>
						Effacer <MdDelete size={18} />{" "}
					</button>
				) : (
					<span className="text-right flex-1 text-sm">
						Appuiez sur l&apos;icône en bas pour choisir une photo.
					</span>
				)}
			</div>
			<label
				htmlFor="cover_picture"
				className="w-full h-[200px] bg-contain bg-no-repeat bg-center  bg-white border-2 flex justify-center items-center"
				style={{ backgroundImage: `URL(${coverPicture})` }}>
				{coverPicture === "" ? <FcAddImage size={40} /> : ""}
				<input
					type="file"
					id="cover_picture"
					className="hidden"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files) {
							_setCoverPicture(URL.createObjectURL(e.target.files[0]));
							_setCoverPictureAsFile(e.target.files[0]);
						}
					}}
				/>
			</label>
		</div>
	);
}

export function ViewInformationPuted() {
	const publish = publicationStore();
	function lengthVerificator(arr: string[]): boolean {
		if (arr.filter((str) => str.toString().length > 0).length === arr.length)
			return true;
		else return false;
	}
	const postDataToServer = () => {
		publish.setDatabaseResponseStatus("");
		if (
			lengthVerificator([
				publish.address,
				publish.rentalPrice.guaranteeValue,
				publish.rentalPrice.price,
			])
		) {
			publish._setSendingData(true);
			uploadImage({
				file: publish.coverPictureAsFile,
				getStatus: () => {},
				getUrl: () => {},
				clearFileFunction: () => {},
				getImage: () => {},
				doAfterResponse: (data) => {
					axios({
						method: "post",
						url: process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("zubu_token"),
						},
						data: {
							owner: localStorage.getItem("zubu_user_id"),
							rentalInformation: {
								address: publish.address,
								RentalType: publish.RentalType,
								lessor: publish.lessor,
								coverPicture: data.url,
								price: publish.rentalPrice.price,
								guaranteeValue: publish.rentalPrice.guaranteeValue,
								monetaryCurrency: publish.rentalPrice.monetaryCurrency,
							},
						},
					})
						.then((res) => {
							publish.setDatabaseResponseStatus("created");
							publish.set_id(res.data.data._id);
							publish._setSendingData(false);
						})
						.catch((err) => {
							publish.setDatabaseResponseStatus("not created");
							publish._setSendingData(false);
							console.log(err);
						});
				},
			});
		}
	};

	return (
		<>
			<PrimaryButton
				conditionToPass={lengthVerificator([
					publish.address,
					publish.rentalPrice.guaranteeValue,
					publish.rentalPrice.price,
				])}
				doOnClick={() => {
					postDataToServer();
					publish.setCount();
				}}
				subject="Publier le bien"
				doIfConditionDoesNotPass={() => {}}
			/>
		</>
	);
}
