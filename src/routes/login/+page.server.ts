// src/routes/login/+page.server.js
import { auth as adminAuth } from '$lib/firebase-admin'; // Firebase Admin SDK
import { redirect, fail } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) {
            return fail(400, { success: false, message: 'Email and password are required.' });
        }

        try {
         
            const firebaseAuthEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${PUBLIC_API_KEY}`;

            const authResponse = await fetch(firebaseAuthEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            });

            const authData = await authResponse.json();

            if (!authResponse.ok) {
                // Handle Firebase Auth REST API errors
                let errorMessage = 'Login failed. Please check your credentials.';
                if (authData && authData.error && authData.error.message) {
                    switch (authData.error.message) {
                        case 'EMAIL_NOT_FOUND':
                        case 'INVALID_PASSWORD':
                            errorMessage = 'Invalid email or password.';
                            break;
                        default:
                            errorMessage = authData.error.message;
                    }
                }
                return fail(401, { success: false, message: errorMessage });
            }

            const idToken = authData.idToken;
            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

            // 2. Create a session cookie using Firebase Admin SDK
            const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

            // 3. Set the session cookie as an HTTP-only, secure cookie
            cookies.set('session', sessionCookie, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure in production
                maxAge: expiresIn / 1000, // maxAge in seconds
                sameSite: 'strict'
            });


        } catch (err) {
            console.error('Server-side login error:', err);
            return fail(500, { success: false, message: 'An unexpected server error occurred.' });
        }

        throw redirect(303, '/dashboard');
        
    },
    logout: async ({ cookies }) => {
        // Clear the session cookie on logout
        cookies.set('session', '', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // Immediately expire the cookie
            sameSite: 'strict'
        });
        throw redirect(303, '/login'); // Redirect to login page after logout
    }
};