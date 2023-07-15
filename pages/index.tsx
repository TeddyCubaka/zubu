import Head from "next/head";
import Footer from "../components/general/footer";
import Link from "next/link";
import Image from "next/image";
import logo from "../components/images/big_logo.svg";

export default function Home() {
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta
					name="description"
					content="Chercher un maison à louer à Kinshasa."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.svg" />
			</Head>
			<main>
				<div className="text-white bg-[#123853] flex flex-col sticky top-0 z-30 max-md:hidden">
					<div className="w-auto px-5 py-2 flex justify-between items-center">
						<div className="flex items-center gap-5 font-normal">
							<Link href="/">
								<Image src={logo} width="100" height="100" alt="logo du site" />
							</Link>
						</div>
					</div>
				</div>
				<div className="m-auto">
					<h1 className="font-medium">
						Ce site est en maintenance pour l&apos;instant 🥲
					</h1>
					<p>
						Contactez les développeur via ces coordonées :
						<ul>
							<li>telegram : +243 995 867 384</li>
						</ul>
					</p>
				</div>
				<Footer />
			</main>
		</>
	);
}
