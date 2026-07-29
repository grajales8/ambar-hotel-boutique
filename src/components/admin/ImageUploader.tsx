"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";

// Formatos aceptados, según lo solicitado.
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Límite de tamaño de salida: la imagen se redimensiona y comprime antes de
// guardarse, para no llenar el almacenamiento del navegador con fotos pesadas.
const MAX_DIMENSION = 1000; // px, lado más largo
const JPEG_QUALITY = 0.72;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Sube una imagen desde el computador, la redimensiona/comprime en el propio
 * navegador (sin backend) y la entrega como un data URI listo para guardarse
 * en el mismo campo `image` que ya usa cada producto/lugar — exactamente el
 * mismo sistema de almacenamiento (localStorage vía /src/lib/storage.ts) que
 * ya emplea el proyecto, sin requerir un servidor de archivos aparte.
 *
 * Al conectar Firebase/Supabase más adelante, este componente puede seguir
 * igual: solo cambiaría qué hace `onChange` con el resultado (subirlo a
 * Storage y guardar la URL, en vez de guardar el data URI directamente).
 */
export default function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrlOrUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  function isValidFile(file: File) {
    const nameLower = file.name.toLowerCase();
    const extensionOk = ACCEPTED_EXTENSIONS.some((ext) => nameLower.endsWith(ext));
    const typeOk = ACCEPTED_TYPES.includes(file.type) || file.type.startsWith("image/");
    return extensionOk && typeOk;
  }

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
      reader.readAsDataURL(file);
    });
  }

  function loadImageElement(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("El archivo no es una imagen válida"));
      img.src = src;
    });
  }

  async function compressImage(file: File): Promise<string> {
    const rawDataUrl = await readFileAsDataUrl(file);
    const img = await loadImageElement(rawDataUrl);

    let { width, height } = img;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      if (width > height) {
        height = Math.round(height * (MAX_DIMENSION / width));
        width = MAX_DIMENSION;
      } else {
        width = Math.round(width * (MAX_DIMENSION / height));
        height = MAX_DIMENSION;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return rawDataUrl; // fallback si el navegador no soporta canvas

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (!isValidFile(file)) {
      setStatus("error");
      setMessage("Formato no válido. Usa JPG, JPEG, PNG o WEBP.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
      setStatus("success");
      setMessage("Imagen cargada correctamente.");
      setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 2000);
    } catch {
      setStatus("error");
      setMessage("No se pudo procesar la imagen. Intenta con otro archivo.");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0]);
    e.target.value = ""; // permite volver a seleccionar el mismo archivo
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  function handleRemove() {
    onChange("");
    setStatus("idle");
    setMessage("");
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          dragActive ? "border-[var(--color-gold)] bg-[var(--color-sand)]" : "border-[var(--color-sand-2)]"
        }`}
      >
        {value ? (
          <div className="relative h-32 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Eliminar imagen"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[var(--color-navy)] shadow-[var(--shadow-card)]"
            >
              <X size={14} />
            </button>
            {status === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 size={22} className="animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-32 w-full flex-col items-center justify-center gap-2 text-[var(--color-ink-soft)]"
          >
            {status === "loading" ? (
              <Loader2 size={22} className="animate-spin text-[var(--color-navy)]" />
            ) : (
              <ImagePlus size={22} className="text-[var(--color-navy)]" />
            )}
            <span className="text-xs">Arrastra una imagen aquí o</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white">
              <Upload size={12} />
              Subir imagen
            </span>
          </button>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-sand)] px-3 py-1.5 text-xs font-medium text-[var(--color-navy)]"
        >
          <Upload size={12} />
          Cambiar imagen
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {status === "success" && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600">
          <CheckCircle2 size={13} />
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={13} />
          {message}
        </p>
      )}
    </div>
  );
}
