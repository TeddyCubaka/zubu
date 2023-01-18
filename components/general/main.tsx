import React from "react";

export default function Main() {
	return (
		<div className="main">
			<div className="main_cover_picture"></div>
			<div className="main_desc color_w">
				<h1 className="m_y-20">
					Bienvenue sur Zubu, un site qui met en avant votre bien immobilier
				</h1>
				<div className="m_y-20">
					Recherchez un bien, trouvez-le et fait de ça votre chez vous
				</div>
				<div className="filter_card">
					<div className="br border-w m_y-20 pd-10">
						<span className="m_x-20">Type</span>
						<span className="m_x-20">Prix</span>
						<span className="m_x-20">Localisation</span>
						<span className="m_x-20">Ville</span>
						<span className="m_x-20">Pièces</span>
					</div>
					<button className="btn_p btn color_w br txt_normal m_x-20 ">Rechercher</button>
				</div>
			</div>
		</div>
	);
}
