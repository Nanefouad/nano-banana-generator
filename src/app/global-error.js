"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="fr">
      <body className="bg-[#121214] text-[#fafafa] flex min-h-screen items-center justify-center p-4 font-sans">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Une erreur est survenue</h2>
          <p className="text-sm text-[#a1a1aa]">
            {error?.message || "Une erreur inattendue est survenue lors de l'exécution."}
          </p>
          <button
            onClick={() => reset?.()}
            className="px-4 py-2 bg-[#87ea5c] text-black font-semibold rounded-xl text-xs hover:bg-[#79de4e] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
