'use client';

import Image from 'next/image';
import { PT_Sans } from 'next/font/google';
import { useState } from 'react';
import GoogleSessionPill from '@/components/login/GoogleSessionPill';
import LoginForm from '@/components/login/LoginForm';
import RegisterForm from '@/components/login/RegisterForm';

const ptSans = PT_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section
      className={`${ptSans.className} flex flex-col md:flex-row min-h-screen`}
    >
      {/* Lado izquierdo */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8 bg-white">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">DeepPeru</h1>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? 'Inicia sesión para empezar a optimizar tu producción'
              : 'Crea tu cuenta y empieza hoy'}
          </p>
        </header>

        <div className="flex flex-col gap-6 w-full max-w-sm">
          {/* Formulario de Login/Registro */}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Divisor */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google OAuth */}
          <GoogleSessionPill />

          {/* Toggle entre Login y Register */}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin ? 'Crea una cuenta' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </main>

      {/* Lado derecho */}
      <aside className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <Image
          src="/loginImg.svg"
          width={420}
          height={420}
          alt="Ilustración de login"
          priority
        />
      </aside>
    </section>
  );
}
