import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const respones = await fetch(`${PUBLIC_API_BASE_URL}/products/${params.slug}`);
	const payload = await respones.json();

	return {
		path: params.slug,
		data: payload.data
	};
};
