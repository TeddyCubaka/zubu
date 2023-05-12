import Link from "next/link";

export default function SomethingWentWrong() {
	return (
		<div className="w-3/5 text-left max-md:w-full max-md:mx-5">
			<p>Une erreur s&apos;est produite, veuillez réessayer plus tard.😢</p>
			<p>
				Vérifiez votre connexion ou sinon faites-nous part de ce problème et
				nous nous chargerons de le régler afin de vous mettre allaise.😃
			</p>
			<p>
				😉 Remplissez simplement ce petit{" "}
				<Link href="/zubu/problem/report" className="text-[#25a5c4] underline">
					formulaire
				</Link>{" "}
				.
			</p>
		</div>
	);
}
