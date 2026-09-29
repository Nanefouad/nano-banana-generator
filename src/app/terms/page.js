import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Shield,
  CreditCard,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Mail,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Conditions Générales d'Utilisation (Terms of Use) | OpenImage Studio (image.soook.fr)",
  description:
    "Consultez les Conditions d'Utilisation d'OpenImage Studio sur image.soook.fr : packs de crédits, droits commerciaux sur les images générées, mode BYOK et sécurité.",
  alternates: {
    canonical: "https://image.soook.fr/terms",
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
    title: "Conditions Générales d'Utilisation | OpenImage Studio",
    description:
      "Conditions d'utilisation, droits sur les créations générées par IA, politique d'achat de crédits et engagements sur image.soook.fr.",
    url: "https://image.soook.fr/terms",
    siteName: "OpenImage",
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conditions Générales d'Utilisation - OpenImage Studio",
    description:
      "Cadre juridique clair et transparent pour les créateurs sur OpenImage Studio (image.soook.fr).",
  },
};

export default function TermsPage() {
  const lastUpdated = "29 septembre 2026";
  const effectiveDate = "2026-09-29";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://image.soook.fr/terms#webpage",
        "url": "https://image.soook.fr/terms",
        "name": "Conditions Générales d'Utilisation - OpenImage Studio",
        "description":
          "Conditions Générales d'Utilisation (Terms of Use) du service OpenImage Studio accessible sur image.soook.fr.",
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
        "@id": "https://image.soook.fr/terms#breadcrumb",
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
            "name": "Conditions d'Utilisation",
            "item": "https://image.soook.fr/terms",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://image.soook.fr/terms#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "À qui appartiennent les images générées avec OpenImage Studio ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vous êtes propriétaire des artefacts et visuels générés via votre compte. Vous disposez d'une licence d'exploitation pleine et entière, y compris à des fins commerciales, sous réserve du respect des conditions de contenu acceptable.",
            },
          },
          {
            "@type": "Question",
            "name": "Les packs de crédits ont-ils une durée de validité limitée ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non. Les crédits achetés sur OpenImage Studio n'expirent jamais tant que votre compte reste actif. Il n'y a aucun renouvellement automatique imposé ni abonnement caché.",
            },
          },
          {
            "@type": "Question",
            "name": "Quelle est la politique de remboursement des crédits ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Conformément au Code de la consommation relatif aux contenus numériques fournis immédiatement, les crédits consommés ne sont pas remboursables. En cas d'incident technique avéré ayant débité un crédit sans génération d'image, le crédit est réattribué à votre solde.",
            },
          },
          {
            "@type": "Question",
            "name": "Quels sont les contenus strictement interdits sur la plateforme ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il est formellement interdit d'utiliser OpenImage pour produire du contenu pédopornographique (CSAM), haineux, terroriste, diffamatoire ou portant atteinte aux droits de tiers. Tout compte contrevenant sera immédiatement suspendu sans préavis.",
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
        {/* Header / Navigation */}
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
              href="/privacy"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#87ea5c] hover:underline"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Consulter la Politique de Confidentialité</span>
            </Link>
          </div>

          <div className="space-y-3 border-b border-[#26262b] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#2c2c31] rounded-full">
              <Scale className="w-3.5 h-3.5 text-[#87ea5c]" />
              <span className="text-[10px] font-mono font-medium text-[#87ea5c] uppercase tracking-wider">
                Cadre Juridique &bull; Conditions Contractuelles
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fafafa]">
              Conditions Générales d&apos;Utilisation (CGU)
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
              Dernière mise à jour : <strong className="text-[#fafafa]">{lastUpdated}</strong>.
              Règles contractuelles régissant l&apos;utilisation d&apos;OpenImage Studio, l&apos;achat de packs de crédits et la propriété intellectuelle sur <strong className="text-[#87ea5c]">image.soook.fr</strong>.
            </p>
          </div>
        </header>

        {/* TL;DR Summary Box for User Clarity & Google E-E-A-T */}
        <section
          aria-label="Résumé des conditions d'utilisation"
          className="bg-[#18181b]/90 border border-[#87ea5c]/30 rounded-2xl p-5 sm:p-6 space-y-3 shadow-lg shadow-[#87ea5c]/5"
        >
          <div className="flex items-center gap-2 text-[#87ea5c] font-semibold text-xs sm:text-sm uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>En clair : vos droits et engagements essentiels</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#a1a1aa] pt-1">
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Propriété commerciale</span>
              <p>Vous exploitez librement vos images synthétisées à des fins personnelles et commerciales.</p>
            </div>
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Crédits sans expiration</span>
              <p>Paiement unique par pack via Stripe. Vos crédits restent valables indéfiniment.</p>
            </div>
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#26262b] space-y-1">
              <span className="text-[#fafafa] font-semibold block">Mode BYOK sans surcoût</span>
              <p>Connectez votre propre clé d&apos;API pour une liberté d&apos;inférence directe et illimitée.</p>
            </div>
          </div>
        </section>

        {/* Table of contents for SEO & Anchor Navigation */}
        <nav
          aria-label="Sommaire des conditions générales"
          className="bg-[#121214] border border-[#2c2c31] rounded-2xl p-5 space-y-3"
        >
          <h2 className="text-xs uppercase font-mono tracking-wider text-[#a1a1aa] font-bold">
            Sommaire des sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d4d4d8]">
            <a href="#mentions" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">01.</span> Mentions Légales &amp; Éditeur
            </a>
            <a href="#acceptation" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">02.</span> Acceptation &amp; Évolutions
            </a>
            <a href="#compte" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">03.</span> Compte &amp; Authentification
            </a>
            <a href="#credits" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">04.</span> Packs de Crédits &amp; Paiements
            </a>
            <a href="#retractation" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">05.</span> Rétractation &amp; Remboursements
            </a>
            <a href="#byok" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">06.</span> Utilisation du Mode BYOK
            </a>
            <a href="#usages-interdits" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">07.</span> Règles de Conduite &amp; Abus
            </a>
            <a href="#propriete" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">08.</span> Propriété Intellectuelle &amp; Droits
            </a>
            <a href="#responsabilite" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">09.</span> Disponibilité &amp; Responsabilités
            </a>
            <a href="#litiges" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">10.</span> Droit Applicable &amp; Litiges
            </a>
            <a href="#faq" className="hover:text-[#87ea5c] transition-colors flex items-center gap-1.5">
              <span className="text-[#71717a] font-mono">11.</span> FAQ &amp; Assistance
            </a>
          </div>
        </nav>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs text-[#a1a1aa] leading-relaxed">
          {/* Section 1 */}
          <section id="mentions" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Scale className="w-4 h-4 text-[#87ea5c]" />
              <h2>1. Mentions Légales et Objet du Service</h2>
            </div>
            <p>
              Le service <strong>OpenImage Studio</strong>, accessible depuis l&apos;URL officielle{" "}
              <code className="text-[#87ea5c] font-mono bg-[#121214] px-1.5 py-0.5 rounded border border-[#2c2c31]">
                https://image.soook.fr
              </code>
              , est une plateforme applicative avancée dédiée à la conception, génération, transformation et exploration d&apos;artefacts visuels assistés par intelligence artificielle.
            </p>
            <div className="p-3.5 bg-[#121214] border border-[#26262b] rounded-xl space-y-1 text-[#d4d4d8]">
              <p><strong>Éditeur du service :</strong> OpenImage Studio / Soook</p>
              <p><strong>Contact support et juridique :</strong> contact@soook.fr</p>
              <p><strong>Hébergement de l&apos;application :</strong> Infrastructure cloud distribuée Vercel Inc. et Google Cloud Platform.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="acceptation" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <FileText className="w-4 h-4 text-[#87ea5c]" />
              <h2>2. Acceptation et Évolution des Conditions Générales</h2>
            </div>
            <p>
              L&apos;accès et l&apos;utilisation d&apos;OpenImage Studio sont subordonnés à l&apos;acceptation pleine et entière des présentes Conditions Générales d&apos;Utilisation. En vous connectant à votre compte ou en initiant une génération, vous reconnaissez avoir pris connaissance des présentes CGU et vous engagez à les respecter.
            </p>
            <p>
              OpenImage Studio se réserve le droit d&apos;adapter et de mettre à jour les présentes conditions pour se conformer aux évolutions légales, technologiques ou fonctionnelles. La version applicable est celle accessible en ligne à la date de votre utilisation du service.
            </p>
          </section>

          {/* Section 3 */}
          <section id="compte" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Shield className="w-4 h-4 text-[#87ea5c]" />
              <h2>3. Compte Utilisateur et Sécurité des Identifiants</h2>
            </div>
            <p>
              L&apos;accès complet au studio de création nécessite une authentification via le protocole Google OAuth 2.0 ou via une clé d&apos;API tierce en mode Bring-Your-Own-Key (BYOK).
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d4d4d8]">
              <li>Vous êtes seul responsable de la confidentialité et de la protection de vos identifiants d&apos;accès.</li>
              <li>Toute action réalisée à partir de votre compte authentifié est réputée avoir été effectuée par vous-même.</li>
              <li>Vous vous engagez à notifier immédiatement notre support en cas de suspicion d&apos;utilisation frauduleuse de votre session.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="credits" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <CreditCard className="w-4 h-4 text-[#87ea5c]" />
              <h2>4. Packs de Crédits, Tarifs et Paiement Sécurisé</h2>
            </div>
            <p>
              OpenImage Studio propose un modèle commercial transparent et sans engagement récurrent :
            </p>
            <div className="space-y-2.5 text-[#d4d4d8]">
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Packs de crédits à l&apos;acte :</strong>
                Les crédits sont acquis sous forme de packs (ex. Starter Pack 100 crédits, Studio Pack 250 crédits, Pro Studio 600 crédits, Scale Team 2000 crédits). Chaque génération d&apos;image décompte des crédits selon la résolution et le modèle sélectionnés.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Absence d&apos;expiration :</strong>
                Les crédits achetés n&apos;expirent pas dans le temps. Ils restent disponibles sur votre compte aussi longtemps que celui-ci est maintenu actif.
              </div>
              <div className="p-3 bg-[#121214] rounded-xl border border-[#2c2c31]">
                <strong className="text-[#fafafa] block">Paiement certifié Stripe :</strong>
                Les transactions financières sont traitées de manière sécurisée et chiffrée par Stripe Inc. conformément aux normes de sécurité bancaire PCI-DSS Niveau 1.
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="retractation" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Zap className="w-4 h-4 text-[#87ea5c]" />
              <h2>5. Droit de Rétractation et Politique de Remboursement</h2>
            </div>
            <p>
              Conformément à l&apos;article L. 221-28 du Code de la consommation français et aux directives européennes applicables au commerce électronique :
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-[#d4d4d8]">
              <li>
                <strong>Contenus numériques à exécution immédiate :</strong> En procédant à l&apos;achat d&apos;un pack de crédits immédiatement utilisable, l&apos;utilisateur accepte expressément le démarrage immédiat de la prestation et renonce expressément à son droit de rétractation pour les crédits déjà engagés ou consommés.
              </li>
              <li>
                <strong>Packs de crédits non entamés :</strong> Si un pack a été commandé par erreur et qu&apos;aucun crédit n&apos;a encore été débité, l&apos;utilisateur dispose d&apos;un délai de 14 jours calendaires à compter de la date d&apos;achat pour contacter <code>contact@soook.fr</code> et solliciter un remboursement intégral.
              </li>
              <li>
                <strong>Garantie incident d&apos;inférence :</strong> En cas de panne avérée du serveur de calcul ou d&apos;échec technique lors d&apos;une synthèse ayant débité un crédit sans délivrance d&apos;image, notre système réattribue automatiquement ou sur simple demande le crédit débité.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="byok" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-[#87ea5c]" />
              <h2>6. Utilisation du Mode BYOK (Bring Your Own Key)</h2>
            </div>
            <p>
              Le mode BYOK permet aux créateurs avancés d&apos;interroger les modèles avec leur propre clé de calcul (MuAPI / Banana Engine / modèles tiers) sans commission ou majoration appliquée par OpenImage Studio.
            </p>
            <p className="text-[#d4d4d8]">
              En activant ce mode, vous reconnaissez que la consommation de quotas d&apos;inférence est facturée directement par votre fournisseur d&apos;API selon ses propres barèmes. OpenImage Studio décline toute responsabilité en cas de suspension ou de facturation excédentaire par votre fournisseur d&apos;API tiers.
            </p>
          </section>

          {/* Section 7 */}
          <section id="usages-interdits" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 text-[#87ea5c]" />
              <h2>7. Politique de Contenu Acceptable et Usages Strictement Prohibés</h2>
            </div>
            <p>
              OpenImage Studio maintient une politique de tolérance zéro envers les utilisations malveillantes ou illicites. Sont formellement interdits :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d4d4d8]">
              <li>La génération ou tentative de génération de matériels à caractère pédopornographique (CSAM/CSAE) ou d&apos;exploitation d&apos;enfants.</li>
              <li>La génération d&apos;images incitant à la haine raciale, religieuse, ethnique, au terrorisme ou à la violence physique.</li>
              <li>La création de fausses représentations diffamatoires (deepfakes sans consentement), l&apos;usurpation d&apos;identité et l&apos;atteinte délibérée à la vie privée d&apos;autrui.</li>
              <li>Les attaques informatiques, tentatives de rétro-ingénierie, scrapping intensif non autorisé ou surcharges délibérées de notre infrastructure.</li>
            </ul>
            <p className="text-red-400/90 font-medium pt-1">
              Tout manquement constaté entraîne la résiliation immédiate du compte de l&apos;utilisateur sans remboursement possible et, si nécessaire, un signalement aux autorités judiciaires compétentes.
            </p>
          </section>

          {/* Section 8 */}
          <section id="propriete" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Shield className="w-4 h-4 text-[#87ea5c]" />
              <h2>8. Propriété Intellectuelle et Droits sur les Créations</h2>
            </div>
            <div className="space-y-2 text-[#d4d4d8]">
              <p>
                <strong>Vos créations :</strong> Vous conservez l&apos;ensemble des droits patrimoniaux et d&apos;exploitation sur les visuels synthétisés à partir de vos prompts textuels, dans la limite de la législation en vigueur relative aux œuvres générées par intelligence artificielle.
              </p>
              <p>
                <strong>Licence technique concédée à OpenImage Studio :</strong> Vous concédez à OpenImage Studio une licence strictement technique, non exclusive et mondiale pour héberger, stocker, mettre en cache et afficher vos créations dans le cadre exclusif de l&apos;exécution du service (votre Galerie, vos téléchargements, l&apos;historique de votre espace de travail).
              </p>
              <p>
                <strong>Éléments du Studio :</strong> L&apos;interface graphique, le design, le code source, la marque OpenImage Studio et les logos figurant sur <code className="text-[#87ea5c]">image.soook.fr</code> sont protégés par le droit d&apos;auteur et demeurent la propriété exclusive de l&apos;éditeur.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="responsabilite" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Scale className="w-4 h-4 text-[#87ea5c]" />
              <h2>9. Disponibilité du Service et Limitation de Responsabilité</h2>
            </div>
            <p>
              OpenImage Studio s&apos;engage à apporter un soin raisonnable à la fourniture de ses services (obligation de moyens). Compte tenu des spécificités d&apos;Internet et de l&apos;état de l&apos;art des algorithmes d&apos;IA générative :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d4d4d8]">
              <li>Nous ne pouvons garantir une disponibilité ininterrompue de 100% de la plateforme, notamment lors d&apos;opérations de maintenance planifiée.</li>
              <li>Les modèles d&apos;intelligence artificielle étant probabilistes, OpenImage Studio ne garantit pas que les images synthétisées répondront avec exactitude chirurgicale aux attentes subjectives de chaque prompt.</li>
              <li>La responsabilité financière d&apos;OpenImage Studio, en cas de manquement avéré, est plafonnée au montant total payé par l&apos;utilisateur au cours des trois (3) mois précédant le fait générateur.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section id="litiges" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <Scale className="w-4 h-4 text-[#87ea5c]" />
              <h2>10. Droit Applicable, Règlement des Différends et Juridiction</h2>
            </div>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation sont régies et interprétées conformément au <strong>droit français</strong>, sous réserve des règles impératives de protection du consommateur applicables dans son pays de résidence dans l&apos;Union Européenne.
            </p>
            <p className="text-[#d4d4d8]">
              En cas de litige, les parties s&apos;engagent à rechercher préalablement une solution amiable en contactant notre service client à <strong className="text-[#87ea5c]">contact@soook.fr</strong>. Conformément aux dispositions de l&apos;article L. 612-1 du Code de la consommation, les utilisateurs particuliers peuvent recourir gratuitement à un médiateur de la consommation ou utiliser la plateforme européenne de règlement en ligne des litiges (RLL :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#87ea5c] underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              ). À défaut d&apos;accord amiable, les tribunaux compétents du ressort du siège de l&apos;éditeur seront seuls compétents.
            </p>
          </section>

          {/* Section 11 - FAQ for Google SEO Rich Snippets */}
          <section id="faq" className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
              <HelpCircle className="w-4 h-4 text-[#87ea5c]" />
              <h2>11. Foire Aux Questions (FAQ) - Conditions &amp; Licences</h2>
            </div>
            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Puis-je revendre ou imprimer les images générées sur OpenImage ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Oui, vous disposez d&apos;une licence d&apos;utilisation commerciale complète sur vos artefacts générés, vous permettant de les intégrer dans des produits physiques, sites web, publications ou jeux vidéo.
                </p>
              </div>

              <div className="space-y-1 border-t border-[#26262b] pt-3">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Y a-t-il un prélèvement mensuel sans mon accord ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Absolument aucun. OpenImage fonctionne par achat de packs à la demande. Vous ne payez que ce que vous choisissez d&apos;acheter, sans abonnement récurrent automatique.
                </p>
              </div>

              <div className="space-y-1 border-t border-[#26262b] pt-3">
                <h3 className="text-xs font-bold text-[#fafafa]">
                  Comment contacter le service juridique ou le support ?
                </h3>
                <p className="text-[#d4d4d8]">
                  Notre équipe est joignable à tout moment par e-mail à l&apos;adresse <strong>contact@soook.fr</strong> pour répondre à vos questions ou traiter une demande particulière.
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
              <span>Assistance &amp; Service Juridique</span>
            </div>
            <p className="text-[11px] text-[#a1a1aa]">
              Une question sur nos conditions ? Contactez-nous à <span className="text-[#87ea5c] font-mono">contact@soook.fr</span>
            </p>
          </div>
          <Link
            href="/privacy"
            className="px-4 py-2 bg-[#222226] hover:bg-[#2c2c31] text-[#fafafa] rounded-xl text-xs font-semibold border border-[#3f3f46] transition-colors whitespace-nowrap"
          >
            Lire la Politique de Confidentialité
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
