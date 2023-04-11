export interface GalleryImageProps {
	source: string;
	description: string;
	deleter: any;
	changeCurrentStatus?: (status: string) => void;
}
