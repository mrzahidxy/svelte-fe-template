import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
    const res = await fetch(`${PUBLIC_API_BASE_URL}/products`);
    const paylaod = await res.json();

    return { data: paylaod.data.collection };
}