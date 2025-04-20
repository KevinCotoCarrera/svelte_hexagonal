import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
cloudinary.config({
	//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	cloud_name: 'dmitysaa8',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function listAllImages(folder = '') {
	const result = await cloudinary.api.resources({
		type: 'upload',
		prefix: folder,
		max_results: 100
	});

	return result.resources.map((r: { public_id: any; secure_url: any; created_at: any }) => ({
		public_id: r.public_id,
		url: r.secure_url,
		created_at: r.created_at
	}));
}
