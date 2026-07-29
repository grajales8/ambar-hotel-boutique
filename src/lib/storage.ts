"use client";

/**
 * Capa de persistencia del panel administrativo.
 *
 * Hoy guarda todo en localStorage del navegador para que el admin funcione
 * sin backend. Cada función está documentada con su equivalente en
 * Firestore/Supabase para cuando se migre (ver BACKEND_PROVIDER en config.ts).
 *
 * Firestore (ejemplo):
 *   const snap = await getDocs(collection(db, "restaurantItems"));
 *   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
 *
 * Supabase (ejemplo):
 *   const { data } = await supabase.from("restaurant_items").select("*");
 *   return data;
 */

const NAMESPACE = "ambar-admin";

function key(collection: string) {
  return `${NAMESPACE}:${collection}`;
}

export function loadCollection<T>(collection: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key(collection));
    if (!raw) return fallback;
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

export function saveCollection<T>(collection: string, data: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key(collection), JSON.stringify(data));
}

export function resetCollection(collection: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key(collection));
}

// Sesión simple del admin (solo para ocultar el panel tras una contraseña
// de operación diaria; no reemplaza un sistema de autenticación real).
const SESSION_KEY = `${NAMESPACE}:session`;

export function setAdminSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) window.sessionStorage.setItem(SESSION_KEY, "1");
  else window.sessionStorage.removeItem(SESSION_KEY);
}

export function hasAdminSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}
