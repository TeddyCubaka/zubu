export function isMail(mail: string): boolean {
	const splitByArobase: string[] = mail.split("@");
	if (splitByArobase.length !== 2) return false;
	if (splitByArobase[1].split(".").length !== 2) return false;
	else return true;
}
