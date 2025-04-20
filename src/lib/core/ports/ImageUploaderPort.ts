// core/ports/ImageUploaderPort.ts
export interface ImageUploaderPort {
	uploadImage(file: File): Promise<string>; // returns image URL
}
