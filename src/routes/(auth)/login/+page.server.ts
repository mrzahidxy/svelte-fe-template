import type { Actions } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/loginSchema';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';



export const load = async () => {
    // Initialize empty form with validation schema
    const loginForm = await superValidate(zod(loginSchema));
    return { loginForm };
};

export const actions = {
    default: async ({ request }) => {
        const loginForm = await superValidate(request, zod(loginSchema));

        if (!loginForm.valid) return fail(400, { loginForm });

        try {
            const response = await axios.post(PUBLIC_API_BASE_URL + '/auth/login', loginForm.data);
            const token = response.data.data.token;
            return message(loginForm, token);
        } catch (error) {
            console.error(error);
            return fail(401, { loginForm, message: 'Invalid credentials' });
        }
    }
} satisfies Actions;