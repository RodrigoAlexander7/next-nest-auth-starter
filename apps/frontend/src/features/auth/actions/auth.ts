'use server';

import { get } from 'http';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  redirect('/');
}
