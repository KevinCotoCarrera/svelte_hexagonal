// adapters/cloudinary/CloudinaryImageUploader.ts
import type { ImageUploaderPort } from '$lib/core/ports/ImageUploaderPort';

export class CloudinaryImageUploader implements ImageUploaderPort {
	constructor(private uploadPreset: string) {}

	async uploadImage(file: File): Promise<string> {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', this.uploadPreset);

		const res = await fetch('https://api.cloudinary.com/v1_1/dmitysaa8/image/upload', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		return data.secure_url;
	}
}
