/**
 * Konten Undangan — Sumber Data Tunggal
 * ---------------------------------------
 * Semua nama, lokasi, teks, dan foto yang bisa dikustom lewat halaman admin
 * (?admin=1) disimpan di sini sebagai nilai default.
 *
 * Setelah puas mengedit lewat halaman admin, klik "Export content.json",
 * lalu salin nilai-nilainya ke object `defaultContent` di file ini,
 * kemudian commit & push supaya perubahan permanen untuk semua tamu
 * (localStorage hanya menyimpan preview di browser kamu sendiri).
 */

export interface SiteContent {
  couple: {
    shortName: string; // ditampilkan di header & popup, contoh "Zahra & Akbar"
    bride: {
      name: string;
      parents: string;
    };
    groom: {
      name: string;
      parents: string;
    };
  };
  wedding: {
    dateLabel: string; // teks tampilan, contoh "Sabtu, 05 September 2026"
    dateISO: string; // dipakai untuk hitung mundur, format ISO dengan offset, contoh "2026-09-05T09:00:00+07:00"
  };
  akad: {
    time: string; // contoh "09 : 00 WIB"
    locationName: string;
    address: string;
  };
  resepsi: {
    time: string; // contoh "11 : 00 - 14 : 00 WIB"
    locationName: string;
    address: string;
  };
  googleMapsUrl: string;
  photos: {
    hero: string;
    bride: string;
    groom: string;
  };
  texts: {
    popupGreeting: string; // kalimat sambutan di popup undangan
    coupleSectionDescription: string;
    akadDescription: string;
    resepsiDescription: string;
    locationDescription: string;
  };
}

export const defaultContent: SiteContent = {
  couple: {
    shortName: 'Zahra & Akbar',
    bride: {
      name: 'Zahra Ifakornelia',
      parents: 'Putri dari Bpk. Nanang Ishariyanto & Ibu. Dina Siana Indri Astutik',
    },
    groom: {
      name: 'R. Rojab Maulana Akbar, S.Kom., Gr.',
      parents: 'Putra dari Bpk. RB. Abdul Hadi & Ibu Husnul Hotimah',
    },
  },
  wedding: {
    dateLabel: 'Sabtu, 05 September 2026',
    dateISO: '2026-09-05T09:00:00+07:00',
  },
  akad: {
    time: '09 : 00 WIB',
    locationName: 'Kediaman Mempelai Wanita',
    address: 'Dusun Gading, RT 16/RW 05, Desa Wonorejo, Kec. Maron, Kab. Probolinggo',
  },
  resepsi: {
    time: '11 : 00 - 14 : 00 WIB',
    locationName: 'Kediaman Mempelai Wanita',
    address: 'Dusun Gading, RT 16/RW 05, Desa Wonorejo, Kec. Maron, Kab. Probolinggo',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/EDybkd26oMa2gCdb7?g',
  photos: {
    hero: '', // dikosongkan = pakai foto bawaan (import lokal) di App.tsx
    bride: '',
    groom: '',
  },
  texts: {
    popupGreeting: 'Kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk berbagi kebahagiaan dan memberikan doa restu pada hari istimewa pernikahan kami.',
    coupleSectionDescription: 'Atas karunia-Nya, kami dipertemukan untuk saling melengkapi dan mengarungi bahtera rumah tangga bersama dalam cinta dan ketulusan.',
    akadDescription: 'Dengan memohon ridho Allah SWT, kami akan mengikat janji suci dalam akad nikah. Semoga menjadi awal perjalan kami menuju jalan yang sakinah, mawaddah, wa rahmah.',
    resepsiDescription: "Dengan penuh rasa syukur. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam resepsi pernikahan kami. Mari berbagi kebahagian, do'a, dan merayakan awal perjalanan kami bersama.",
    locationDescription: 'Kami berharap dapat menyambut Bapak/Ibu/Saudara/i secara langsung di hari istimewa kami. Silahkan menggunakan peta digital berikut sebagai panduan menuju lokasi acara pernikahan kami. Terima kasih atas kehadiran dan doa restunya.',
  },
};
