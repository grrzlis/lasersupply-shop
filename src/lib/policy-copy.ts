import type { Locale } from '@/lib/i18n';

export type PolicyBlock = {
  title: string;
  body?: string[];
  items?: string[];
  note?: string[];
};

export type PolicyPage = {
  metaTitle: string;
  metaDescription: string;
  back: string;
  badge: string;
  title: string;
  lead: string;
  sections: PolicyBlock[];
};

const countries =
  'LT, LV, EE, DE, FR, PL, ES, IT, NL, BE, AT, DK, SE, FI, IE, NO, CH, GB';

export const shippingCopy: Record<Locale, PolicyPage> = {
  en: {
    metaTitle: 'Shipping and delivery | LaserSupply.org',
    metaDescription: 'Free tracked shipping across Europe. Handling 1–3 business days, transit 5–12 business days.',
    back: 'Back to the store',
    badge: 'Shipping',
    title: 'Shipping and delivery',
    lead: 'How orders are checked, packed and delivered.',
    sections: [
      {
        title: '1. Free shipping on every order',
        body: [
          '**Tracked shipping is free (0.00 EUR)** across Europe: the European Union, the United Kingdom, Norway and Switzerland. There is no minimum order value.',
        ],
      },
      {
        title: '2. Handling and delivery time',
        items: [
          '**Cut-off:** 17:00 CET, Monday to Friday.',
          '**Handling:** **1–3 business days**. Blanks and parts are checked, packed and handed to the carrier.',
          '**Transit:** **5–12 business days**, depending on the country.',
          '**Total:** **6–15 business days** from the moment the order is placed.',
        ],
      },
      {
        title: '3. Destinations and tracking',
        body: [
          'Orders leave partner warehouses in Europe and abroad and go to your address or a parcel locker. After dispatch you receive an email with a **tracking number**.',
          `Countries: ${countries}.`,
        ],
      },
      {
        title: '4. Support and company',
        note: [
          'Company: MB „Gists Group“',
          'Registered in: Lithuania (European Union)',
          'Email: info@lasersupply.org',
          'Hours: Monday–Friday, 09:00–18:00 CET',
        ],
      },
    ],
  },
  lt: {
    metaTitle: 'Pristatymas | LaserSupply.org',
    metaDescription: 'Nemokamas sekamas pristatymas Europoje. Paruošimas 1–3 d. d., kelionė 5–12 d. d.',
    back: 'Grįžti į parduotuvę',
    badge: 'Pristatymas',
    title: 'Pristatymas ir pristatymo terminai',
    lead: 'Kaip užsakymai tikrinami, pakuojami ir pristatomi.',
    sections: [
      {
        title: '1. Nemokamas pristatymas visiems užsakymams',
        body: [
          '**Sekamas pristatymas nemokamas (0,00 EUR)** Europoje: Europos Sąjungoje, Jungtinėje Karalystėje, Norvegijoje ir Šveicarijoje. Minimalios užsakymo sumos nėra.',
        ],
      },
      {
        title: '2. Paruošimas ir pristatymo laikas',
        items: [
          '**Užsakymų riba:** 17:00 CET, pirmadienį–penktadienį.',
          '**Paruošimas:** **1–3 darbo dienos**. Ruošiniai ir dalys patikrinami, supakuojami ir perduodami vežėjui.',
          '**Kelionė:** **5–12 darbo dienų**, pagal šalį.',
          '**Iš viso:** **6–15 darbo dienų** nuo užsakymo pateikimo.',
        ],
      },
      {
        title: '3. Šalys ir sekimas',
        body: [
          'Siunčiame iš partnerių sandėlių Europoje ir už jos ribų į jūsų adresą arba paštomatą. Išsiuntus gaunate laišką su **siuntos numeriu**.',
          `Šalys: ${countries}.`,
        ],
      },
      {
        title: '4. Pagalba ir įmonė',
        note: [
          'Įmonė: MB „Gists Group“',
          'Registruota: Lietuvoje (Europos Sąjunga)',
          'El. paštas: info@lasersupply.org',
          'Laikas: pirmadienis–penktadienis, 09:00–18:00 CET',
        ],
      },
    ],
  },
  de: {
    metaTitle: 'Versand | LaserSupply.org',
    metaDescription: 'Kostenloser Versand mit Sendungsverfolgung in Europa.',
    back: 'Zurück zum Shop',
    badge: 'Versand',
    title: 'Versand und Lieferzeit',
    lead: 'So werden Bestellungen geprüft, verpackt und zugestellt.',
    sections: [
      {
        title: '1. Kostenloser Versand für jede Bestellung',
        body: [
          '**Versand mit Sendungsverfolgung ist kostenlos (0,00 EUR)** in Europa: Europäische Union, Vereinigtes Königreich, Norwegen und Schweiz. Es gibt keinen Mindestbestellwert.',
        ],
      },
      {
        title: '2. Bearbeitung und Lieferzeit',
        items: [
          '**Annahmeschluss:** 17:00 CET, Montag bis Freitag.',
          '**Bearbeitung:** **1–3 Werktage**. Rohlinge und Teile werden geprüft, verpackt und dem Versanddienst übergeben.',
          '**Transport:** **5–12 Werktage**, je nach Land.',
          '**Gesamt:** **6–15 Werktage** ab Bestellung.',
        ],
      },
      {
        title: '3. Länder und Sendungsverfolgung',
        body: [
          'Der Versand erfolgt aus Partnerlagern in Europa und darüber hinaus an Ihre Adresse oder einen Paketautomaten. Nach dem Versand erhalten Sie eine E-Mail mit der **Sendungsnummer**.',
          `Länder: ${countries}.`,
        ],
      },
      {
        title: '4. Support und Unternehmen',
        note: [
          'Unternehmen: MB „Gists Group“',
          'Sitz: Litauen (Europäische Union)',
          'E-Mail: info@lasersupply.org',
          'Zeiten: Montag–Freitag, 09:00–18:00 CET',
        ],
      },
    ],
  },
  fr: {
    metaTitle: 'Livraison | LaserSupply.org',
    metaDescription: 'Livraison suivie offerte en Europe.',
    back: 'Retour à la boutique',
    badge: 'Livraison',
    title: 'Livraison et délais',
    lead: 'Comment les commandes sont contrôlées, emballées et livrées.',
    sections: [
      {
        title: '1. Livraison offerte sur chaque commande',
        body: [
          '**La livraison suivie est offerte (0,00 EUR)** en Europe : Union européenne, Royaume-Uni, Norvège et Suisse. Aucun montant minimum.',
        ],
      },
      {
        title: '2. Préparation et délai',
        items: [
          '**Limite de commande :** 17:00 CET, du lundi au vendredi.',
          '**Préparation :** **1–3 jours ouvrés**. Les supports et pièces sont contrôlés, emballés et remis au transporteur.',
          '**Transport :** **5–12 jours ouvrés**, selon le pays.',
          '**Total :** **6–15 jours ouvrés** à partir de la commande.',
        ],
      },
      {
        title: '3. Destinations et suivi',
        body: [
          'Les commandes partent d’entrepôts partenaires en Europe et ailleurs, vers votre adresse ou un point relais. Après l’expédition, vous recevez un e-mail avec le **numéro de suivi**.',
          `Pays : ${countries}.`,
        ],
      },
      {
        title: '4. Assistance et société',
        note: [
          'Société : MB „Gists Group“',
          'Siège : Lituanie (Union européenne)',
          'E-mail : info@lasersupply.org',
          'Horaires : lundi–vendredi, 09:00–18:00 CET',
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Envío | LaserSupply.org',
    metaDescription: 'Envío con seguimiento gratis en Europa.',
    back: 'Volver a la tienda',
    badge: 'Envío',
    title: 'Envío y plazos',
    lead: 'Cómo se revisan, embalan y entregan los pedidos.',
    sections: [
      {
        title: '1. Envío gratis en todos los pedidos',
        body: [
          '**El envío con seguimiento es gratis (0,00 EUR)** en Europa: Unión Europea, Reino Unido, Noruega y Suiza. No hay pedido mínimo.',
        ],
      },
      {
        title: '2. Preparación y plazo',
        items: [
          '**Cierre de pedidos:** 17:00 CET, de lunes a viernes.',
          '**Preparación:** **1–3 días laborables**. Los soportes y las piezas se revisan, se embalan y se entregan al transportista.',
          '**Tránsito:** **5–12 días laborables**, según el país.',
          '**Total:** **6–15 días laborables** desde el pedido.',
        ],
      },
      {
        title: '3. Destinos y seguimiento',
        body: [
          'Enviamos desde almacenes asociados en Europa y fuera de ella a tu dirección o a un punto de recogida. Al salir el pedido recibes un correo con el **número de seguimiento**.',
          `Países: ${countries}.`,
        ],
      },
      {
        title: '4. Atención y empresa',
        note: [
          'Empresa: MB „Gists Group“',
          'Registro: Lituania (Unión Europea)',
          'Correo: info@lasersupply.org',
          'Horario: lunes–viernes, 09:00–18:00 CET',
        ],
      },
    ],
  },
  pl: {
    metaTitle: 'Dostawa | LaserSupply.org',
    metaDescription: 'Darmowa dostawa ze śledzeniem po Europie.',
    back: 'Wróć do sklepu',
    badge: 'Dostawa',
    title: 'Dostawa i terminy',
    lead: 'Jak zamówienia są sprawdzane, pakowane i dostarczane.',
    sections: [
      {
        title: '1. Darmowa dostawa każdego zamówienia',
        body: [
          '**Dostawa ze śledzeniem jest darmowa (0,00 EUR)** w Europie: Unia Europejska, Wielka Brytania, Norwegia i Szwajcaria. Nie ma minimalnej wartości zamówienia.',
        ],
      },
      {
        title: '2. Przygotowanie i czas dostawy',
        items: [
          '**Granica zamówień:** 17:00 CET, od poniedziałku do piątku.',
          '**Przygotowanie:** **1–3 dni robocze**. Bazy i części są sprawdzane, pakowane i przekazywane przewoźnikowi.',
          '**Transport:** **5–12 dni roboczych**, zależnie od kraju.',
          '**Razem:** **6–15 dni roboczych** od złożenia zamówienia.',
        ],
      },
      {
        title: '3. Kraje i śledzenie',
        body: [
          'Wysyłka idzie z magazynów partnerskich w Europie i poza nią na Twój adres albo do automatu paczkowego. Po nadaniu dostajesz e-mail z **numerem przesyłki**.',
          `Kraje: ${countries}.`,
        ],
      },
      {
        title: '4. Pomoc i firma',
        note: [
          'Firma: MB „Gists Group“',
          'Siedziba: Litwa (Unia Europejska)',
          'E-mail: info@lasersupply.org',
          'Godziny: poniedziałek–piątek, 09:00–18:00 CET',
        ],
      },
    ],
  },
  lv: {
    metaTitle: 'Piegāde | LaserSupply.org',
    metaDescription: 'Bezmaksas izsekojama piegāde Eiropā.',
    back: 'Atpakaļ uz veikalu',
    badge: 'Piegāde',
    title: 'Piegāde un termiņi',
    lead: 'Kā pasūtījumi tiek pārbaudīti, iepakoti un piegādāti.',
    sections: [
      {
        title: '1. Bezmaksas piegāde katram pasūtījumam',
        body: [
          '**Izsekojama piegāde ir bezmaksas (0,00 EUR)** Eiropā: Eiropas Savienībā, Apvienotajā Karalistē, Norvēģijā un Šveicē. Minimālās summas nav.',
        ],
      },
      {
        title: '2. Sagatavošana un piegādes laiks',
        items: [
          '**Pasūtījumu robeža:** 17:00 CET, pirmdiena–piektdiena.',
          '**Sagatavošana:** **1–3 darba dienas**. Sagataves un detaļas pārbauda, iepako un nodod pārvadātājam.',
          '**Ceļā:** **5–12 darba dienas**, atkarībā no valsts.',
          '**Kopā:** **6–15 darba dienas** no pasūtījuma.',
        ],
      },
      {
        title: '3. Valstis un izsekošana',
        body: [
          'Sūtām no partneru noliktavām Eiropā un ārpus tās uz jūsu adresi vai pakomātu. Pēc nosūtīšanas saņemat e-pastu ar **sūtījuma numuru**.',
          `Valstis: ${countries}.`,
        ],
      },
      {
        title: '4. Atbalsts un uzņēmums',
        note: [
          'Uzņēmums: MB „Gists Group“',
          'Reģistrēts: Lietuvā (Eiropas Savienība)',
          'E-pasts: info@lasersupply.org',
          'Laiks: pirmdiena–piektdiena, 09:00–18:00 CET',
        ],
      },
    ],
  },
  et: {
    metaTitle: 'Tarne | LaserSupply.org',
    metaDescription: 'Tasuta jälgitav tarne Euroopas.',
    back: 'Tagasi poodi',
    badge: 'Tarne',
    title: 'Tarne ja tähtajad',
    lead: 'Kuidas tellimusi kontrollitakse, pakitakse ja toimetatakse kohale.',
    sections: [
      {
        title: '1. Tasuta tarne igale tellimusele',
        body: [
          '**Jälgitav tarne on tasuta (0,00 EUR)** Euroopas: Euroopa Liit, Ühendkuningriik, Norra ja Šveits. Miinimumsummat ei ole.',
        ],
      },
      {
        title: '2. Ettevalmistus ja tarneaeg',
        items: [
          '**Tellimuste piir:** 17:00 CET, esmaspäevast reedeni.',
          '**Ettevalmistus:** **1–3 tööpäeva**. Toorikud ja osad kontrollitakse, pakitakse ja antakse vedajale.',
          '**Teel:** **5–12 tööpäeva**, olenevalt riigist.',
          '**Kokku:** **6–15 tööpäeva** alates tellimusest.',
        ],
      },
      {
        title: '3. Riigid ja jälgimine',
        body: [
          'Saadame partnerladudest Euroopas ja väljaspool seda sinu aadressile või pakiautomaati. Pärast väljastamist saad kirja **saadetise numbriga**.',
          `Riigid: ${countries}.`,
        ],
      },
      {
        title: '4. Tugi ja ettevõte',
        note: [
          'Ettevõte: MB „Gists Group“',
          'Registreeritud: Leedus (Euroopa Liit)',
          'E-post: info@lasersupply.org',
          'Aeg: esmaspäev–reede, 09:00–18:00 CET',
        ],
      },
    ],
  },
};

export const returnsCopy: Record<Locale, PolicyPage> = {
  en: {
    metaTitle: 'Returns | LaserSupply.org',
    metaDescription: '30-day returns. Damaged or defective goods are replaced or refunded.',
    back: 'Back to the store',
    badge: 'Returns',
    title: 'Returns and refunds',
    lead: 'Updated October 2026. Written for the EU consumer rights rules.',
    sections: [
      {
        title: '1. 30-day right to return',
        body: [
          'You can withdraw from the purchase and return the goods within **30 days** of receiving them, without giving a reason.',
        ],
      },
      {
        title: '2. Condition of returned goods',
        body: ['The goods must be:'],
        items: [
          'in the original pack or a safe shipping pack;',
          'unused, undamaged and still in saleable condition (blanks must not be engraved or cut);',
          'complete, as they were delivered.',
        ],
      },
      {
        title: '3. Damaged or defective goods',
        body: [
          'If an item arrives damaged in transit or has a manufacturing defect, we **refund the full amount** or send a replacement at our cost.',
        ],
      },
      {
        title: '4. Refunds',
        body: [
          'After we receive the return, or after a photo confirms the damage, the money goes back to the same payment method (Stripe, Apple Pay or card) within **3–5 business days**.',
        ],
      },
      {
        title: '5. How to start a return',
        body: ['Email us the order number. A short note is enough.'],
        note: ['Email: info@lasersupply.org', 'Reply within 24 hours (Mon–Fri 09:00–18:00 CET)'],
      },
    ],
  },
  lt: {
    metaTitle: 'Grąžinimas | LaserSupply.org',
    metaDescription: '30 dienų grąžinimas. Pažeistas ar brokuotas prekes keičiame arba grąžiname pinigus.',
    back: 'Grįžti į parduotuvę',
    badge: 'Grąžinimas',
    title: 'Prekių grąžinimas ir pinigų grąžinimas',
    lead: 'Atnaujinta 2026 m. spalį. Pagal Europos Sąjungos vartotojų teisių taisykles.',
    sections: [
      {
        title: '1. 30 dienų teisė grąžinti',
        body: [
          'Galite atsisakyti pirkimo ir grąžinti prekes per **30 dienų** nuo gavimo, nenurodydami priežasties.',
        ],
      },
      {
        title: '2. Grąžinamų prekių būklė',
        body: ['Prekė turi būti:'],
        items: [
          'originalioje arba saugioje siuntimo pakuotėje;',
          'nenaudota, nepažeista ir neišvaizdos nepraradusi (ruošiniai neturi būti graviruoti ar pjaustyti);',
          'pilnos komplektacijos, kokia buvo pristatyta.',
        ],
      },
      {
        title: '3. Pažeistos ar brokuotos prekės',
        body: [
          'Jei prekė atvyko pažeista arba turi gamyklinį defektą, **grąžiname visą sumą** arba savo lėšomis atsiunčiame naują.',
        ],
      },
      {
        title: '4. Pinigų grąžinimas',
        body: [
          'Gavę grąžinimą arba nuotrauką, kuri patvirtina pažeidimą, pinigus grąžiname tuo pačiu būdu (Stripe, Apple Pay arba kortelė) per **3–5 darbo dienas**.',
        ],
      },
      {
        title: '5. Kaip pradėti grąžinimą',
        body: ['Parašykite užsakymo numerį. Užtenka trumpo laiško.'],
        note: ['El. paštas: info@lasersupply.org', 'Atsakome per 24 valandas (I–V 09:00–18:00 CET)'],
      },
    ],
  },
  de: {
    metaTitle: 'Rückgabe | LaserSupply.org',
    metaDescription: '30 Tage Rückgabe. Beschädigte oder fehlerhafte Ware wird ersetzt oder erstattet.',
    back: 'Zurück zum Shop',
    badge: 'Rückgabe',
    title: 'Rückgabe und Erstattung',
    lead: 'Stand Oktober 2026. Nach den EU-Verbraucherrechten.',
    sections: [
      {
        title: '1. 30 Tage Widerruf',
        body: ['Sie können den Kauf innerhalb von **30 Tagen** nach Erhalt ohne Angabe von Gründen widerrufen.'],
      },
      {
        title: '2. Zustand der Ware',
        body: ['Die Ware muss:'],
        items: [
          'in der Originalverpackung oder einer sicheren Versandverpackung sein;',
          'unbenutzt, unbeschädigt und verkaufsfähig sein (Rohlinge dürfen nicht graviert oder geschnitten sein);',
          'vollständig sein, so wie sie geliefert wurde.',
        ],
      },
      {
        title: '3. Beschädigte oder fehlerhafte Ware',
        body: [
          'Kommt ein Artikel beschädigt an oder hat einen Herstellungsfehler, **erstatten wir den vollen Betrag** oder senden auf unsere Kosten Ersatz.',
        ],
      },
      {
        title: '4. Erstattung',
        body: [
          'Nach Eingang der Rücksendung oder nach einem Foto des Schadens geht das Geld auf denselben Weg zurück (Stripe, Apple Pay oder Karte), innerhalb von **3–5 Werktagen**.',
        ],
      },
      {
        title: '5. Rückgabe starten',
        body: ['Schreiben Sie uns die Bestellnummer. Eine kurze Nachricht genügt.'],
        note: ['E-Mail: info@lasersupply.org', 'Antwort innerhalb von 24 Stunden (Mo–Fr 09:00–18:00 CET)'],
      },
    ],
  },
  fr: {
    metaTitle: 'Retours | LaserSupply.org',
    metaDescription: 'Retours sous 30 jours. Les articles abîmés ou défectueux sont remplacés ou remboursés.',
    back: 'Retour à la boutique',
    badge: 'Retours',
    title: 'Retours et remboursements',
    lead: 'Mis à jour en octobre 2026. Selon les droits des consommateurs de l’UE.',
    sections: [
      {
        title: '1. Droit de retour de 30 jours',
        body: ['Vous pouvez renoncer à l’achat et renvoyer les articles dans les **30 jours** suivant la réception, sans motif.'],
      },
      {
        title: '2. État des articles renvoyés',
        body: ['L’article doit être :'],
        items: [
          'dans l’emballage d’origine ou un emballage d’expédition sûr ;',
          'non utilisé, non abîmé et encore vendable (les supports ne doivent pas être gravés ni découpés) ;',
          'complet, tel qu’il a été livré.',
        ],
      },
      {
        title: '3. Articles abîmés ou défectueux',
        body: [
          'Si un article arrive abîmé ou présente un défaut de fabrication, nous **remboursons la totalité** ou envoyons un remplacement à nos frais.',
        ],
      },
      {
        title: '4. Remboursement',
        body: [
          'Après réception du retour, ou d’une photo qui confirme le dommage, l’argent revient par le même moyen (Stripe, Apple Pay ou carte) sous **3–5 jours ouvrés**.',
        ],
      },
      {
        title: '5. Commencer un retour',
        body: ['Écrivez-nous le numéro de commande. Un court message suffit.'],
        note: ['E-mail : info@lasersupply.org', 'Réponse sous 24 heures (lun–ven 09:00–18:00 CET)'],
      },
    ],
  },
  es: {
    metaTitle: 'Devoluciones | LaserSupply.org',
    metaDescription: 'Devolución en 30 días. Lo dañado o defectuoso se cambia o se reembolsa.',
    back: 'Volver a la tienda',
    badge: 'Devoluciones',
    title: 'Devoluciones y reembolsos',
    lead: 'Actualizado en octubre de 2026. Según los derechos de los consumidores de la UE.',
    sections: [
      {
        title: '1. Derecho de devolución de 30 días',
        body: ['Puedes desistir de la compra y devolver los artículos en **30 días** desde la recepción, sin dar un motivo.'],
      },
      {
        title: '2. Estado de lo devuelto',
        body: ['El artículo debe estar:'],
        items: [
          'en el embalaje original o en un embalaje de envío seguro;',
          'sin usar, sin daños y en condiciones de venta (los soportes no deben estar grabados ni cortados);',
          'completo, tal como se entregó.',
        ],
      },
      {
        title: '3. Artículos dañados o defectuosos',
        body: [
          'Si un artículo llega dañado o tiene un defecto de fábrica, **devolvemos el importe completo** o enviamos un recambio a nuestro cargo.',
        ],
      },
      {
        title: '4. Reembolso',
        body: [
          'Cuando recibimos la devolución, o una foto que confirma el daño, el dinero vuelve por el mismo medio (Stripe, Apple Pay o tarjeta) en **3–5 días laborables**.',
        ],
      },
      {
        title: '5. Cómo empezar una devolución',
        body: ['Escríbenos el número de pedido. Basta una nota breve.'],
        note: ['Correo: info@lasersupply.org', 'Respuesta en 24 horas (lun–vie 09:00–18:00 CET)'],
      },
    ],
  },
  pl: {
    metaTitle: 'Zwroty | LaserSupply.org',
    metaDescription: 'Zwrot w ciągu 30 dni. Uszkodzone lub wadliwe towary wymieniamy albo zwracamy pieniądze.',
    back: 'Wróć do sklepu',
    badge: 'Zwroty',
    title: 'Zwroty i zwrot pieniędzy',
    lead: 'Aktualizacja: październik 2026. Zgodnie z prawami konsumenta w UE.',
    sections: [
      {
        title: '1. 30 dni na zwrot',
        body: ['Możesz odstąpić od zakupu i zwrócić towar w ciągu **30 dni** od otrzymania, bez podawania powodu.'],
      },
      {
        title: '2. Stan zwracanego towaru',
        body: ['Towar musi być:'],
        items: [
          'w oryginalnym albo bezpiecznym opakowaniu do wysyłki;',
          'nieużywany, nieuszkodzony i nadal zdatny do sprzedaży (bazy nie mogą być grawerowane ani cięte);',
          'kompletny, taki jak przy dostawie.',
        ],
      },
      {
        title: '3. Towar uszkodzony lub wadliwy',
        body: [
          'Jeśli towar dotrze uszkodzony albo ma wadę fabryczną, **zwracamy pełną kwotę** albo wysyłamy zamiennik na nasz koszt.',
        ],
      },
      {
        title: '4. Zwrot pieniędzy',
        body: [
          'Po otrzymaniu zwrotu albo zdjęcia, które potwierdza uszkodzenie, pieniądze wracają tą samą drogą (Stripe, Apple Pay albo karta) w ciągu **3–5 dni roboczych**.',
        ],
      },
      {
        title: '5. Jak zacząć zwrot',
        body: ['Napisz numer zamówienia. Wystarczy krótka wiadomość.'],
        note: ['E-mail: info@lasersupply.org', 'Odpowiedź w ciągu 24 godzin (pon–pt 09:00–18:00 CET)'],
      },
    ],
  },
  lv: {
    metaTitle: 'Atgriešana | LaserSupply.org',
    metaDescription: '30 dienu atgriešana. Bojātas vai brāķa preces apmainām vai atmaksājam.',
    back: 'Atpakaļ uz veikalu',
    badge: 'Atgriešana',
    title: 'Preču atgriešana un naudas atmaksa',
    lead: 'Atjaunināts 2026. gada oktobrī. Saskaņā ar ES patērētāju tiesībām.',
    sections: [
      {
        title: '1. 30 dienu tiesības atgriezt',
        body: ['Varat atteikties no pirkuma un atgriezt preces **30 dienu** laikā pēc saņemšanas, nenorādot iemeslu.'],
      },
      {
        title: '2. Atgriežamo preču stāvoklis',
        body: ['Precei jābūt:'],
        items: [
          'oriģinālajā vai drošā sūtījuma iepakojumā;',
          'nelietotai, nebojātai un ar saglabātu preces izskatu (sagataves nedrīkst būt gravētas vai grieztas);',
          'pilnā komplektācijā, kāda tika piegādāta.',
        ],
      },
      {
        title: '3. Bojātas vai brāķa preces',
        body: [
          'Ja prece piegādāta bojāta vai tai ir ražošanas defekts, **atmaksājam visu summu** vai saviem līdzekļiem nosūtām jaunu.',
        ],
      },
      {
        title: '4. Naudas atmaksa',
        body: [
          'Kad saņemam atgriešanu vai foto, kas apstiprina bojājumu, nauda atgriežas tajā pašā veidā (Stripe, Apple Pay vai karte) **3–5 darba dienu** laikā.',
        ],
      },
      {
        title: '5. Kā sākt atgriešanu',
        body: ['Uzrakstiet pasūtījuma numuru. Pietiek ar īsu vēstuli.'],
        note: ['E-pasts: info@lasersupply.org', 'Atbilde 24 stundu laikā (P–Pk 09:00–18:00 CET)'],
      },
    ],
  },
  et: {
    metaTitle: 'Tagastus | LaserSupply.org',
    metaDescription: '30 päeva tagastust. Kahjustatud või praakkaup asendatakse või hüvitatakse.',
    back: 'Tagasi poodi',
    badge: 'Tagastus',
    title: 'Tagastus ja raha tagasi',
    lead: 'Uuendatud 2026. aasta oktoobris. EL-i tarbijaõiguste järgi.',
    sections: [
      {
        title: '1. 30 päeva tagastamisõigus',
        body: ['Võid ostust loobuda ja kauba tagastada **30 päeva** jooksul alates kättesaamisest, põhjust nimetamata.'],
      },
      {
        title: '2. Tagastatava kauba seisukord',
        body: ['Kaup peab olema:'],
        items: [
          'originaal- või turvalises saatepakendis;',
          'kasutamata, kahjustamata ja müügikõlblik (toorikud ei tohi olla graveeritud ega lõigatud);',
          'täiskomplektne, nii nagu see kohale toimetati.',
        ],
      },
      {
        title: '3. Kahjustatud või praakkaup',
        body: [
          'Kui kaup saabub kahjustatuna või sellel on tootmisviga, **tagastame kogu summa** või saadame asenduse oma kulul.',
        ],
      },
      {
        title: '4. Raha tagastus',
        body: [
          'Kui tagastus või kahju kinnitav foto on käes, läheb raha tagasi samal viisil (Stripe, Apple Pay või kaart) **3–5 tööpäeva** jooksul.',
        ],
      },
      {
        title: '5. Kuidas tagastust alustada',
        body: ['Kirjuta tellimuse number. Piisab lühikesest kirjast.'],
        note: ['E-post: info@lasersupply.org', 'Vastus 24 tunni jooksul (E–R 09:00–18:00 CET)'],
      },
    ],
  },
};

export const privacyCopy: Record<Locale, PolicyPage> = {
  en: {
    metaTitle: 'Privacy | LaserSupply.org',
    metaDescription: 'Who runs LaserSupply.org, what data the order needs, and how payments are handled.',
    back: 'Back to the store',
    badge: 'Privacy',
    title: 'Privacy and terms',
    lead: 'Run by MB „Gists Group“, in line with the EU General Data Protection Regulation (GDPR).',
    sections: [
      {
        title: '1. Who is responsible',
        body: [
          'This store (**LaserSupply.org**) is owned and run by **MB „Gists Group“**, registered in Lithuania (European Union). Email: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. What we collect and how you pay',
        body: [
          'We keep only what the order needs: name, delivery address, email and phone (so the courier can reach you).',
          'Payments are handled by **Stripe Payments Europe, Ltd.** LaserSupply.org does not store your card number.',
        ],
      },
      {
        title: '3. Delivery partners',
        body: [
          'To send the order we share the recipient’s name, address and phone with the warehouse and the courier (DPD, Omniva, DHL, AliExpress Standard or Choice). We do not sell customer data.',
        ],
      },
      {
        title: '4. Your rights',
        body: ['You can ask to see, correct or delete your data at any time.'],
        note: ['Company: MB „Gists Group“', 'Email: info@lasersupply.org', 'Law: Republic of Lithuania (EU)'],
      },
    ],
  },
  lt: {
    metaTitle: 'Privatumas | LaserSupply.org',
    metaDescription: 'Kas valdo LaserSupply.org, kokius duomenis reikia užsakymui ir kaip apmokama.',
    back: 'Grįžti į parduotuvę',
    badge: 'Privatumas',
    title: 'Privatumas ir sąlygos',
    lead: 'Parduotuvę valdo MB „Gists Group“, pagal ES Bendrąjį duomenų apsaugos reglamentą (BDAR).',
    sections: [
      {
        title: '1. Kas atsako už duomenis',
        body: [
          'Šią parduotuvę (**LaserSupply.org**) valdo **MB „Gists Group“**, registruota Lietuvoje (Europos Sąjunga). El. paštas: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Ką renkame ir kaip mokate',
        body: [
          'Saugome tik tai, ko reikia užsakymui: vardą, pristatymo adresą, el. paštą ir telefoną (kad kurjeris galėtų susisiekti).',
          'Mokėjimus tvarko **Stripe Payments Europe, Ltd.** Kortelės numerio LaserSupply.org nesaugo.',
        ],
      },
      {
        title: '3. Pristatymo partneriai',
        body: [
          'Kad išsiųstume užsakymą, gavėjo vardą, adresą ir telefoną perduodame sandėliui ir vežėjui (DPD, Omniva, DHL, AliExpress Standard arba Choice). Klientų duomenų neparduodame.',
        ],
      },
      {
        title: '4. Jūsų teisės',
        body: ['Galite paprašyti savo duomenis parodyti, pataisyti arba ištrinti.'],
        note: ['Įmonė: MB „Gists Group“', 'El. paštas: info@lasersupply.org', 'Teisė: Lietuvos Respublika (ES)'],
      },
    ],
  },
  de: {
    metaTitle: 'Datenschutz | LaserSupply.org',
    metaDescription: 'Wer LaserSupply.org betreibt, welche Daten eine Bestellung braucht und wie bezahlt wird.',
    back: 'Zurück zum Shop',
    badge: 'Datenschutz',
    title: 'Datenschutz und Bedingungen',
    lead: 'Betrieben von MB „Gists Group“, nach der EU-Datenschutz-Grundverordnung (DSGVO).',
    sections: [
      {
        title: '1. Wer verantwortlich ist',
        body: [
          'Diesen Shop (**LaserSupply.org**) betreibt **MB „Gists Group“**, eingetragen in Litauen (Europäische Union). E-Mail: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Welche Daten und wie Sie zahlen',
        body: [
          'Wir speichern nur, was die Bestellung braucht: Name, Lieferadresse, E-Mail und Telefon (damit der Kurier Sie erreicht).',
          'Zahlungen laufen über **Stripe Payments Europe, Ltd.** LaserSupply.org speichert keine Kartennummer.',
        ],
      },
      {
        title: '3. Versandpartner',
        body: [
          'Für den Versand geben wir Name, Adresse und Telefon des Empfängers an das Lager und den Kurier weiter (DPD, Omniva, DHL, AliExpress Standard oder Choice). Kundendaten verkaufen wir nicht.',
        ],
      },
      {
        title: '4. Ihre Rechte',
        body: ['Sie können Ihre Daten jederzeit einsehen, berichtigen oder löschen lassen.'],
        note: ['Unternehmen: MB „Gists Group“', 'E-Mail: info@lasersupply.org', 'Recht: Republik Litauen (EU)'],
      },
    ],
  },
  fr: {
    metaTitle: 'Confidentialité | LaserSupply.org',
    metaDescription: 'Qui exploite LaserSupply.org, quelles données une commande exige et comment le paiement est traité.',
    back: 'Retour à la boutique',
    badge: 'Confidentialité',
    title: 'Confidentialité et conditions',
    lead: 'Exploité par MB „Gists Group“, conformément au RGPD de l’UE.',
    sections: [
      {
        title: '1. Qui est responsable',
        body: [
          'Cette boutique (**LaserSupply.org**) est exploitée par **MB „Gists Group“**, enregistrée en Lituanie (Union européenne). E-mail : **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Données collectées et paiement',
        body: [
          'Nous ne gardons que ce dont la commande a besoin : nom, adresse de livraison, e-mail et téléphone (pour que le transporteur puisse vous joindre).',
          'Les paiements passent par **Stripe Payments Europe, Ltd.** LaserSupply.org ne conserve pas le numéro de carte.',
        ],
      },
      {
        title: '3. Partenaires de livraison',
        body: [
          'Pour expédier la commande, le nom, l’adresse et le téléphone du destinataire sont transmis à l’entrepôt et au transporteur (DPD, Omniva, DHL, AliExpress Standard ou Choice). Nous ne vendons pas les données clients.',
        ],
      },
      {
        title: '4. Vos droits',
        body: ['Vous pouvez demander à voir, corriger ou effacer vos données à tout moment.'],
        note: ['Société : MB „Gists Group“', 'E-mail : info@lasersupply.org', 'Droit : République de Lituanie (UE)'],
      },
    ],
  },
  es: {
    metaTitle: 'Privacidad | LaserSupply.org',
    metaDescription: 'Quién gestiona LaserSupply.org, qué datos pide un pedido y cómo se paga.',
    back: 'Volver a la tienda',
    badge: 'Privacidad',
    title: 'Privacidad y condiciones',
    lead: 'La gestiona MB „Gists Group“, conforme al RGPD de la UE.',
    sections: [
      {
        title: '1. Quién responde de los datos',
        body: [
          'Esta tienda (**LaserSupply.org**) la gestiona **MB „Gists Group“**, registrada en Lituania (Unión Europea). Correo: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Qué datos y cómo pagas',
        body: [
          'Guardamos solo lo que el pedido necesita: nombre, dirección de entrega, correo y teléfono (para que el mensajero pueda contactarte).',
          'Los pagos los gestiona **Stripe Payments Europe, Ltd.** LaserSupply.org no guarda el número de tarjeta.',
        ],
      },
      {
        title: '3. Socios de envío',
        body: [
          'Para enviar el pedido compartimos el nombre, la dirección y el teléfono del destinatario con el almacén y el mensajero (DPD, Omniva, DHL, AliExpress Standard o Choice). No vendemos datos de clientes.',
        ],
      },
      {
        title: '4. Tus derechos',
        body: ['Puedes pedir ver, corregir o borrar tus datos en cualquier momento.'],
        note: ['Empresa: MB „Gists Group“', 'Correo: info@lasersupply.org', 'Ley: República de Lituania (UE)'],
      },
    ],
  },
  pl: {
    metaTitle: 'Prywatność | LaserSupply.org',
    metaDescription: 'Kto prowadzi LaserSupply.org, jakich danych wymaga zamówienie i jak działa płatność.',
    back: 'Wróć do sklepu',
    badge: 'Prywatność',
    title: 'Prywatność i warunki',
    lead: 'Sklep prowadzi MB „Gists Group“, zgodnie z RODO.',
    sections: [
      {
        title: '1. Kto odpowiada za dane',
        body: [
          'Ten sklep (**LaserSupply.org**) prowadzi **MB „Gists Group“**, zarejestrowana na Litwie (Unia Europejska). E-mail: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Jakie dane i jak płacisz',
        body: [
          'Zostawiamy tylko to, czego wymaga zamówienie: imię i nazwisko, adres dostawy, e-mail i telefon (żeby kurier mógł się odezwać).',
          'Płatności obsługuje **Stripe Payments Europe, Ltd.** LaserSupply.org nie zapisuje numeru karty.',
        ],
      },
      {
        title: '3. Partnerzy dostawy',
        body: [
          'Żeby wysłać zamówienie, imię, adres i telefon odbiorcy przekazujemy magazynowi i kurierowi (DPD, Omniva, DHL, AliExpress Standard albo Choice). Danych klientów nie sprzedajemy.',
        ],
      },
      {
        title: '4. Twoje prawa',
        body: ['Możesz poprosić o wgląd, poprawienie albo usunięcie swoich danych.'],
        note: ['Firma: MB „Gists Group“', 'E-mail: info@lasersupply.org', 'Prawo: Republika Litewska (UE)'],
      },
    ],
  },
  lv: {
    metaTitle: 'Privātums | LaserSupply.org',
    metaDescription: 'Kas vada LaserSupply.org, kādi dati vajadzīgi pasūtījumam un kā notiek apmaksa.',
    back: 'Atpakaļ uz veikalu',
    badge: 'Privātums',
    title: 'Privātums un noteikumi',
    lead: 'Veikalu vada MB „Gists Group“ saskaņā ar ES Vispārīgo datu aizsardzības regulu (VDAR).',
    sections: [
      {
        title: '1. Kas atbild par datiem',
        body: [
          'Šo veikalu (**LaserSupply.org**) vada **MB „Gists Group“**, reģistrēta Lietuvā (Eiropas Savienība). E-pasts: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Kādus datus vācam un kā maksājat',
        body: [
          'Glabājam tikai to, kas vajadzīgs pasūtījumam: vārdu, piegādes adresi, e-pastu un tālruni (lai kurjers var sazināties).',
          'Maksājumus apstrādā **Stripe Payments Europe, Ltd.** Kartes numuru LaserSupply.org neglabā.',
        ],
      },
      {
        title: '3. Piegādes partneri',
        body: [
          'Lai nosūtītu pasūtījumu, saņēmēja vārdu, adresi un tālruni nododam noliktavai un pārvadātājam (DPD, Omniva, DHL, AliExpress Standard vai Choice). Klientu datus nepārdodam.',
        ],
      },
      {
        title: '4. Jūsu tiesības',
        body: ['Varat lūgt savus datus parādīt, labot vai dzēst.'],
        note: ['Uzņēmums: MB „Gists Group“', 'E-pasts: info@lasersupply.org', 'Tiesības: Lietuvas Republika (ES)'],
      },
    ],
  },
  et: {
    metaTitle: 'Privaatsus | LaserSupply.org',
    metaDescription: 'Kes haldab LaserSupply.org-i, milliseid andmeid tellimus vajab ja kuidas makstakse.',
    back: 'Tagasi poodi',
    badge: 'Privaatsus',
    title: 'Privaatsus ja tingimused',
    lead: 'Poodi haldab MB „Gists Group“ EL-i isikuandmete kaitse üldmääruse (GDPR) järgi.',
    sections: [
      {
        title: '1. Kes andmete eest vastutab',
        body: [
          'Seda poodi (**LaserSupply.org**) haldab **MB „Gists Group“**, registreeritud Leedus (Euroopa Liit). E-post: **info@lasersupply.org**.',
        ],
      },
      {
        title: '2. Mida kogume ja kuidas maksad',
        body: [
          'Hoiame ainult seda, mida tellimus vajab: nime, tarneaadressi, e-posti ja telefoni (et kuller saaks ühendust võtta).',
          'Makseid töötleb **Stripe Payments Europe, Ltd.** Kaardinumbrit LaserSupply.org ei salvesta.',
        ],
      },
      {
        title: '3. Tarnepartnerid',
        body: [
          'Tellimuse saatmiseks jagame saaja nime, aadressi ja telefoni lao ja kulleriga (DPD, Omniva, DHL, AliExpress Standard või Choice). Klientide andmeid me ei müü.',
        ],
      },
      {
        title: '4. Sinu õigused',
        body: ['Võid igal ajal paluda oma andmeid näha, parandada või kustutada.'],
        note: ['Ettevõte: MB „Gists Group“', 'E-post: info@lasersupply.org', 'Õigus: Leedu Vabariik (EL)'],
      },
    ],
  },
};

export const notFoundCopy: Record<Locale, { title: string; text: string; home: string }> = {
  en: { title: 'Page not found', text: 'This page does not exist or has moved.', home: 'Back to the store' },
  lt: { title: 'Puslapis nerastas', text: 'Šio puslapio nėra arba jis perkeltas.', home: 'Grįžti į parduotuvę' },
  de: { title: 'Seite nicht gefunden', text: 'Diese Seite gibt es nicht oder sie wurde verschoben.', home: 'Zurück zum Shop' },
  fr: { title: 'Page introuvable', text: 'Cette page n’existe pas ou a été déplacée.', home: 'Retour à la boutique' },
  es: { title: 'Página no encontrada', text: 'Esta página no existe o se ha movido.', home: 'Volver a la tienda' },
  pl: { title: 'Nie znaleziono strony', text: 'Tej strony nie ma albo została przeniesiona.', home: 'Wróć do sklepu' },
  lv: { title: 'Lapa nav atrasta', text: 'Šādas lapas nav vai tā ir pārvietota.', home: 'Atpakaļ uz veikalu' },
  et: { title: 'Lehte ei leitud', text: 'Seda lehte pole või see on teisaldatud.', home: 'Tagasi poodi' },
};
