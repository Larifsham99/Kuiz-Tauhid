import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { useDb, useMe } from "../lib/store";
import { summary } from "../lib/gamification";
import { BAB } from "../data";
import { BabIcon } from "../components/icons";
import { PageHeader, Stars } from "../components/ui";

export default function Nota() {
  const me = useMe()!; const d = useDb(); const s = summary(d, me.id);
  return (
    <div>
      <PageHeader title="Nota" subtitle="Nota ringkas & kad imbas bagi 12 bab" icon={<BookOpen />} />
      <div className="grid gap-3 sm:grid-cols-2">
        {BAB.map((b) => {
          const st = s.stats.find((x) => x.chapterId === b.id)!;
          return (
            <Link key={b.id} to={`/nota/${b.id}`} className="card flex items-start gap-3 p-4">
              <BabIcon name={b.ikon} tile size={26} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[11px] font-bold text-slate-400">Bab {b.no}{st.read && <span className="inline-flex items-center gap-0.5 text-zamrud-600"><CheckCircle2 size={12} /> dibaca</span>}</span>
                <span className="block font-extrabold leading-tight">{b.tajuk}</span>
                <span className="font-arab block text-right text-lg text-slate-500" dir="rtl">{b.arab}</span>
                <span className="block text-xs text-slate-500">{b.ringkas}</span>
              </span>
              <Stars n={st.stars} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
