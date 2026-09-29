import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Server,
  RefreshCw,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de Confidentialité | OpenImage Studio (image.soook.fr)",
  description:
    "Découvrez comment OpenImage Studio (image.soook.fr) protège vos données personnelles, prompts, clés API et créations d'images conformément au RGPD.",
  alternates: {
    canonical: "https://image.soook.fr/privacy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Politique de Confidentialité | OpenImage Studio",
    description:
      "Protection des données personnelles, sécurité des clés API en mode BYOK et conformité RGPD sur OpenImage Studio (image.soook.fr).",
    url: "https://image.soook.fr/privacy",
    siteName: "OpenImage",
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de Confidentialité - OpenImage Studio",
    description:
      "Engagement de confidentialité, transparence et protection des données personnelles sur OpenImage Studio.",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "29 septembre 2026";
  const effectiveDate = "2026-09-29";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://image.soook.fr/privacy#webpage",
        "url": "https://image.soook.fr/privacy",
        "name": "Politique de Confidentialité - OpenImage Studio",
        "description":
          "Politique de protection des données personnelles et de respect de la vie privée d'OpenImage Studio sur le domaine image.soook.fr.",
        "inLanguage": "fr-FR",
        "datePublished": "2026-09-02",
        "dateModified": effectiveDate,
        "publisher": {
          "@type": "Organization",
          "name": "OpenImage Studio",
          "url": "https://image.soook.fr",
          "logo": "https://image.soook.fr/favicon.ico",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://image.soook.fr/privacy#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://image.soook.fr",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Politique de Confidentialité",
            "item": "https://image.soook.fr/privacy",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://image.soook.fr/privacy#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quelles données personnelles sont collectées par OpenImage Studio ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "OpenImage Studio collecte uniquement les informations essentielles : identifiant et e-mail issus de Google OAuth, historique des prompts et des artefacts générés pour votre galerie, ainsi que les transactions Stripe. Vos données bancaires ne transitent jamais sur nos serveurs.",
            },
          },
          {
            "@type": "Question",
            "name": "Mes prompts ou mes images générées sont-ils utilisés pour entraîner des modèles d'IA ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non. Vos prompts, paramètres de génération et artefacts visuels restent votre propriété exclusive et ne sont ni revendus, ni exploités pour entraîner des modèles publics sans votre consentement exprès.",
            },
          },
          {
            "@type": "Question",
            "name": "Comment mes clés API (Mode BYOK) sont-elles protégées ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En mode Bring Your Own Key (BYOK), vos clés API privées sont chiffrées au repos et utilisées strictement pour acheminer vos requêtes vers les points d'inférence autorisés. Elles ne sont jamais partagées ni analysées.",
            },
          },
          {
            "@type": "Question",
            "name": "Comment puis-je exercer mes droits RGPD (suppression, accès, rectification) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Conformément au RGPD, vous pouvez demander l'accès, la rectification ou l'effacement définitif de votre compte et de vos images générées à tout moment en contactant privacy@soook.fr.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="h-full overflow-y-auto opendesign-canvas-grid text-[#fafafa] flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl w-full mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation / Back link */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#a1a1aa] hover:text-[#87ea5c] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au Studio OpenImage</span>
            </Link>

            <Link
              href="/terms"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#87ea5c] hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Consulter les Conditions d&apos;Utilisation</span>
            </Link>
          </div>

          <div className="space-y-3 border-b border-[#26262b] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#2c2c31] rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#87ea5c]" />
              <span className="text-[10px] font-mono font-medium text-[#87ea5c] uppercase tracking-wider">
                Protection des Données &bull; Norme RGPD / GDPR
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fafafa]">
              Politique de Confidentialité
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
              Dernière mise à jour : <strong className="text-[#fafafa]">{lastUpdated}</strong>.
              Protection intégrale de votre vie privée, de vos prompts, de vos clés d&apos;API et de vos artefacts visuels sur le service <strong className="text-[#87ea5c]">image.soook.fr</strong>.
            </p>
          </div>
        </header>

        {/* TL;DR Summary Box for High Google E-E-A-T & User Experience */}
        <section
          aria-label="Résumé de la politique"
          className="bg-[#18181b]/90 border border-[#87ea5c]/30 rounded-2xl p-5 sm:p-6 space-y-3 shadow-lg shadow-[#87ea5c]/5"
        >
          <div className="flex items-center gap-2 text-[#87ea5c] font-semibold text-xs sm:text-sm uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>En résumé : vos garanties de confidentialité</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#a1a1aa] pt-1">
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Zéro revente de données</span>
              <p>Vos prompts, créations et coordonnées ne sont jamais vendus ni commercialisés à des régies publicitaires.</p>
            </div>
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Sécurité BYOK étanche</span>
              <p>Vos clés d&apos;API personnelles restent chiffrées et ne servent qu&apos;à l&apos;exécution directe de vos requêtes.</p>
            </div>
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Conformité RGPD totale</span>
              <p>Droit d&apos;accès, de téléchargement et d&apos;effacement immédiat de l&apos;ensemble de vos créations et comptes.</p>
            </div>
          </div>
        </section>

        {/* Table of contents for SEO & Anchor Navigation */}
        <nav
          aria-label="Sommaire de la politique de confidentialité"
          className="bg-[#121214] border border-[#2c2c31] rounded-2xl p-5 space-y-3"
        >
          <h2 className="text-xs uppercase font-mono tracking-wider text-[#a1a1aa] font-bold">
            Sommaire des chapitres
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d4d4d8]">
            <a href="#collecte" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">01.</span> Données Collectées &amp; Traitements
            </a>
            <a href="#finalites" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">02.</span> Bases Légales &amp; Finalités
            </a>
            <a href="#byok" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">03.</span> Sécurité des Clés API (BYOK)
            </a>
            <a href="#propriete" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">04.</span> Propriété des Créations &amp; IA
            </a>
            <a href="#sous-traitants" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">05.</span> Sous-traitants &amp; Stripe
            </a>
            <a href="#cookies" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">06.</span> Cookies &amp; Stockage Local
            </a>
            <a href="#conservation" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">07.</span> Durée de Conservation
            </a>
            <a href="#droits-rgpd" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">08.</span> Vos Droits (RGPD)
            </a>
            <a href="#securite" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">09.</span> Sécurité de l&apos;Infrastructure
            </a>
            <a href="#faq" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">10.</span> Questions Fréquentes (FAQ)
            </a>
          </div>
        </nav>

        {/* Detailed Legal Sections */}
        <div className="space-y-8 text-xs text-[#a1a1aa] leading-relaxed">
          {/* Section 1 */}
          <section id="collecte" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Database className="w-4 h-4 text-[#87ea5c]" />
              <h2>1. Collecte et Nature des Données Traitées</h2>
            </div>
            <p>
              Dans le cadre de l&apos;utilisation d&apos;<strong>OpenImage Studio</strong> accessible à l&apos;adresse{" "}
              <code className="text-[#87ea5c] font-mono bg-[#121214] px-1.5 py-0.5 rounded border border-[#2c2c31]">
                https://image.soook.fr
              </code>
              , nous appliquons le principe fondamental de minimisation des données (Article 5 du RGPD). Nous ne collectons strictement que les données indispensables à la fourniture du service :
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-[#d4d4d8]">
              <li>
                <strong>Données d&apos;authentification et d&apos;identité :</strong> Adresse e-mail, nom public et identifiant de compte transmis lors de la connexion via Google OAuth 2.0.
              </li>
              <li>
                <strong>Données d&apos;utilisation et d&apos;artefacts :</strong> Prompts textuels saisis, paramètres techniques sélectionnés (ratio d&apos;aspect, résolution 1K/2K/4K, modèle de synthèse), horodatage de génération et liens vers les artefacts visuels stockés dans votre Galerie privée.
              </li>
              <li>
                <strong>Données de transaction et solde :</strong> Solde de vos crédits de génération, historique d&apos;achats de packs de crédits et identifiants de sessions de paiement Stripe. Nous ne traitons, ne visualisons et ne stockons à aucun moment votre numéro de carte bancaire ou code cryptographique CVV.
              </li>
              <li>
                <strong>Données techniques de connexion :</strong> Adresse IP, type de navigateur, horodatage des requêtes HTTP à des fins de sécurité contre les abus et le déni de service (DDoS).
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="finalites" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <FileText className="w-4 h-4 text-[#87ea5c]" />
              <h2>2. Finalités et Bases Légales du Traitement</h2>
            </div>
            <p>Les traitements de données mis en œuvre par OpenImage Studio reposent sur les bases juridiques suivantes :</p>
            <div className="space-y-2.5 text-[#d4d4d8]">
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Exécution du contrat (Art. 6.1.b du RGPD) :</strong>
                Fourniture du service de génération d&apos;images, gestion du compte utilisateur, décompte des crédits et affichage de la galerie personnelle.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Intérêt légitime (Art. 6.1.f du RGPD) :</strong>
                Sécurisation de la plateforme, prévention de la fraude, monitoring des performances et optimisation de l&apos;expérience utilisateur.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Obligations légales (Art. 6.1.c du RGPD) :</strong>
                Conservation des factures et preuves comptables d&apos;achat conformément à la réglementation fiscale en vigueur.
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="byok" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Lock className="w-4 h-4 text-[#87ea5c]" />
              <h2>3. Sécurité des Clés API en Mode BYOK (Bring Your Own Key)</h2>
            </div>
            <p>
              OpenImage Studio propose une option innovante sans surcoût plateforme appelée <em>BYOK Direct</em>. Si vous décidez de renseigner votre propre clé d&apos;API de modèle :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d4d4d8]">
              <li>Votre clé est chiffrée selon les standards industriels AES-256 en transit et au repos.</li>
              <li>La clé n&apos;est jamais exposée publiquement et est injectée de manière sécurisée uniquement lors des appels d&apos;inférence serveur vers le moteur spécifié.</li>
              <li>Nous ne procédons à aucune journalisation permanente de vos clés privées dans les logs applicatifs.</li>
              <li>Vous conservez à tout moment la faculté de révoquer ou supprimer cette clé depuis vos paramètres ou chez votre fournisseur d&apos;API source.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="propriete" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Eye className="w-4 h-4 text-[#87ea5c]" />
              <h2>4. Propriété des Créations, Confidentialité des Prompts &amp; Modèles d&apos;IA</h2>
            </div>
            <p>
              Nous défendons la stricte souveraineté de vos créations graphiques et de vos instructions créatives :
            </p>
            <div className="space-y-2 text-[#d4d4d8]">
              <p>
                <strong>Propriété exclusive :</strong> Sous réserve des conditions de licence des modèles d&apos;intelligence artificielle sous-jacents, vous disposez des droits d&apos;usage complets, y compris commerciaux, sur les images générées via votre compte.
              </p>
              <p>
                <strong>Non-entraînement de modèles tiers :</strong> OpenImage Studio s&apos;interdit formellement d&apos;utiliser vos prompts confidentiels ou vos images privées générées pour entraîner des modèles de fondation ouverts ou commerciaux sans votre accord préalable écrit.
              </p>
              <p>
                <strong>Visibilité privée par défaut :</strong> Vos artefacts générés dans la Galerie ne sont accessibles qu&apos;à vous via votre session authentifiée, sauf si vous choisissez délibérément de partager le lien public d&apos;un artefact.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sous-traitants" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Server className="w-4 h-4 text-[#87ea5c]" />
              <h2>5. Sous-traitants Certifiés et Hébergement</h2>
            </div>
            <p>
              Pour assurer une haute disponibilité et un niveau de sécurité optimal, nous collaborons avec des prestataires d&apos;infrastructure de premier rang :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#d4d4d8]">
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31] space-y-1">
                <span className="text-[#fafafa] font-semibold">Stripe Inc.</span>
                <p className="text-[11px] text-[#a1a1aa]">
                  Paiement sécurisé certifié PCI-DSS Niveau 1. Données de carte chiffrées de bout en bout.
                </p>
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31] space-y-1">
                <span className="text-[#fafafa] font-semibold">Google Cloud Platform</span>
                <p className="text-[11px] text-[#a1a1aa]">
                  Authentification OAuth 2.0 sécurisée et hébergement cloud conforme ISO 27001 et SOC 2.
                </p>
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31] space-y-1">
                <span className="text-[#fafafa] font-semibold">Vercel Inc.</span>
                <p className="text-[11px] text-[#a1a1aa]">
                  Réseau Edge mondial de distribution haute vitesse, protection DDoS et déploiement serverless.
                </p>
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31] space-y-1">
                <span className="text-[#fafafa] font-semibold">Banana Engine / MuAPI</span>
                <p className="text-[11px] text-[#a1a1aa]">
                  Clusters de calcul GPU spécialisés pour l&apos;inférence de modèles de diffusion d&apos;images haute précision.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="cookies" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Shield className="w-4 h-4 text-[#87ea5c]" />
              <h2>6. Cookies, Traceurs et Stockage Local</h2>
            </div>
            <p>
              OpenImage Studio respecte votre tranquillité numérique. Nous n&apos;utilisons aucun cookie de ciblage publicitaire ni aucun traceur intrusif de réseaux sociaux tiers.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d4d4d8]">
              <li>
                <strong>Cookies de session nécessaires :</strong> Jetons sécurisés d&apos;authentification NextAuth (<code>__Secure-next-auth.session-token</code>) assurant la persistance de votre session connectée.
              </li>
              <li>
                <strong>Stockage Local (Local Storage) :</strong> Mémorisation de vos préférences visuelles de studio (format de ratio, thème sombre, état d&apos;affichage de la galerie).
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="conservation" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <RefreshCw className="w-4 h-4 text-[#87ea5c]" />
              <h2>7. Durée de Conservation des Données</h2>
            </div>
            <p>
              Vos données sont conservées uniquement pendant la durée nécessaire aux finalités poursuivies :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d4d4d8]">
              <li>
                <strong>Compte actif :</strong> Les données de compte et l&apos;historique de votre Galerie sont conservés tant que votre compte demeure actif.
              </li>
              <li>
                <strong>Comptes inactifs :</strong> Après 24 mois d&apos;inactivité totale sans reconnexion, une notification de purge préalable vous est adressée avant archivage.
              </li>
              <li>
                <strong>Données comptables :</strong> Les factures d&apos;achat de packs de crédits sont archivées pendant une durée de 10 ans conformément aux exigences légales du Code de Commerce.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="droits-rgpd" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#87ea5c]" />
              <h2>8. Vos Droits sous le RGPD et Modalités d&apos;Exercice</h2>
            </div>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD 2016/679) et à la loi Informatique et Libertés modifiée, vous bénéficiez des droits suivants :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#d4d4d8]">
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong>Droit d&apos;accès et de copie :</strong> Obtenir la confirmation et une copie lisible de l&apos;ensemble de vos données enregistrées.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong>Droit de rectification :</strong> Corriger des informations inexactes ou incomplètes.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong>Droit à l&apos;effacement (&quot;Droit à l&apos;oubli&quot;) :</strong> Supprimer définitivement votre compte, historique de prompts et images.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong>Droit à la portabilité :</strong> Exporter vos images et métadonnées dans un format structuré et couramment utilisé.
              </div>
            </div>
            <p className="pt-2">
              Pour exercer l&apos;un quelconque de ces droits, adressez votre demande accompagnée de votre identifiant utilisateur à :{" "}
              <a
                href="mailto:privacy@soook.fr"
                className="text-[#87ea5c] underline font-medium hover:text-[#a2f280]"
              >
                privacy@soook.fr
              </a>{" "}
              ou{" "}
              <a
                href="mailto:contact@soook.fr"
                className="text-[#87ea5c] underline font-medium hover:text-[#a2f280]"
              >
                contact@soook.fr
              </a>
              . Nous répondons sous 30 jours ouvrés maximum. Vous conservez également le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés - cnil.fr).
            </p>
          </section>

          {/* Section 9 */}
          <section id="securite" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Lock className="w-4 h-4 text-[#87ea5c]" />
              <h2>9. Mesures de Sécurité Techniques et Organisationnelles</h2>
            </div>
            <p>
              La sécurité d&apos;OpenImage Studio repose sur une approche multicouche :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d4d4d8]">
              <li>Chiffrement systématique de toutes les communications via HTTPS avec protocole TLS 1.3.</li>
              <li>Isolation étanche des contextes d&apos;exécution d&apos;utilisateurs et limitation stricte des accès aux bases de données.</li>
              <li>Politique stricte de clés secrètes protégées côté serveur (aucun secret sensible n&apos;est divulgué au navigateur client).</li>
              <li>Surveillance en temps réel des flux de requêtes pour parer à toute intrusion ou attaque par déni de service.</li>
            </ul>
          </section>

          {/* Section 10 - FAQ for Google SEO Rich Snippets */}
          <section id="faq" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <HelpCircle className="w-4 h-4 text-[#87ea5c]" />
              <h2>10. Foire Aux Questions (FAQ) - Confidentialité &amp; Sécurité</h2>
            </div>
            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Puis-je supprimer une image générée de ma galerie à tout moment ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Oui, vous pouvez retirer n&apos;importe quelle génération de votre galerie. La suppression dans l&apos;interface entraîne le retrait immédiat de l&apos;artefact visuel de votre index utilisateur.
                </p>
              </div>

              <div className="space-y-1 border-t border-[#26262b] pt-3">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Les administrateurs d&apos;OpenImage ont-ils accès à mes clés d&apos;API privées ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Non. Vos clés d&apos;API en mode BYOK sont traitées comme des secrets cryptographiques protégés par des mécanismes de hachage et de chiffrement. Aucun opérateur humain n&apos;a accès à vos clés en clair.
                </p>
              </div>

              <div className="space-y-1 border-t border-[#26262b] pt-3">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Quels sont les recours en cas de question sur mes données ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Vous pouvez contacter directement notre équipe à <strong>privacy@soook.fr</strong> pour toute assistance technique ou demande juridique liée à vos données.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact banner */}
        <div className="bg-[#121214] border border-[#2c2c31] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-semibold text-[#fafafa]">
              <Mail className="w-4 h-4 text-[#87ea5c]" />
              <span>Délégué à la Protection des Données (DPO)</span>
            </div>
            <p className="text-[11px] text-[#a1a1aa]">
              Pour toute question relative à vos données personnelles : <span className="text-[#87ea5c] font-mono">privacy@soook.fr</span>
            </p>
          </div>
          <Link
            href="/terms"
            className="px-4 py-2 bg-[#222226] hover:bg-[#2c2c31] text-[#fafafa] rounded-xl text-xs font-semibold border border-[#3f3f46] transition-colors whitespace-nowrap"
          >
            Lire les Conditions d&apos;Utilisation
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
