import React from "react";
import background from "../../../components/images/auth_bg.png";
import zubuvector from "../../../components/images/logo.svg";
import { Signup } from "../../../components/components/authCompenents";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function SignupRoute() {
	return (
		<main className="grid grid-cols-[1fr_2fr] max-md:grid-cols-[3fr_1fr] h-screem ">
			<div className="h-full">
				<div className="ml-2.5 mt-2 flex items-center gap-1.5">
					<FaChevronLeft size={20} color="#123853" />
					<Link href="/" className="text-[#123853] font-normal">
						Accueil
					</Link>
				</div>
				<div className="h-auto gap-3 mt-4 mx-8 flex flex-col">
					<h2 className="font-semibold text-[#123853] h-fit flex items-end justify-start gap-2.5">
						<Image
							src={zubuvector}
							width={100}
							height={100}
							className="h-[40px] w-[40px]  "
							alt="zubu logo vector"
						/>
						Zubu
					</h2>
					<div>
						<div className="text-[#123853] text-[20px] font-normal">
							Créer un compte et obtenez plus de privilège
						</div>
						<div>
							Avez déjà un compte ?{" "}
							<Link
								href="/user/auth/login"
								className="text-[#25a5c4] font-normal">
								Connectez-vous ici
							</Link>{" "}
						</div>
					</div>
					<Signup />{" "}
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${background.src})` }}
				className="bg-cover text-white p-[50px] flex flex-col gap-8 ">
				<h2 className="font-semibold">
					Voulez-vous en savoir plus sur Zubu ?{" "}
				</h2>
				<p className="w-3/5 max-md:w-full">
					Découvrez ce que fait zubu, les dernières propriétés mise en ligne,
					découvrez comment publier une propriété en location sur zubu
				</p>
				<span>
					<Link
						href="/zubu/about"
						className="border-0 pb-1 border-b font-normal border-b-white">
						Clicquez sur ce lien pour en savoir plus
					</Link>{" "}
					{"-->"}
				</span>
			</div>
		</main>
	);
}
