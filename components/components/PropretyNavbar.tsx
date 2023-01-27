import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LinkType {
	name: string;
	path: string;
}

function Path(props: LinkType) {
	return (
		<Link
			href={"#" + props.path}
			className={"m_right-20 w_max one_line_txt color_b text_dec_none"}>
			{props.name}
		</Link>
	);
}

export default function PropretyNavbar() {
	return (
		<div className="flex border-b pd-20 scroll_x scroll_hidden">
			<Path path={"internal"} name={"Intérieur"} />
			<Path path={"external"} name={"Extérieur"} />
			<Path path={"tenant"} name={"Charge du locataire"} />
			<Path path={"school"} name={"Écoles proches"} />
			<Path path={"transport"} name={"Transports"} />
			<Path path={"contacts"} name={"Contacts"} />
			<Path path={"historical"} name={"Historique"} />
		</div>
	);
}
