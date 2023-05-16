import React from "react";
import background from "../../../components/images/auth_bg.png";
import zubuvector from "../../../components/images/logo.svg";
import { Login, Signup } from "../../../components/components/authCompenents";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function SignupRoute() {
	return (
		<main className="grid grid-cols-[1fr_2fr] max-lg:grid-cols-[1fr_1fr] max-md:grid-cols-[4fr_1fr] h-screem">
			<div className="h-full">
				<div className="ml-2.5 mt-2 flex items-center gap-1.5">
					<FaChevronLeft size={20} color="#123853" />
					<Link href="/" className="text-[#123853] font-normal">
						Accueil
					</Link>
				</div>
				<div className="h-4/5 mt-4 mx-8 flex flex-col justify-center gap-5 ">
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
					<div className="mb-5">
						<div className="text-[#123853] text-[20px] font-normal">
							Ravis de vous revoir, Connectez-vous
						</div>
						<div>
							Vous n&apos;avez pas encore compte ?{" "}
							<Link
								href="/user/auth/login"
								className="text-[#25a5c4] font-normal">
								Créez un compte
							</Link>{" "}
						</div>
					</div>
					<Login />{" "}
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${background.src})` }}
				className="bg-cover "></div>
		</main>
	);
}
