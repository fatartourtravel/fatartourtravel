import type { Locale } from "./i18n";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
  brand: {
    name: string;
    short: string;
    legalName: string;
    homeAria: string;
    logoAlt: string;
  };
  nav: {
    packages: string;
    services: string;
    cars: string;
    stays: string;
    faq: string;
    whatsapp: string;
    aria: string;
  };
  lang: {
    en: string;
    id: string;
    switcherAria: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPackages: string;
    ctaWhatsapp: string;
    trust: string[];
    cardEyebrow: string;
    cardTitle: string;
    cardText: string;
    cardCta: string;
    trustAria: string;
  };
  services: { title: string; text: string }[];
  packages: {
    eyebrow: string;
    h2: string;
    lead: string;
    currency: string;
    packageType: string;
    groupSize: string;
    paxOption: string;
    standard: string;
    full: string;
    from: string;
    closestFrom: string;
    perPerson: string;
    missingPrice: string;
    rateNote: string;
    askWa: string;
    imageAlt: string;
  };
  why: {
    eyebrow: string;
    h2: string;
    lead: string;
    points: string[];
    quote: string;
    quoteLead: string;
  };
  destinations: {
    eyebrow: string;
    h2: string;
    batamTitle: string;
    batamText: string;
    bintanTitle: string;
    bintanText: string;
  };
  cars: {
    eyebrow: string;
    h2: string;
    lead: string;
    bookWa: string;
    imageAlt: string;
  };
  hotels: {
    eyebrow: string;
    h2: string;
    lead: string;
    badge: string;
    askWa: string;
    imageAlt: string;
  };
  restaurants: {
    eyebrow: string;
    h2: string;
    lead: string;
    badge: string;
    askWa: string;
    imageAlt: string;
  };
  testimonials: {
    eyebrow: string;
    h2: string;
    lead: string;
  };
  faq: {
    eyebrow: string;
    h2: string;
    lead: string;
    items: { q: string; a: string }[];
  };
  cta: {
    eyebrow: string;
    h2: string;
    lead: string;
    button: string;
  };
  footer: {
    blurb: string;
    copyright: string;
    instagram: string;
    tiktok: string;
  };
  waFloat: {
    label: string;
    ask: string;
  };
  wa: {
    nav: string;
    custom: string;
    quote: string;
    package: string;
    car: string;
    hotel: string;
    restaurant: string;
    float: string;
    cta: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "FATAR Tour & Travel Batam | Batam & Bintan Holiday Packages",
    description:
      "Book a private Batam or Bintan holiday with FATAR Tour & Travel. Packages, hotels, city tours and car rental for families from Malaysia, Singapore and Indonesia. Get a quotation on WhatsApp.",
    ogTitle: "FATAR Tour & Travel Batam — Batam & Bintan holiday packages",
    ogDescription:
      "Private Batam and Bintan trips: itinerary, hotel, driver and quotation in one WhatsApp chat.",
    keywords: [
      "Batam tour package",
      "Bintan tour package",
      "Batam holiday from Singapore",
      "Batam holiday from Malaysia",
      "Batam family tour",
      "Batam car rental",
      "Batam private driver",
      "Bintan holiday package",
    ],
  },
  brand: {
    name: "Tour & Travel Batam",
    short: "FATAR",
    legalName: "PT. Fatar Mitra Sarana",
    homeAria: "FATAR Tour & Travel home",
    logoAlt: "FATAR Tour & Travel Batam logo",
  },
  nav: {
    packages: "Packages",
    services: "Services",
    cars: "Cars",
    stays: "Stays",
    faq: "FAQ",
    whatsapp: "WhatsApp",
    aria: "Main navigation",
  },
  lang: {
    en: "EN",
    id: "ID",
    switcherAria: "Choose language",
  },
  hero: {
    eyebrow: "Batam • Bintan • Penyengat",
    h1: "A smoother Batam & Bintan holiday — planned before you arrive.",
    lead: "Send your dates and group size. Our Batam team replies on WhatsApp with a clear itinerary and quotation for families from Malaysia, Singapore and Indonesia.",
    ctaPackages: "See holiday packages",
    ctaWhatsapp: "Get a quotation on WhatsApp",
    trust: ["Local Batam team", "Private groups", "Ready for Malaysia & Singapore"],
    cardEyebrow: "FATAR means",
    cardTitle: "Family, Adventure, Tourism, Accommodation & Relaxation",
    cardText: "One local team for your itinerary, hotel, meals and private driver — so you spend the trip enjoying Batam, not arranging it.",
    cardCta: "Ask for a quotation →",
    trustAria: "Reasons to book with FATAR",
  },
  services: [
    { title: "Family holidays", text: "Easy itineraries for families, couples and private groups." },
    { title: "Hotels", text: "We match the stay to your dates, budget and ferry arrival." },
    { title: "Tours", text: "Batam city tours, Bintan and Penyengat — planned around your time." },
    { title: "Car rental", text: "Private car or bus in Batam, with a local driver if you need one." },
  ],
  packages: {
    eyebrow: "Popular Batam & Bintan packages",
    h2: "Choose a trip. Set the group size. See the estimate.",
    lead: "Prices are per person, based on the group size you select. Chat us to lock dates and the final quotation.",
    currency: "Currency",
    packageType: "Package",
    groupSize: "Group size",
    paxOption: "{n} guests",
    standard: "Standard",
    full: "Full package",
    from: "From",
    closestFrom: "Nearest rate from",
    perPerson: "/ person",
    missingPrice: "A rate for {n} guests is not listed yet. Showing the nearest available price.",
    rateNote:
      "* Package prices are based on MYR. SGD and IDR are estimates. Your final quotation is confirmed on WhatsApp.",
    askWa: "Ask for this package",
    imageAlt: "{title} {duration} holiday package",
  },
  why: {
    eyebrow: "Why travel with FATAR",
    h2: "A Batam-based team. One chat. The whole trip coordinated.",
    lead: "FATAR Tour & Travel is run by PT. Fatar Mitra Sarana in Batam. We put sightseeing, transport, hotels and downtime into one plan — so you do not have to book each piece yourself.",
    points: [
      "Based in Batam",
      "Focused on Batam & Bintan",
      "Custom trips available",
      "Direct help on WhatsApp",
    ],
    quote: "“Perjalanan Lebih Bermakna.”",
    quoteLead: "Travel that gives your family more time together — to explore, eat well and rest.",
  },
  destinations: {
    eyebrow: "Destinations",
    h2: "Batam and Bintan, arranged for your dates.",
    batamTitle: "Batam",
    batamText:
      "City tours, shopping, seafood, family attractions, hotel booking and private transfers from the ferry terminal or airport.",
    bintanTitle: "Bintan & Penyengat",
    bintanText:
      "Island views, heritage stops, beaches and multi-day combinations that start from Batam — planned as one itinerary.",
  },
  cars: {
    eyebrow: "Car rental in Batam",
    h2: "From a family car to a big bus.",
    lead: "For city tours, airport or ferry transfers, family trips and groups. Tell us the dates and we confirm the vehicle on WhatsApp.",
    bookWa: "Book this car on WhatsApp →",
    imageAlt: "{name} car rental in Batam",
  },
  hotels: {
    eyebrow: "Hotel partners",
    h2: "A stay that fits the way you travel.",
    lead: "We match the hotel to your itinerary, group and budget — then include it in the same quotation.",
    badge: "Hotel partner",
    askWa: "Ask about this hotel →",
    imageAlt: "{name} in Batam",
  },
  restaurants: {
    eyebrow: "Restaurant partners",
    h2: "Batam food, already in the itinerary.",
    lead: "From seafood to family meals, we reserve time to eat so your group is not hunting for a table after a long transfer.",
    badge: "Restaurant partner",
    askWa: "Add this to my itinerary →",
    imageAlt: "{name} restaurant in Batam",
  },
  testimonials: {
    eyebrow: "Guest stories",
    h2: "What travelers tell us after the trip.",
    lead: "Families and private groups from Singapore, Malaysia and Indonesia book with FATAR for a simpler Batam stay.",
  },
  faq: {
    eyebrow: "FAQ",
    h2: "Before you book your Batam trip",
    lead: "Need a different plan? Send your dates, group size and what you want to do. We reply on WhatsApp with options.",
    items: [
      {
        q: "Can you build a custom Batam or Bintan itinerary?",
        a: "Yes. Share your travel dates, how many people are coming and what matters most — family time, shopping, seafood or a quiet stay. We send a fitting itinerary and quotation.",
      },
      {
        q: "Do you serve travelers from Singapore and Malaysia?",
        a: "Yes. We regularly arrange trips for guests from Singapore, Malaysia and Indonesia, with prices shown in SGD, MYR and IDR.",
      },
      {
        q: "Can I book a car or driver only?",
        a: "Yes. You can rent a car or book a private driver in Batam without taking a full tour package.",
      },
      {
        q: "Are the prices on this page final?",
        a: "They are estimates to help you plan. Hotel availability, ferry times and group size can change the total. We confirm the final quotation on WhatsApp before you pay.",
      },
      {
        q: "Do you pick us up from the ferry or airport?",
        a: "Yes — tell us your arrival time. We can arrange pickup in Batam and continue with the itinerary from there.",
      },
    ],
  },
  cta: {
    eyebrow: "Ready for Batam?",
    h2: "Send your dates. We will shape the trip.",
    lead: "Holiday packages, hotels, private transport and custom family trips in Batam and Bintan.",
    button: "Chat with FATAR on WhatsApp",
  },
  footer: {
    blurb: "Batam & Bintan tours • Holiday packages • Hotels • Car rental",
    copyright: "All rights reserved.",
    instagram: "Instagram",
    tiktok: "TikTok",
  },
  waFloat: {
    label: "Chat with FATAR on WhatsApp",
    ask: "Ask FATAR",
  },
  wa: {
    nav: "Hi FATAR, I want to plan a Batam/Bintan trip. Travel dates: ___  Number of guests: ___",
    custom:
      "Hi FATAR, please help me plan a custom Batam/Bintan holiday. Travel dates: ___  Number of guests: ___  What we want to do: ___",
    quote:
      "Hi FATAR, I found you on fatartourtravel.com and would like a quotation. Travel dates: ___  Number of guests: ___  Destination: Batam/Bintan",
    package:
      "Hi FATAR, I am interested in {title} {duration}, {type}, around {pax} guests. Please send the itinerary and final quotation. Travel dates: ___",
    car: "Hi FATAR, I would like to rent the {name} ({capacity}) in Batam. Rental dates: ___",
    hotel:
      "Hi FATAR, I would like hotel options including {name}. Travel dates: ___  Number of guests: ___",
    restaurant:
      "Hi FATAR, please include {name} in my Batam itinerary. Travel dates: ___  Number of guests: ___",
    float: "Hi FATAR, I need help planning a Batam/Bintan trip. Travel dates: ___  Number of guests: ___",
    cta: "Hi FATAR, I want a quotation. Travel dates: ___  Number of guests: ___  Destination: Batam/Bintan",
  },
};

const id: Dictionary = {
  meta: {
    title: "FATAR Tour & Travel Batam | Paket Wisata Batam & Bintan",
    description:
      "Liburan privat Batam atau Bintan bersama FATAR Tour & Travel. Paket wisata, hotel, city tour, dan sewa mobil untuk keluarga dari Indonesia, Malaysia, dan Singapore. Minta penawaran via WhatsApp.",
    ogTitle: "FATAR Tour & Travel Batam — paket wisata Batam & Bintan",
    ogDescription:
      "Trip privat Batam dan Bintan: itinerary, hotel, driver, dan penawaran dalam satu chat WhatsApp.",
    keywords: [
      "paket wisata Batam",
      "paket wisata Bintan",
      "liburan Batam",
      "city tour Batam",
      "sewa mobil Batam",
      "private driver Batam",
      "paket family Batam",
      "wisata Batam dari Singapore",
    ],
  },
  brand: {
    name: "Tour & Travel Batam",
    short: "FATAR",
    legalName: "PT. Fatar Mitra Sarana",
    homeAria: "Beranda FATAR Tour & Travel",
    logoAlt: "Logo FATAR Tour & Travel Batam",
  },
  nav: {
    packages: "Paket",
    services: "Layanan",
    cars: "Mobil",
    stays: "Hotel",
    faq: "FAQ",
    whatsapp: "WhatsApp",
    aria: "Navigasi utama",
  },
  lang: {
    en: "EN",
    id: "ID",
    switcherAria: "Pilih bahasa",
  },
  hero: {
    eyebrow: "Batam • Bintan • Penyengat",
    h1: "Liburan Batam & Bintan lebih rapi — beres sebelum Anda tiba.",
    lead: "Kirim tanggal dan jumlah orang. Tim lokal Batam kami balas di WhatsApp dengan itinerary dan penawaran yang jelas, untuk keluarga dari Indonesia, Malaysia, dan Singapore.",
    ctaPackages: "Lihat paket wisata",
    ctaWhatsapp: "Minta penawaran via WhatsApp",
    trust: ["Tim lokal Batam", "Grup privat", "Siap untuk Malaysia & Singapore"],
    cardEyebrow: "FATAR artinya",
    cardTitle: "Family, Adventure, Tourism, Accommodation & Relaxation",
    cardText: "Satu tim lokal untuk itinerary, hotel, makan, dan driver — supaya waktu di Batam dipakai menikmati, bukan mengurus.",
    cardCta: "Minta penawaran →",
    trustAria: "Alasan memesan bersama FATAR",
  },
  services: [
    { title: "Liburan keluarga", text: "Itinerary yang mudah untuk keluarga, pasangan, dan rombongan privat." },
    { title: "Hotel", text: "Kami sesuaikan penginapan dengan tanggal, budget, dan jam tiba feri Anda." },
    { title: "Tur", text: "City tour Batam, Bintan, dan Penyengat — disusun mengikuti waktu Anda." },
    { title: "Sewa mobil", text: "Mobil atau bus privat di Batam, plus driver lokal jika Anda butuh." },
  ],
  packages: {
    eyebrow: "Paket populer Batam & Bintan",
    h2: "Pilih trip. Atur jumlah orang. Lihat estimasi harga.",
    lead: "Harga per orang, sesuai jumlah peserta yang Anda pilih. Chat kami untuk mengunci tanggal dan penawaran final.",
    currency: "Mata uang",
    packageType: "Jenis paket",
    groupSize: "Jumlah orang",
    paxOption: "{n} orang",
    standard: "Standar",
    full: "Paket lengkap",
    from: "Mulai",
    closestFrom: "Tarif terdekat",
    perPerson: "/ orang",
    missingPrice: "Harga untuk {n} orang belum tersedia. Menampilkan tarif terdekat.",
    rateNote:
      "* Harga paket berdasarkan MYR. SGD dan IDR adalah estimasi. Penawaran final dikonfirmasi via WhatsApp.",
    askWa: "Tanya paket ini",
    imageAlt: "Paket wisata {title} {duration}",
  },
  why: {
    eyebrow: "Mengapa bersama FATAR",
    h2: "Tim di Batam. Satu chat. Seluruh trip terkoordinasi.",
    lead: "FATAR Tour & Travel dikelola PT. Fatar Mitra Sarana di Batam. Kami merangkai wisata, transport, hotel, dan waktu istirahat dalam satu rencana — tanpa Anda harus memesan satu-satu.",
    points: [
      "Berbasis di Batam",
      "Fokus Batam & Bintan",
      "Trip custom tersedia",
      "Bantuan langsung di WhatsApp",
    ],
    quote: "“Perjalanan Lebih Bermakna.”",
    quoteLead: "Perjalanan yang memberi keluarga lebih banyak waktu bersama — untuk jalan-jalan, makan enak, dan istirahat.",
  },
  destinations: {
    eyebrow: "Destinasi",
    h2: "Batam dan Bintan, disusun mengikuti tanggal Anda.",
    batamTitle: "Batam",
    batamText:
      "City tour, belanja, seafood, wahana keluarga, pemesanan hotel, dan antar-jemput privat dari terminal feri atau bandara.",
    bintanTitle: "Bintan & Penyengat",
    bintanText:
      "Pemandangan pulau, wisata heritage, pantai, dan kombinasi beberapa hari yang berangkat dari Batam — dalam satu itinerary.",
  },
  cars: {
    eyebrow: "Sewa mobil di Batam",
    h2: "Dari mobil keluarga sampai big bus.",
    lead: "Untuk city tour, antar-jemput bandara atau feri, trip keluarga, dan rombongan. Kirim tanggalnya, kami konfirmasi armada via WhatsApp.",
    bookWa: "Sewa mobil ini via WhatsApp →",
    imageAlt: "Sewa {name} di Batam",
  },
  hotels: {
    eyebrow: "Mitra hotel",
    h2: "Menginap yang cocok dengan gaya trip Anda.",
    lead: "Kami mencocokkan hotel dengan itinerary, jumlah orang, dan budget — lalu memasukkannya ke penawaran yang sama.",
    badge: "Mitra hotel",
    askWa: "Tanya hotel ini →",
    imageAlt: "{name} di Batam",
  },
  restaurants: {
    eyebrow: "Mitra restoran",
    h2: "Kuliner Batam, sudah masuk itinerary.",
    lead: "Dari seafood sampai makan bersama keluarga, kami sisakan waktu makan supaya rombongan tidak mencari meja setelah perjalanan panjang.",
    badge: "Mitra restoran",
    askWa: "Masukkan ke itinerary saya →",
    imageAlt: "Restoran {name} di Batam",
  },
  testimonials: {
    eyebrow: "Cerita tamu",
    h2: "Yang disampaikan setelah trip selesai.",
    lead: "Keluarga dan rombongan privat dari Singapore, Malaysia, dan Indonesia memesan bersama FATAR supaya liburan di Batam lebih sederhana.",
  },
  faq: {
    eyebrow: "FAQ",
    h2: "Sebelum Anda memesan trip Batam",
    lead: "Butuh rencana berbeda? Kirim tanggal, jumlah orang, dan yang ingin dilakukan. Kami balas di WhatsApp dengan pilihan.",
    items: [
      {
        q: "Bisakah itinerary Batam atau Bintan dibuat custom?",
        a: "Bisa. Kirim tanggal perjalanan, jumlah orang, dan prioritas Anda — waktu keluarga, belanja, seafood, atau menginap yang tenang. Kami kirim itinerary dan penawaran yang sesuai.",
      },
      {
        q: "Apakah menerima tamu dari Singapore dan Malaysia?",
        a: "Ya. Kami rutin mengatur trip untuk tamu dari Singapore, Malaysia, dan Indonesia, dengan harga yang bisa ditampilkan dalam SGD, MYR, dan IDR.",
      },
      {
        q: "Bisa sewa mobil atau driver saja?",
        a: "Bisa. Anda dapat menyewa mobil atau memesan driver privat di Batam tanpa mengambil paket wisata lengkap.",
      },
      {
        q: "Apakah harga di halaman ini harga final?",
        a: "Itu estimasi untuk membantu Anda merencanakan. Ketersediaan hotel, jam feri, dan jumlah orang bisa mengubah total. Kami konfirmasi penawaran final via WhatsApp sebelum Anda membayar.",
      },
      {
        q: "Apakah dijemput di feri atau bandara?",
        a: "Ya — kabari jam tiba Anda. Kami bisa atur penjemputan di Batam, lalu lanjut sesuai itinerary.",
      },
    ],
  },
  cta: {
    eyebrow: "Siap ke Batam?",
    h2: "Kirim tanggal Anda. Kami bantu merancang trip-nya.",
    lead: "Paket wisata, hotel, transport privat, dan trip keluarga custom di Batam dan Bintan.",
    button: "Chat FATAR di WhatsApp",
  },
  footer: {
    blurb: "Wisata Batam & Bintan • Paket liburan • Hotel • Sewa mobil",
    copyright: "Hak cipta dilindungi.",
    instagram: "Instagram",
    tiktok: "TikTok",
  },
  waFloat: {
    label: "Chat FATAR di WhatsApp",
    ask: "Tanya FATAR",
  },
  wa: {
    nav: "Halo FATAR, saya ingin merencanakan trip Batam/Bintan. Tanggal perjalanan: ___  Jumlah orang: ___",
    custom:
      "Halo FATAR, tolong bantu rancang liburan custom Batam/Bintan. Tanggal perjalanan: ___  Jumlah orang: ___  Yang ingin dilakukan: ___",
    quote:
      "Halo FATAR, saya menemukan Anda di fatartourtravel.com dan ingin minta penawaran. Tanggal perjalanan: ___  Jumlah orang: ___  Destinasi: Batam/Bintan",
    package:
      "Halo FATAR, saya tertarik dengan {title} {duration}, {type}, sekitar {pax} orang. Mohon kirim itinerary dan penawaran final. Tanggal perjalanan: ___",
    car: "Halo FATAR, saya ingin sewa {name} ({capacity}) di Batam. Tanggal sewa: ___",
    hotel:
      "Halo FATAR, saya ingin opsi hotel termasuk {name}. Tanggal perjalanan: ___  Jumlah orang: ___",
    restaurant:
      "Halo FATAR, mohon masukkan {name} ke itinerary Batam saya. Tanggal perjalanan: ___  Jumlah orang: ___",
    float: "Halo FATAR, saya butuh bantuan merencanakan trip Batam/Bintan. Tanggal perjalanan: ___  Jumlah orang: ___",
    cta: "Halo FATAR, saya ingin minta penawaran. Tanggal perjalanan: ___  Jumlah orang: ___  Destinasi: Batam/Bintan",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
