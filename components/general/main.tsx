import { useRouter } from "next/router";
import React, { useState } from "react";
import { shallow } from "zustand/shallow";
import { searchPropretiesStore } from "../../store/proprety";
import { PrimaryButton } from "../atoms/button";
import { GeneralInput } from "../atoms/form";
import background from "../images/backgournd.png";

function FilterPropretiesSearch() {
	const [searchValue, _setSearchValue] = useState<string>("");
	const [searchPropretiesWith] = searchPropretiesStore(
		(store) => [store._setWishedAddress],
		shallow
	);
	const [isValueEmpty, _setIsValueEmpty] = useState<boolean>(false);
	const router = useRouter();
	return (
		<div className="filter_card border-w_25 pd-5 br">
			<input
				type="text"
				name="address"
				className={
					"br m_right-10 no_border txt_normal pd_x-10 " +
					(isValueEmpty ? "wrong_value_of_input" : "")
				}
				style={{ height: "30px", width: "95%" }}
				placeholder="chercher une ville, un quartier, ..."
				onInput={(e) => _setSearchValue(e.currentTarget.value)}
				value={searchValue}
			/>
			<PrimaryButton
				conditionToPass={searchValue.length > 0}
				doOnClick={() => {
					searchPropretiesWith(searchValue);
					router.push("/proprety");
				}}
				notWidthMax
				subject="cherher"
				doIfConditionDoesNotPass={() => {
					if (isValueEmpty) {
						_setIsValueEmpty(false);
					} else {
						_setIsValueEmpty(true);
					}
					setTimeout(() => _setIsValueEmpty(false), 1100);
				}}
			/>
		</div>
	);
}

export default function Main() {
	return (
		<div
			className="main"
			style={{
				backgroundImage: `url(${background.src})`,
			}}>
			<div className="main_desc color_w">
				<h1 className="m_y-20">
					Bienvenue sur Zubu, un site qui met en avant votre bien immobilier
				</h1>
				<div className="m_y-20">
					Recherchez un bien, trouvez-le et fait de ça votre chez vous
				</div>
				<FilterPropretiesSearch />
			</div>
		</div>
	);
}
