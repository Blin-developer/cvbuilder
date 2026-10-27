const STORAGE_KEY = 'cvbuilder_data_v1';

export function loadCV() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Gabim gjatë leximit nga LocalStorage:', err);
    return null;
  }
}

export function saveCV(data) {
  if (typeof window === 'undefined') return { ok: false };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch (err) {
    console.error('Gabim gjatë ruajtjes:', err);
    return { ok: false, error: err.message };
  }
}

export function clearCV() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Gabim gjatë fshirjes:', err);
  }
}