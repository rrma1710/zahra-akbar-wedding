import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import type { SiteContent } from '../content';

const SESSION_KEY = 'wedding_admin_authed';
// Ganti password ini, atau setel VITE_ADMIN_PASSWORD di file .env sebelum deploy.
const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'ubah-password-ini';

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1">{label}</span>
      {textarea ? (
        <textarea
          className="w-full border border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:border-burgundy focus:ring-0"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full border border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:border-burgundy focus:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-charcoal/10 rounded-xl p-6 mb-6 shadow-sm">
      <h2 className="text-sm font-bold text-burgundy uppercase tracking-widest mb-4">{title}</h2>
      {children}
    </div>
  );
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-champagne px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-serif text-burgundy mb-1">Admin Undangan</h1>
        <p className="text-xs text-charcoal/60 mb-6">Masukkan password untuk mengedit isi undangan.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          className="w-full border border-charcoal/20 rounded-lg px-3 py-2 text-sm mb-2 focus:border-burgundy focus:ring-0"
          placeholder="Password"
        />
        {error && <p className="text-xs text-red-600 mb-3">Password salah, coba lagi.</p>}
        <button type="submit" className="w-full bg-burgundy text-white rounded-lg py-2 text-sm font-semibold mt-3 hover:bg-burgundy/90 transition-colors">
          Masuk
        </button>
      </form>
    </div>
  );
}

function AdminForm() {
  const { content, updateContent, resetContent } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateContent(draft);
    setSavedAt(Date.now());
  };

  const handleReset = () => {
    if (!confirm('Kembalikan semua ke nilai default (hapus preview di browser ini)?')) return;
    resetContent();
    setDraft(content);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-champagne pb-32">
      <header className="sticky top-0 z-10 bg-white border-b border-charcoal/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-serif text-burgundy">Admin Undangan</h1>
          <p className="text-xs text-charcoal/50">Perubahan di sini hanya preview di browser ini sampai kamu export &amp; deploy.</p>
        </div>
        <a href="/" className="text-xs font-semibold text-burgundy border border-burgundy rounded-lg px-3 py-2 hover:bg-burgundy/5">
          Lihat Undangan
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Section title="Nama Pasangan">
          <Field label="Nama singkat (header & popup)" value={draft.couple.shortName} onChange={(v) => set('couple', { ...draft.couple, shortName: v })} />
          <Field label="Nama lengkap mempelai wanita" value={draft.couple.bride.name} onChange={(v) => set('couple', { ...draft.couple, bride: { ...draft.couple.bride, name: v } })} />
          <Field label="Orang tua mempelai wanita" value={draft.couple.bride.parents} onChange={(v) => set('couple', { ...draft.couple, bride: { ...draft.couple.bride, parents: v } })} textarea />
          <Field label="Nama lengkap mempelai pria" value={draft.couple.groom.name} onChange={(v) => set('couple', { ...draft.couple, groom: { ...draft.couple.groom, name: v } })} />
          <Field label="Orang tua mempelai pria" value={draft.couple.groom.parents} onChange={(v) => set('couple', { ...draft.couple, groom: { ...draft.couple.groom, parents: v } })} textarea />
        </Section>

        <Section title="Tanggal Pernikahan">
          <Field label="Tampilan tanggal (contoh: Sabtu, 05 September 2026)" value={draft.wedding.dateLabel} onChange={(v) => set('wedding', { ...draft.wedding, dateLabel: v })} />
          <Field label="Tanggal &amp; waktu untuk hitung mundur (format ISO, contoh: 2026-09-05T09:00:00+07:00)" value={draft.wedding.dateISO} onChange={(v) => set('wedding', { ...draft.wedding, dateISO: v })} />
        </Section>

        <Section title="Lokasi Akad">
          <Field label="Waktu (contoh: 09 : 00 WIB)" value={draft.akad.time} onChange={(v) => set('akad', { ...draft.akad, time: v })} />
          <Field label="Nama lokasi" value={draft.akad.locationName} onChange={(v) => set('akad', { ...draft.akad, locationName: v })} />
          <Field label="Alamat lengkap" value={draft.akad.address} onChange={(v) => set('akad', { ...draft.akad, address: v })} textarea />
        </Section>

        <Section title="Lokasi Resepsi">
          <Field label="Waktu (contoh: 11 : 00 - 14 : 00 WIB)" value={draft.resepsi.time} onChange={(v) => set('resepsi', { ...draft.resepsi, time: v })} />
          <Field label="Nama lokasi" value={draft.resepsi.locationName} onChange={(v) => set('resepsi', { ...draft.resepsi, locationName: v })} />
          <Field label="Alamat lengkap" value={draft.resepsi.address} onChange={(v) => set('resepsi', { ...draft.resepsi, address: v })} textarea />
        </Section>

        <Section title="Link Google Maps">
          <Field label="URL Google Maps" value={draft.googleMapsUrl} onChange={(v) => set('googleMapsUrl', v)} />
        </Section>

        <Section title="Foto">
          <Field label="URL foto hero (background halaman utama)" value={draft.photos.hero} onChange={(v) => set('photos', { ...draft.photos, hero: v })} />
          <Field label="URL foto mempelai wanita" value={draft.photos.bride} onChange={(v) => set('photos', { ...draft.photos, bride: v })} />
          <Field label="URL foto mempelai pria" value={draft.photos.groom} onChange={(v) => set('photos', { ...draft.photos, groom: v })} />
          <p className="text-xs text-charcoal/50">Kosongkan untuk memakai foto bawaan di folder <code>src/foto</code>. Isi dengan URL gambar (contoh hasil upload ke Imgur/Google Drive) untuk mengganti.</p>
        </Section>

        <Section title="Teks">
          <Field label="Sambutan di popup undangan" value={draft.texts.popupGreeting} onChange={(v) => set('texts', { ...draft.texts, popupGreeting: v })} textarea />
          <Field label="Deskripsi bagian Pasangan Mempelai" value={draft.texts.coupleSectionDescription} onChange={(v) => set('texts', { ...draft.texts, coupleSectionDescription: v })} textarea />
          <Field label="Deskripsi Akad Nikah" value={draft.texts.akadDescription} onChange={(v) => set('texts', { ...draft.texts, akadDescription: v })} textarea />
          <Field label="Deskripsi Resepsi" value={draft.texts.resepsiDescription} onChange={(v) => set('texts', { ...draft.texts, resepsiDescription: v })} textarea />
          <Field label="Deskripsi bagian Lokasi" value={draft.texts.locationDescription} onChange={(v) => set('texts', { ...draft.texts, locationDescription: v })} textarea />
        </Section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal/10 px-4 py-4 flex flex-wrap items-center justify-center gap-3">
        <button onClick={handleSave} className="bg-burgundy text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-burgundy/90 transition-colors">
          Simpan Preview
        </button>
        <button onClick={handleExport} className="border border-burgundy text-burgundy rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-burgundy/5 transition-colors">
          Export content.json
        </button>
        <button onClick={handleReset} className="text-charcoal/50 text-sm underline">
          Reset ke default
        </button>
        {savedAt && <span className="text-xs text-sage font-semibold">Tersimpan, buka "Lihat Undangan" untuk cek.</span>}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <AdminForm />;
}
