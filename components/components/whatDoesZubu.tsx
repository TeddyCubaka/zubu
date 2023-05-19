import React, { ReactElement } from "react";
import patener from "../images/patener_illust.svg";
import lessor from "../images/lessor_illust.svg";
import Image from "next/image";
import { SecondaryButton } from "../atoms/button";
import { useRouter } from "next/router";

interface WhatCardProps {
	image: {
		src: string;
		alt: string;
	};
	text: string;
	title: string;
	children: ReactElement;
}

function WhatCard({ image, title, text, children }: WhatCardProps) {
	return (
		<div className="border border-[#123853] rounded max-w-[410px] h-fit min-h-[400px] max-md:min-h-fit p-8 max-md:p-5 flex flex-col justify-between gap-2 items-center max-md:mx-2.5">
			<div className="h-fit">
				<Image
					src={image.src}
					className="h-[120px]"
					height={300}
					width={300}
					alt={image.alt}
				/>
			</div>
			<h3 className="font-medium"> {title} </h3>
			<div className="font-md"> {text} </div>
			{children}
		</div>
	);
}

export default function WhatDoesZubu() {
	const router = useRouter();
	return (
		<div className="text-center my-10">
			<h2 className="font-semibold mb-5">Qu’est-ce que nous faisons ?</h2>
			<div className=" flex justify-evenly max-md:flex-col max-md:items-center max-md:gap-5 ">
				<WhatCard
					image={{ src: lessor, alt: "illustration fictif d'un lessor" }}
					text="Cherchez-vous des locataires et vous n’avez pas assez de temps ?
                Publiez tout simplement votre bien sur notre plateforme et nous allons nous occuper de vous trouver un locataire.
                Économisez votre temps"
					title="Vous êtes bailleur d’un bien immobilier ?">
					<SecondaryButton
						fullWidthOnMobile
						conditionToPass={1 == 1}
						doOnClick={() => router.push("/proprety/publication")}
						notWidthMax
						subject="Publier un bien"
						doIfConditionDoesNotPass={() => {}}
					/>
				</WhatCard>
				<WhatCard
					image={{
						src: patener,
						alt: "illustration fictive de deux hommes d'affaire",
					}}
					title="Vous aimez ce que nous faisons ?"
					text="Nous voulons allez plus loin. Nous tous, avons des rêves. Le nôtre est d’aider les congolais à se détacher de cette charge qui pèse tant, celle de chercher un toîl à louer.
                Vous voulez nous aider à simplifié la recherche des biens imobiliers en location aux congolais ? Devenez notre partenaire.">
					<SecondaryButton
						fullWidthOnMobile
						conditionToPass={1 == 1}
						doOnClick={() => router.push("/zubu/partner")}
						notWidthMax
						subject="Devenir partenaire"
						doIfConditionDoesNotPass={() => {}}
					/>
				</WhatCard>
			</div>
		</div>
	);
}
