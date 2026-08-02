import { useCallback, useEffect, useState } from 'react';
import { defaultContent, type SiteContent } from '../content';

const STORAGE_KEY = 'wedding_content_override';

function deepMerge<T>(base: T, override: Partial<T> | undefined): T {
  if (!override) return base;
  const result: any = Array.isArray(base) ? [...(base as any)] : { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = (override as any)[key];
    const baseValue = (base as any)[key];
    if (
      overrideValue &&
      typeof overrideValue === 'object' &&
      !Array.isArray(overrideValue) &&
      baseValue &&
      typeof baseValue === 'object'
    ) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }
  return result;
}

function readOverride(): Partial<SiteContent> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Menggabungkan konten default dari src/content.ts dengan hasil edit di
 * halaman admin (disimpan di localStorage, khusus preview per-browser).
 */
export function useContent() {
  const [content, setContent] = useState<SiteContent>(() =>
    deepMerge(defaultContent, readOverride())
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setContent(deepMerge(defaultContent, readOverride()));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateContent = useCallback((partial: Partial<SiteContent>) => {
    const current = readOverride() ?? {};
    const nextOverride = deepMerge(current as SiteContent, partial);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOverride));
    } catch {
      /* ignore quota errors */
    }
    setContent(deepMerge(defaultContent, nextOverride));
  }, []);

  const resetContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setContent(defaultContent);
  }, []);

  return { content, updateContent, resetContent };
}
