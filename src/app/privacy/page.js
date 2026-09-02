"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, Server, RefreshCw } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const lastUpdated = "2 septembre 2026";

  return (
    <div className="flex min-h-dvh flex-col opendesign-canvas-grid text-[#fafafa] select-none">
      
      {/* Privacy Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation / Back link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#a1a1aa] hover:text-[#87ea5c] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au Studio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-[#26262b] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#2c2c31] rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#87ea5c]" />
            <span className="text-[10px] font-mono font-medium text-[#87ea5c] uppercase tracking-wider">
              Engagement de Transparence
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa]">
            Politique de Confidentialité
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Dernière mise à jour : {lastUpdated}. Comment nous protégeons vos données personnelles, vos prompts et vos clés d&apos;API.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-8 text-xs text-[#a1a1aa] leading-relaxed">
          
          {/* Section 1 */}
          <section className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Database className="w-4 h-4 text-[#87ea5c]" />
              <h2>1. Collecte et Traitement des Données</h2>
            </div>
            <p>
              Dans le cadre de l&apos;utilisation d&apos;OpenImage Studio (Nano Banana Engine), nous collectons uniquement les informations nécessaires au bon fonctionnement de la plateforme :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d4d4d8]">
              <li><strong>Informations d&apos;authentification :</strong> Adresse e-mail et identifiant unique fournis lors de la connexion via Google OAuth.</li>
              <li><strong>Historique de génération :</strong> Vos prompts textuels, ratios d&apos;aspect choisis et URLs des artefacts visuels générés afin de vous permettre de les retrouver dans votre Galerie.</li>
              <li><strong>Solde de crédits et transactions :</strong> Suivi de vos acquisitions de packs de crédits traités de façon sécurisée par Stripe.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Lock className="w-4 h-4 text-[#87ea5c]" />
              <h2>2. Sécurité des Clés API (Mode BYOK - Bring Your Own Key)</h2>
            </div>
            <p>
              Si vous utilisez votre propre clé d&apos;API (MuAPI / Gemini / tiers) :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d4d4d8]">
              <li>Votre clé est conservée dans votre session sécurisée ou enregistrée dans votre compte de manière chiffrée.</li>
              <li>Elle n&apos;est transmise qu&apos;aux points de terminaison d&apos;exécution officiels nécessaires à la synthèse de vos images.</li>
              <li>Nous ne revendons, ne partageons et n&apos;analysons jamais vos clés API privées.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Eye className="w-4 h-4 text-[#87ea5c]" />
              <h2>3. Propriété Intellectuelle et Confidentialité des Créations</h2>
            </div>
            <p>
              Vous conservez l&apos;intégralité des droits et de la propriété intellectuelle sur les artefacts générés et les images téléchargées dans l&apos;espace de travail, conformément aux conditions des modèles d&apos;intelligence artificielle sous-jacents. Vos créations ne sont pas rendues publiques à des tiers sauf action explicite de votre part.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Server className="w-4 h-4 text-[#87ea5c]" />
              <h2>4. Sous-traitants et Services Tiers</h2>
            </div>
            <p>
              Pour délivrer nos services, nous faisons appel à des prestataires réputés garantissant un haut niveau de conformité (RGPD) :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d4d4d8]">
              <li><strong>Stripe :</strong> Gestion des paiements sécurisés avec conformité PCI-DSS. Nous ne stockons aucun numéro de carte bancaire.</li>
              <li><strong>Google Cloud & Auth :</strong> Authentification sécurisée OAuth 2.0.</li>
              <li><strong>MuAPI / Banana Engine :</strong> Infrastructure de calcul distribué pour l&apos;inférence de modèles d&apos;images.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <RefreshCw className="w-4 h-4 text-[#87ea5c]" />
              <h2>5. Vos Droits (Accès, Rectification, Suppression)</h2>
            </div>
            <p>
              Conformément à la réglementation sur la protection des données personnelles (RGPD), vous disposez à tout moment d&apos;un droit d&apos;accès, de rectification et de suppression totale de vos données et de vos artefacts générés.
            </p>
            <p className="text-[#d4d4d8]">
              Pour exercer vos droits ou pour toute question relative à la protection de vos données, vous pouvez contacter notre délégué à la protection des données via le support de la plateforme.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
