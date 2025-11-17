import Image from 'next/image';
import { PT_Sans } from 'next/font/google';
import GoogleSessionPill from '@/components/login/GoogleSessionPill';

const ptSans = PT_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function Login() {
  return (
    <section
      className={`${ptSans.className} flex flex-col md:flex-row min-h-screen`}
    >
      {/* Lado izquierdo */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8 bg-white">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">DeepPeru</h1>
          <p className="text-gray-600 mt-2">
            Inicia sesión para ver lo mejor del Perú
          </p>
        </header>

        <div className="flex flex-col gap-4 max-w-sm">
          <GoogleSessionPill />
          <button className="text-blue-600 hover:underline text-sm">
            Crea una cuenta
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
