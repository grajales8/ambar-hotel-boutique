// Tipos centrales de la app. Estas formas están pensadas para mapear 1:1
// con futuras colecciones de Firestore / tablas de Supabase, así que al
// migrar de datos mock a backend real, estos tipos no deberían cambiar.

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number; // COP
  image: string;
  available: boolean;
};

export type CartLine = {
  item: MenuItem;
  quantity: number;
  notes?: string;
};

export type ServiceRequestItem = {
  id: string;
  name: string;
  icon: string; // nombre de icono lucide-react
  description?: string;
};

export type GuideSection = {
  id: string;
  title: string;
  icon: string;
  image?: string;
  content: string[]; // párrafos o bullets
  scope: "habitacion" | "hotel";
};

export type ScheduleEntry = {
  id: string;
  label: string;
  hours: string;
};

export type PlaceOfInterest = {
  id: string;
  name: string;
  description: string;
  image: string;
  mapsQuery: string; // usado para construir el link a Google Maps
};

export type HotelInfo = {
  name: string;
  tagline: string;
  wifiSsid: string;
  wifiPassword: string;
  whatsappNumber: string; // formato internacional sin '+' ej. 573001234567
  emergencyNumbers: { label: string; number: string }[];
  checkOutTime: string;
  googleReviewUrl: string;
};
