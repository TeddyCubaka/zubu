export interface ButtonProps {
	subject: string;
	conditionToPass: boolean;
	doOnClick: () => any;
}

export function PrimaryButton(props: ButtonProps) {
	return (
		<button
			type="button"
			className={
				props.conditionToPass
					? "btn_p color_w br txt_normal btn w_max flex_center-xy one_line_txt"
					: "btn_p_not_active color_w br txt_normal btn w_max flex_center-xy one_line_txt"
			}
			onClick={() => {
				if (props.conditionToPass) {
					props.doOnClick();
				}
			}}>
			{props.subject}
		</button>
	);
}
