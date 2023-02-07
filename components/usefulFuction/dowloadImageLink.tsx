export function getDownloadLink(link: string): string {
	let a = link.split("upload/");
	return a[0] + "upload/fl_attachment/" + a[1];
}
