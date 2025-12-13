'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/lib/apis';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value;
}

/**
 * Method to get the current user from the backend using the stored auth token.
 * Normalmente, el backend Nest expone un endpoint protegido (GET /users/me) que 
 * devuelve los datos del usuario basándose en el token JWT
 * 
export async function getCurrentUser() {
   const token = await getAuthToken();
   if (!token) {
      return null;
   }
   try {
      
   } catch (error) {

   }
}

*/

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server action to login with email and password
 * Sets httpOnly cookie on success and redirects to dashboard
 */
export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    // Call backend login endpoint
    const response = await api.post(`/auth/login`,credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { accessToken } = response.data

    // Validate token with backend
    try {
      await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('Token validation failed:', error);
      return {
        success: false,
        error: 'Token validation failed',
      };
    }

    // Set httpOnly cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to register a new user
 * Sets httpOnly cookie on success and redirects to dashboard
 */
export async function registerWithCredentials(
  data: RegisterData
): Promise<AuthResponse> {
  try {
    // Call backend register endpoint
    const response = await api.post(`/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { accessToken } = response.data;

    // Set httpOnly cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  redirect('/');
}
