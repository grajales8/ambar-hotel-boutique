"use client";

/**
 * Capa de persistencia de la app y del panel administrativo.
 *
 * Antes: guardaba todo en localStorage (solo visible en ese navegador).
 * Ahora: lee y escribe en Firestore, así que lo que edites en /admin se ve
 * igual en cualquier dispositivo — computador, celular, el de otro
 * empleado — de inmediato.
 *
 * La forma de usar estas funciones no cambió (loadCollection/saveCollection),
 * solo que ahora son asíncronas (devuelven una Promise), porque hablan con
 * un servidor en vez de leer del navegador.
 */

import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

export async function loadCollection<T extends { id?: string }>(
  collectionName: string,
  fallback: T[]
): Promise<T[]> {
  try {
    const snap = await getDocs(collection(db, collectionName));
    if (snap.empty) return fallback;
    // Firestore no garantiza el orden de lectura, así que ordenamos por id
    // (los ids por defecto ya son secuenciales: "r-1", "r-2"...; los nuevos
    // agregados desde el admin incluyen la fecha de creación en el id, así
    // que también quedan en orden). Descubre Cali usa además su propio
    // campo `order` para el reordenamiento manual.
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as T)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  } catch (err) {
    console.error(`No se pudo leer "${collectionName}" de Firestore`, err);
    return fallback;
  }
}

export async function saveCollection<T extends { id: string }>(
  collectionName: string,
  data: T[]
): Promise<void> {
  try {
    const colRef = collection(db, collectionName);
    const existingSnap = await getDocs(colRef);
    const existingIds = new Set(existingSnap.docs.map((d) => d.id));
    const nextIds = new Set(data.map((item) => item.id));

    const batch = writeBatch(db);

    // Guarda/actualiza cada elemento actual.
    data.forEach((item) => {
      batch.set(doc(db, collectionName, item.id), item);
    });

    // Elimina los que ya no están en la lista (se borraron desde el admin).
    existingIds.forEach((id) => {
      if (!nextIds.has(id)) {
        batch.delete(doc(db, collectionName, id));
      }
    });

    await batch.commit();
  } catch (err) {
    console.error(`No se pudo guardar "${collectionName}" en Firestore`, err);
  }
}

export async function resetCollection(collectionName: string): Promise<void> {
  try {
    const snap = await getDocs(collection(db, collectionName));
    const batch = writeBatch(db);
    snap.docs.forEach((d) => batch.delete(doc(db, collectionName, d.id)));
    await batch.commit();
  } catch (err) {
    console.error(`No se pudo reiniciar "${collectionName}" en Firestore`, err);
  }
}

/**
 * Lee un solo documento con id fijo (para configuración única, como la
 * información general del hotel).
 */
export async function loadSingleton<T>(
  collectionName: string,
  id: string,
  fallback: T
): Promise<T> {
  try {
    const snap = await getDoc(doc(db, collectionName, id));
    if (!snap.exists()) return fallback;
    return snap.data() as T;
  } catch (err) {
    console.error(`No se pudo leer "${collectionName}/${id}" de Firestore`, err);
    return fallback;
  }
}

/**
 * Guarda un solo documento con id fijo (para configuración única, como
 * la información general del hotel). No usa cola/lote porque siempre es
 * un único documento.
 */
export async function saveSingleton<T extends object>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (err) {
    console.error(`No se pudo guardar "${collectionName}/${id}" en Firestore`, err);
  }
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (err) {
    console.error(`No se pudo eliminar "${collectionName}/${id}" de Firestore`, err);
  }
}

/**
 * Retrasa la escritura hasta que el usuario deja de escribir por `delay` ms.
 * Evita mandar una escritura a Firestore en cada tecla presionada mientras
 * se edita un campo de texto en el admin.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 700
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Sesión simple del admin (solo para ocultar el panel tras una contraseña
// de operación diaria; no reemplaza un sistema de autenticación real).
// Esto sigue siendo local a cada dispositivo — es solo la "llave" que abre
// el panel en ESE navegador, no datos que deban sincronizarse.
const SESSION_KEY = "ambar-admin:session";

export function setAdminSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) window.sessionStorage.setItem(SESSION_KEY, "1");
  else window.sessionStorage.removeItem(SESSION_KEY);
}

export function hasAdminSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}
