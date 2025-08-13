import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";
import {
  BellRing,
  Bot,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export default function InfiniteMovingCardsFeatures() {
  return (
    <div>
      <InfiniteMovingCards
        items={featuresDetail}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const featuresDetail = [
  {
    quote: <Bot className="h-6 w-6" aria-hidden />,
    name: "AI Parsing Cerdas",
    title:
      "Ketik natural:'ingatkan aku besok 08:00 ambil paket'. AI paham tanggal relatif dan konteks.",
  },
  {
    quote: <BellRing className="h-6 w-6" aria-hidden />,
    name: "Reminder ke Diri & Teman",
    title:
      "Tag teman atau kirim langsung ke kontak—nada tetap sopan dan personal.",
  },
  {
    quote: <Users className="h-6 w-6" aria-hidden />,
    name: "Manajemen Teman Lengkap",
    title:
      "Kelola teman, izin, grup kecil, dan preferensi jam lintas zona waktu.",
  },
  {
    quote: <ShieldCheck className="h-6 w-6" aria-hidden />,
    name: "Privasi Terjaga",
    title:
      "Enkripsi in transit, kontrol data, dan opsi auto delete untuk percakapan sensitif.",
  },
  {
    name: "Nada Personal & Hangat",
    quote: <Sparkles className="h-6 w-6" aria-hidden />,
    title: "Template pesan humanis yang bisa diatur sesuai kepribadian.",
  },
  {
    name: "Pintar Zona Waktu",
    quote: <Clock className="h-6 w-6" aria-hidden />,
    title: "Janji lintas kota? Waktu otomatis disesuaikan agar tepat momen.",
  },
];
