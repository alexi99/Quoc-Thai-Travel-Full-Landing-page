import type { Dictionary } from "../types";

export const fr: Dictionary = {
  htmlLang: "fr",
  meta: {
    title:
      "Hanoï – Ninh Binh – Baie d'Ha Long | Circuit 3 jours en petit groupe dès 200 $",
    description:
      "Découvrez le Nord du Vietnam en 3 jours inoubliables : cathédrale de Phat Diem, Tam Coc, Thung Nang et une nuit en croisière 4 étoiles avec balcon privé dans la baie d'Ha Long. Petits groupes de 4 à 11 personnes.",
    keywords:
      "croisière baie d'Ha Long, circuit Ninh Binh, excursion Hanoï 3 jours, petit groupe Vietnam, Tam Coc, grotte Sung Sot",
  },
  nav: {
    itinerary: "Itinéraire",
    highlights: "Points forts",
    pricing: "Tarifs",
    gallery: "Galerie",
    reviews: "Avis",
    faq: "FAQ",
    menu: "Menu",
    language: "Langue",
  },
  suggest: {
    text: "Il semble que vous parliez {lang}. Changer la langue ?",
    accept: "Passer en {lang}",
    dismiss: "Rester en anglais",
  },
  urgency: {
    text: "Plus que {spots} places pour le départ du {date}",
    cta: "Réserver",
  },
  hero: {
    badge: "Noté 4,9/5 par plus de 500 voyageurs internationaux",
    title: "Découvrez les plus belles merveilles du Nord Vietnam en",
    titleAccent: "3 jours inoubliables",
    subtitle:
      "Hanoï → Ninh Binh → Baie d'Ha Long | Petit groupe | Croisière 4★ | Dès 200 $/personne",
    ctaPrimary: "Réserver mon aventure",
    ctaSecondary: "Voir l'itinéraire complet",
    scroll: "Faites défiler",
    trust: [
      "Petits groupes (4 à 11 personnes)",
      "Croisière 4★, cabine avec balcon",
      "Guide anglophone diplômé",
      "Annulation gratuite 48 h",
    ],
  },
  overview: {
    eyebrow: "Aperçu du circuit",
    title: "L'essentiel en un coup d'œil",
    subtitle:
      "Un voyage fluide à travers vallées calcaires, grottes secrètes et un paysage marin classé au patrimoine mondial de l'UNESCO — organisé dans les moindres détails.",
    cards: [
      {
        icon: "📅",
        title: "Durée",
        value: "3 jours / 2 nuits",
        desc: "Départ quotidien du Vieux Quartier de Hanoï, retour à 16 h 30 le 3e jour.",
      },
      {
        icon: "🗺️",
        title: "Itinéraire",
        value: "Hanoï → Ninh Binh → Ha Long → Hanoï",
        desc: "Une boucle à travers les deux plus beaux paysages du Nord.",
      },
      {
        icon: "👥",
        title: "Taille du groupe",
        value: "4 à 11 voyageurs",
        desc: "Petit et convivial. Jamais de bus bondé, jamais de file d'attente.",
      },
      {
        icon: "🏨",
        title: "Hébergement",
        value: "Hôtel 3★ + croisière 4★",
        desc: "Chaque cabine dispose de son propre balcon privé.",
      },
      {
        icon: "🍽️",
        title: "Repas",
        value: "2 petits-déjeuners, 3 déjeuners, 1 dîner",
        desc: "Chèvre de Ninh Binh et fruits de mer frais d'Ha Long inclus.",
      },
      {
        icon: "💰",
        title: "Prix",
        value: "Dès 200 USD",
        desc: "Par personne, entrées et promenades en bateau incluses.",
      },
    ],
    mapTitle: "Votre route à travers le Nord Vietnam",
    mapDesc:
      "Environ 420 km de route confortable et climatisée, avec un trajet le plus long de moins de 4 heures.",
    mapStops: [
      "Vieux Quartier de Hanoï — prise en charge",
      "Cathédrale de Phat Diem, Ninh Binh",
      "Tam Coc et Thung Nang",
      "Marina de Tuan Chau, Ha Long",
      "Île Titop et grotte Luon",
      "Grotte Sung Sot → retour à Hanoï",
    ],
  },
  itinerary: {
    eyebrow: "Jour par jour",
    title: "Votre itinéraire détaillé de 3 jours",
    subtitle:
      "Un rythme étudié pour voir plus en courant moins. Tous les horaires ci-dessous sont réels.",
    starLabel: "Temps fort de la journée",
    overnightLabel: "Nuit",
    days: [
      {
        label: "Jour 1",
        title: "Hanoï – Cathédrale de Phat Diem – Tam Coc – Thung Nang",
        theme: "La baie d'Ha Long terrestre",
        overnight: "Hôtel 3★ à Ninh Binh",
        items: [
          {
            time: "07h00 – 07h30",
            title: "Prise en charge à l'hôtel (Vieux Quartier de Hanoï)",
            desc: "Votre guide vous accueille dans le hall avec une pancarte. Transfert gratuit dans tout le Vieux Quartier.",
          },
          {
            time: "08h00",
            title: "Départ de Hanoï vers Ninh Binh",
            desc: "Route vers le sud en minivan privé climatisé, avec eau minérale et présentation du programme.",
          },
          {
            time: "10h30 – 11h30",
            title: "Cathédrale de Phat Diem",
            desc: "Une remarquable cathédrale de pierre de 1892 mêlant toitures de pagode vietnamienne et architecture gothique — un joyau ignoré des autres circuits.",
          },
          {
            time: "12h30 – 13h30",
            title: "Déjeuner — spécialité de chèvre de Ninh Binh",
            desc: "Goûtez la fameuse chèvre de montagne (dê núi) avec le riz croustillant com cháy dans un restaurant familial.",
          },
          {
            time: "14h00 – 14h45",
            title: "Site pittoresque de Tam Coc",
            desc: "Promenade aux points de vue de la vallée surnommée « la baie d'Ha Long terrestre », entre rizières et pitons karstiques.",
          },
          {
            time: "15h00 – 17h00",
            title: "Balade en sampan à Thung Nang",
            desc: "Glissez entre grottes aquatiques et falaises calcaires à bord d'un sampan traditionnel à rames — le coin le plus paisible de Ninh Binh.",
            star: true,
          },
          {
            time: "17h30",
            title: "Installation à l'hôtel 3 étoiles",
            desc: "Chambres climatisées confortables avec eau chaude, Wi-Fi et piscine, au centre de Ninh Binh.",
          },
          {
            time: "18h30",
            title: "Soirée libre et dîner à votre charge",
            desc: "Votre guide vous remet une sélection de bonnes adresses locales à quelques pas de l'hôtel.",
          },
        ],
      },
      {
        label: "Jour 2",
        title: "Ninh Binh – Baie d'Ha Long – Nuit en croisière",
        theme: "Navigation dans un paysage marin classé à l'UNESCO",
        overnight: "Croisière 4★ dans la baie d'Ha Long (cabine avec balcon)",
        items: [
          {
            time: "07h00 – 08h00",
            title: "Petit-déjeuner à l'hôtel",
            desc: "Buffet avec options vietnamiennes et occidentales avant de prendre la route.",
          },
          {
            time: "08h00",
            title: "Départ pour la baie d'Ha Long",
            desc: "Traversée panoramique du delta du fleuve Rouge par la nouvelle autoroute, avec une pause en chemin.",
          },
          {
            time: "12h00 – 12h30",
            title: "Arrivée à la marina de Tuan Chau",
            desc: "Enregistrement prioritaire au salon de la marina pendant que vos bagages rejoignent le bateau.",
          },
          {
            time: "12h30 – 13h00",
            title: "Embarquement sur votre croisière 4★",
            desc: "Cocktail de bienvenue, briefing de sécurité et remise des clés de votre cabine avec balcon privé.",
          },
          {
            time: "13h00 – 14h30",
            title: "Déjeuner de fruits de mer en navigation",
            desc: "Menu à plusieurs services servi dans le restaurant panoramique, îlots karstiques en toile de fond.",
          },
          {
            time: "15h00 – 16h15",
            title: "Île de Titop",
            desc: "Gravissez les 400 marches pour le célèbre panorama à 360° ou profitez simplement de la plage en croissant.",
            star: true,
          },
          {
            time: "16h30 – 17h30",
            title: "Grotte de Luon en barque ou en kayak",
            desc: "Passez sous une arche naturelle vers un lagon caché entouré de falaises, où apparaissent souvent des singes.",
          },
          {
            time: "17h30 – 18h30",
            title: "Happy hour et thé sur le pont soleil",
            desc: "Un cocktail à la main (un acheté, un offert), admirez le coucher de soleil derrière les îles. 🌅",
          },
          {
            time: "19h00 – 20h30",
            title: "Dîner de fruits de mer à bord",
            desc: "Crabe, crevettes et poissons locaux, avec menus végétariens ou adaptés aux allergies sur demande.",
          },
          {
            time: "À partir de 20h30",
            title: "Pêche au calamar, film et observation des étoiles",
            desc: "Essayez la pêche nocturne au calamar, regardez un film sur le pont ou savourez le silence depuis votre balcon.",
          },
        ],
      },
      {
        label: "Jour 3",
        title: "Baie d'Ha Long – Grotte Sung Sot – Hanoï",
        theme: "Le bouquet final",
        overnight: "Fin du circuit dans le Vieux Quartier de Hanoï",
        items: [
          {
            time: "06h15 – 06h45",
            title: "Tai-chi au lever du soleil (facultatif)",
            desc: "Séance douce guidée sur le pont soleil pendant que la baie s'éveille. Café et thé dès 06h00.",
          },
          {
            time: "07h00 – 08h00",
            title: "Petit-déjeuner léger à bord",
            desc: "Viennoiseries, fruits frais, œufs à la demande, café et thé pendant que nous naviguons.",
          },
          {
            time: "08h30 – 09h45",
            title: "Grotte de Sung Sot (grotte de la Surprise)",
            desc: "La plus vaste et spectaculaire grotte de la baie : deux immenses salles illuminées, grandes comme une cathédrale.",
            star: true,
          },
          {
            time: "10h00 – 10h30",
            title: "Retour à bord et départ des cabines",
            desc: "Réglez votre note de bar, préparez vos bagages et profitez du dernier trajet vers la marina.",
          },
          {
            time: "11h30 – 12h30",
            title: "Déjeuner dans un restaurant local",
            desc: "Un menu vietnamien convivial avant la route du retour vers la capitale.",
          },
          {
            time: "13h00",
            title: "Départ pour Hanoï",
            desc: "Transfert confortable avec un arrêt dans un atelier d'artisanat local.",
          },
          {
            time: "16h00 – 16h30",
            title: "Arrivée dans le Vieux Quartier de Hanoï",
            desc: "Dépose à votre hôtel ou n'importe où dans le Vieux Quartier. Transferts aéroport sur demande.",
          },
        ],
      },
    ],
  },
  highlights: {
    eyebrow: "Pourquoi nous choisir",
    title: "Six raisons qui font la différence",
    subtitle:
      "Nous avons opéré cet itinéraire plus de 800 fois. Voici ce qui le rend unique.",
    items: [
      {
        icon: "🛶",
        title: "Petits groupes intimistes",
        desc: "11 voyageurs maximum : une attention personnalisée, pas de bus bondé et un rythme souple, idéal pour les familles et les voyageurs seniors.",
      },
      {
        icon: "🚢",
        title: "Croisière 4★ avec balcon privé",
        desc: "Réveillez-vous face à la baie d'Ha Long depuis votre cabine. Toutes les chambres ont un balcon privé — sans exception ni supplément.",
      },
      {
        icon: "🏛️",
        title: "Hors des sentiers battus",
        desc: "Nous visitons la cathédrale de Phat Diem, un trésor caché que la plupart des circuits ignorent, pour vivre le vrai Vietnam.",
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Adapté aux familles et aux seniors",
        desc: "Rythme tranquille, activités douces, randonnées facultatives et transport confortable, pensés pour tous les âges.",
      },
      {
        icon: "🍜",
        title: "Cuisine locale authentique",
        desc: "De la chèvre de Ninh Binh aux fruits de mer d'Ha Long, chaque repas est une expérience culturelle. Régimes spéciaux ? Aucun souci.",
      },
      {
        icon: "🗣️",
        title: "Guide anglophone expert",
        desc: "Votre guide diplômé fait revivre 4 000 ans d'histoire vietnamienne par des récits, pas seulement des dates.",
      },
    ],
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Un prix transparent. Aucun extra caché.",
    subtitle:
      "Le prix affiché est le prix payé : entrées, balades en bateau et guidage inclus.",
    badge: "Meilleur rapport qualité-prix en petit groupe",
    amount: "200 $",
    perPerson: "/ personne",
    vnd: "≈ 5 200 000 VND / personne",
    groupNote: "Minimum 4 · Maximum 11 voyageurs par départ",
    childNote:
      "Enfants 5–11 ans : 150 $ · Enfants de moins de 5 ans : gratuit avec les parents",
    includedTitle: "Ce qui est inclus",
    notIncludedTitle: "Non inclus",
    included: [
      "Transport aller-retour en minivan climatisé",
      "Guide anglophone diplômé pendant 3 jours",
      "1 nuit en hôtel 3★ à Ninh Binh",
      "1 nuit en croisière 4★ à Ha Long (cabine balcon)",
      "Tous les droits d'entrée et billets de visite",
      "Balades en bateau à Thung Nang et à la grotte de Luon",
      "2 petits-déjeuners, 3 déjeuners, 1 dîner",
      "Cocktail de bienvenue et happy hour à bord",
      "Eau minérale dans le minivan chaque jour",
    ],
    notIncluded: [
      "Dîner du jour 1 (environ 8 à 15 $ par personne)",
      "Boissons supplémentaires et note de bar",
      "Assurance voyage",
      "Dépenses personnelles et pourboires guide/chauffeur",
      "Supplément jours fériés, le cas échéant",
    ],
    cta: "Réserver ma place",
    guarantee:
      "Annulation gratuite jusqu'à 48 h avant le départ · Aucun paiement aujourd'hui",
  },
  gallery: {
    eyebrow: "Galerie",
    title: "Un aperçu de ce qui vous attend",
    subtitle:
      "Des scènes réelles du parcours — touchez une photo pour l'afficher en plein écran.",
    captions: [
      "Lever du soleil sur les pitons karstiques de la baie d'Ha Long",
      "En barque à travers les rizières de Tam Coc",
      "Votre croisière 4★ ancrée parmi les îles",
      "Dans les immenses salles de la grotte Sung Sot",
      "La cathédrale de pierre de Phat Diem, bâtie en 1892",
      "Votre balcon privé au petit matin",
      "Le panorama à 360° depuis l'île de Titop",
      "Fruits de mer et spécialités de chèvre de Ninh Binh",
      "En kayak vers le lagon caché de la grotte de Luon",
      "L'heure dorée sur le pont soleil",
      "Barques en bambou dans les grottes de Thung Nang",
      "Moments en famille sur la baie",
    ],
    close: "Fermer la galerie",
    prev: "Photo précédente",
    next: "Photo suivante",
    openHint: "Voir la photo",
  },
  reviews: {
    eyebrow: "Avis",
    title: "Apprécié par des voyageurs de plus de 40 pays",
    subtitle: "Avis vérifiés recueillis par e-mail après le circuit.",
    aggregate: "4,9 / 5 sur 512 avis vérifiés",
    verified: "Voyageur vérifié",
    items: [
      {
        quote:
          "Parfait pour notre famille de cinq. Les enfants ont adoré les balades en bateau et la croisière a dépassé nos attentes. Notre guide Minh était incroyable : patient, drôle et passionnant.",
        name: "Sarah et sa famille",
        location: "Australie",
        flag: "🇦🇺",
      },
      {
        quote:
          "Nous avons la soixantaine et le rythme était parfait. Ni précipité, ni trop lent. La cathédrale de Phat Diem a été une merveilleuse surprise.",
        name: "Jean-Pierre et Marie",
        location: "France",
        flag: "🇫🇷",
      },
      {
        quote:
          "Le meilleur rapport qualité-prix du Vietnam. Le petit groupe change tout, et la cabine avec balcon a été le point culminant de nos deux semaines.",
        name: "Carlos",
        location: "Espagne",
        flag: "🇪🇸",
      },
      {
        quote:
          "Organisation impeccable de la prise en charge au retour. Tous les horaires ont été respectés, la cuisine était excellente et la grotte Sung Sot nous a laissés sans voix.",
        name: "Giulia et Marco",
        location: "Italie",
        flag: "🇮🇹",
      },
    ],
  },
  booking: {
    eyebrow: "Réservation",
    title: "Réservez votre aventure vietnamienne dès aujourd'hui",
    subtitle:
      "Confirmation immédiate · Annulation gratuite jusqu'à 48 h avant le départ",
    sectionContact: "1. Vos coordonnées",
    sectionTrip: "2. Votre voyage",
    sectionPrefs: "3. Vos préférences",
    fullName: "Nom complet",
    fullNamePh: "ex. Sophie Martin",
    email: "Adresse e-mail",
    emailPh: "vous@exemple.com",
    phone: "Téléphone / WhatsApp",
    phonePh: "6 12 34 56 78",
    countryCode: "Indicatif pays",
    nationality: "Nationalité",
    nationalityPh: "Choisissez votre pays",
    guideLanguage: "Langue souhaitée pour le guide",
    startDate: "Date de départ souhaitée",
    adults: "Adultes",
    adultsHint: "12 ans et plus · 200 $ chacun",
    children: "Enfants",
    childrenHint: "5 à 11 ans · 150 $ chacun",
    infants: "Bébés",
    infantsHint: "Moins de 5 ans · gratuit",
    roomPreference: "Préférence de chambre",
    rooms: ["Lits jumeaux", "Lit double", "Chambre triple"],
    dietary: "Régime alimentaire",
    diets: [
      "Végétarien",
      "Végétalien",
      "Halal",
      "Sans gluten",
      "Allergie aux fruits à coque",
      "Aucun",
      "Autre",
    ],
    specialRequests: "Demandes particulières",
    specialRequestsPh:
      "Besoins d'accessibilité, célébrations, nom de l'hôtel pour la prise en charge…",
    referral: "Comment nous avez-vous connus ?",
    referrals: [
      "Google",
      "TripAdvisor",
      "Ami ou famille",
      "Réseaux sociaux",
      "Blog de voyage",
      "Autre",
    ],
    summaryTitle: "Votre estimation",
    summaryAdults: "Adultes × {n}",
    summaryChildren: "Enfants × {n}",
    summaryInfants: "Bébés × {n}",
    free: "Gratuit",
    estimatedTotal: "Total estimé",
    submit: "Confirmer la réservation — {total}",
    submitting: "Envoi de votre demande…",
    secureNote:
      "🔒 Réservation sécurisée · Aucun paiement maintenant · Paiement sur place",
    required: "obligatoire",
    errRequired: "Ce champ est obligatoire",
    errEmail: "Veuillez saisir une adresse e-mail valide",
    errPhone: "Veuillez saisir un numéro de téléphone valide",
    errDate: "Veuillez choisir une date future",
    errAdults: "Au moins un adulte est requis",
    errServer:
      "Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.",
    successTitle: "Votre demande de réservation est confirmée !",
    successText:
      "Merci {name}. Nous avons réservé vos places et envoyé une confirmation à {email}.",
    successRef: "Référence de réservation",
    successNext:
      "Un conseiller vous contactera sous 4 heures (horaires de Hanoï) pour confirmer l'heure de prise en charge et les derniers détails.",
    successClose: "Parfait, merci !",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    subtitle: "Tout ce que les voyageurs nous demandent avant de réserver.",
    items: [
      {
        q: "Ce circuit convient-il aux personnes âgées ou aux jeunes enfants ?",
        a: "Oui. C'est l'un de nos itinéraires les plus doux : la seule vraie marche est facultative (les 400 marches de l'île de Titop), tout le reste est plat ou assis. L'embarquement se fait depuis des pontons stables et nos guides sont formés pour aider. Nous accueillons régulièrement des voyageurs de plus de 70 ans et des enfants dès 3 ans.",
      },
      {
        q: "Quelle est la politique d'annulation ?",
        a: "Annulation gratuite jusqu'à 48 h avant le départ avec remboursement intégral. Dans les 48 h, 50 % sont remboursés. Si nous annulons pour raisons météo ou de sécurité (la baie peut être fermée par les autorités), vous êtes remboursé intégralement ou changez de date gratuitement.",
      },
      {
        q: "Ai-je besoin d'un visa pour le Vietnam ?",
        a: "La plupart des nationalités ont besoin d'un e-visa (délivré en ligne en 3 jours ouvrés, valable 90 jours) ou bénéficient d'une exemption de 15 à 45 jours. Consultez evisa.gov.vn avant de partir. Nous envoyons un guide pas à pas après la réservation.",
      },
      {
        q: "Que dois-je emporter ?",
        a: "Vêtements légers, une veste légère pour le pont le soir, chaussures de marche confortables, maillot de bain, crème solaire, chapeau, anti-moustiques et vos médicaments. Un petit sac suffit pour la croisière : les grandes valises restent dans le minivan ou à votre hôtel de Hanoï.",
      },
      {
        q: "La croisière est-elle sûre ? Y a-t-il des gilets de sauvetage ?",
        a: "Absolument. Notre bateau est agréé et inspecté chaque année par l'autorité maritime de Quang Ninh. Des gilets sont présents dans chaque cabine et sur chaque annexe, un briefing de sécurité est donné avant le départ et l'équipage comprend des secouristes certifiés.",
      },
      {
        q: "Pouvez-vous gérer les régimes particuliers ?",
        a: "Oui — menus végétariens, végétaliens, halal, sans gluten et adaptés aux allergies, sans supplément. Indiquez-le simplement dans le formulaire au moins 48 h avant le départ.",
      },
      {
        q: "Quelle monnaie dois-je apporter ?",
        a: "Le dong vietnamien (VND) est idéal pour les petits achats, pourboires et boissons. Le dollar américain est largement accepté. Le bar du bateau et la plupart des restaurants acceptent Visa et Mastercard. Des distributeurs sont disponibles à Hanoï et Ninh Binh, mais pas sur la baie.",
      },
      {
        q: "L'assurance voyage est-elle incluse ?",
        a: "L'assurance responsabilité passagers exigée par la loi vietnamienne est incluse, mais nous recommandons vivement une assurance voyage complète couvrant frais médicaux, annulation et bagages.",
      },
      {
        q: "Les activités sont-elles physiquement exigeantes ?",
        a: "Faible à modérée, et presque tout est facultatif. Comptez 3 000 à 5 000 pas par jour sur terrain plat. Le seul effort réel est la montée facultative de Titop ; la grotte Sung Sot compte une cinquantaine de marches avec rampes.",
      },
      {
        q: "Puis-je personnaliser l'itinéraire pour un groupe privé ?",
        a: "Oui. Les départs privés démarrent à 2 personnes : soirée street-food à Hanoï, extension à Cat Ba, croisière 5★ ou Trang An à la place de Tam Coc. Indiquez-le dans les demandes particulières et nous envoyons un devis sous 24 h.",
      },
    ],
    stillTitle: "Une autre question ?",
    stillText:
      "Notre équipe de Hanoï répond sur WhatsApp en quelques minutes, 7 jours sur 7.",
    stillCta: "Discuter sur WhatsApp",
  },
  footer: {
    tagline:
      "Une petite équipe basée à Hanoï qui conçoit depuis 2012 des circuits honnêtes et bien rythmés dans le Nord du Vietnam. Tour-opérateur agréé.",
    linksTitle: "Liens rapides",
    links: [
      "À propos",
      "Tous nos circuits",
      "Blog de voyage",
      "Contact",
      "Conditions générales",
      "Politique de confidentialité",
    ],
    contactTitle: "Contact",
    addressLabel: "Bureau",
    address: "18 rue Hang Bac, district de Hoan Kiem, Hanoï, Vietnam",
    hours: "Ouvert tous les jours de 08h00 à 21h00 (GMT+7)",
    newsletterTitle: "Conseils de voyage et offres secrètes",
    newsletterDesc:
      "Un e-mail par mois avec nos conseils sur le Vietnam et des offres réservées aux abonnés. Jamais de spam.",
    emailPh: "Votre adresse e-mail",
    subscribe: "S'abonner",
    subscribed: "Inscription confirmée. Bienvenue à bord ! 🎉",
    rights: "© 2025 Vietnam Wonders Tour. Tous droits réservés.",
    payments: "Nous acceptons",
    licence: "Licence de tour-opérateur international n° 01-1234/2012/TCDL-GPLHQT",
  },
  common: {
    bookNow: "Réserver",
    learnMore: "En savoir plus",
    perPerson: "par personne",
    from: "Dès",
    backToTop: "Haut de page",
    chatWhatsapp: "Discuter sur WhatsApp",
    loading: "Préparation de votre voyage…",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    spotsLeft: "places restantes",
    close: "Fermer",
  },
  exit: {
    title: "Attendez ! 5 % de remise sur votre première réservation",
    desc: "Laissez votre e-mail et recevez un code de 5 % valable sur ce circuit pendant 30 jours.",
    emailPh: "Votre adresse e-mail",
    cta: "Envoyez-moi le code",
    success: "C'est fait ! Votre code est {code} — il vous a aussi été envoyé par e-mail.",
    dismiss: "Fermer",
    noThanks: "Non merci, je paierai plein tarif",
  },
};
