export function didThisFilesSizePass(file: File): boolean {
	if (file.size > 5242881) return false;
	else return true;
}
