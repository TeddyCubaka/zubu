import React from "react";
import {
	GetAddress,
	GetLosor,
	GetPrice,
	GetPropretyType,
	ViewInformationPuted,
} from "./PrpretysData";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { SecondaryButton } from "../atoms/button";
import { useRouter } from "next/router";

export default function AddPropretiyForm() {
	const [sendingData, databaseResponseStatus, _id] = publicationStore(
		(store) => [store.sendingData, store.databaseResponseStatus, store._id],
		shallow
	);
	const router = useRouter();
	return (
		<div className="mx-[30px] rounded border-2 border-blue h-full">
			{sendingData ? <span className="loader_like_google"></span> : ""}
			{databaseResponseStatus == "created" ? (
				<div className="flex flex-col p-5 gap-6">
					<h4 className="font-medium">🎉 Super, la création a réussie</h4>
					<span>
						La propriété a été créée avec succès. Pour l'instant il n'est que
						visible par vous même.
					</span>
					<span>
						Votre propriété est en évaluation et sera mise qu'une fois validée.
						Cela peut prendre jusqu'à 24h. Entre temps profitez-en pour mettre à
						jour les informations sur votre propriété pour en reseignez plus aux
						prétendants locataire. Clickez{" "}
						<Link
							className="font-medium text-[#25a5c4] underline "
							href={"/proprety/update/" + _id}>
							ici
						</Link>{" "}
						pour continuer à mettre à jour vos informations.
					</span>
					<SecondaryButton
						conditionToPass={true}
						doOnClick={() => router.push("/proprety/update/" + _id)}
						fullRounded
						subject="Continuez la publication"
					/>
				</div>
			) : (
				""
			)}
			{!(databaseResponseStatus == "not created") ? (
				<div className="flex flex-col p-5 gap-5">
					<h4 className="font-medium">😢 Quelque chose s'est male passée</h4>
					<span>
						Nous somme désolé. La création de la propriété n'a pas réussie .
					</span>
					<span>
						Si vous souhaitez réessayer appuyez{" "}
						<span className="font-normal text-[#25a5c4] underline">ici</span> ou
						sinon{" "}
						<span className="font-normal text-[#25a5c4] underline">
							rentrer à la page d'accueil
						</span>{" "}
						et réssayer ultérieurement
					</span>
				</div>
			) : (
				""
			)}
			{!(databaseResponseStatus !== ("created" || "not created")) ? (
				<div className="p-5 flex flex-col gap-6">
					<div>
						Renseigner les informations de base sur votre propriété. Cela nous
						permet de filtrer les mauvaises informations et les propriétés
						inutiles.
					</div>
					<div>
						<strong>Note</strong> : ceci n’est pas encore la phase finale pour
						publier. Cela doit passer par une validation.
					</div>
					{sendingData ? (
						<div className="min-h-[320px] flex items-center justify-center m-0">
							Création de la propriété. Veuiller patientez, s&apos;il vous plait
						</div>
					) : (
						<>
							<GetAddress />
							<GetPropretyType />
							<GetLosor />
							<GetPrice />
							<ViewInformationPuted />
						</>
					)}
				</div>
			) : (
				""
			)}
		</div>
	);
}
