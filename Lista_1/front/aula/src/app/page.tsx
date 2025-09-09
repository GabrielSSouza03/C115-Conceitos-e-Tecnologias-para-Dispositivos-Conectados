import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Quiz App
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Teste seus conhecimentos com nosso quiz interativo de conhecimentos gerais
        </p>
        <Link 
          href="/perguntas"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Começar Quiz
        </Link>
      </div>
    </div>
  );
}