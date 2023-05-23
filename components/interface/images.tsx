export interface GalleryImageProps {
	source: string;
	description: string;
	deleter: any;
	downloadBtn?: boolean;
	hiderDeleter?: boolean;
	changeCurrentStatus?: (status: string) => void;
}
