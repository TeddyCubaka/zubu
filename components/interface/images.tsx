export interface GalleryImageProps {
	source: string;
	description: string;
	deleter: any;
	hiderDeleter?: boolean;
	changeCurrentStatus?: (status: string) => void;
}
