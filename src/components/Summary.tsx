import React, { useRef } from "react";
import { NetflixSummary, NetflixData } from "../types/netflix";
import { PlayCircle, Calendar, Share2 } from "lucide-react";
import { StatCard } from "./summary/StatCard";
import { TopList } from "./summary/TopList";
import { MarathonSessions } from "./summary/MarathonSessions";
import { exportToImage } from "../utils/imageExport";

interface SummaryProps {
  summary: NetflixSummary;
  rawData: NetflixData[];
}

export const Summary: React.FC<SummaryProps> = ({ summary, rawData }) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (summaryRef.current) {
      try {
        await exportToImage(summaryRef.current);
      } catch (error) {
        console.error("Error generating image:", error);
        alert("Hi ha hagut un error generant la imatge");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={summaryRef}
        className="w-full max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl"
      >
        <h2
          className="title-wrapped text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#E50914] to-[#831010] 
                       text-transparent bg-clip-text"
        >
          El teu Netflix wrapped
        </h2>

        <div className="grid gap-8">
          <StatCard
            icon={PlayCircle}
            title="Continguts visualitzats"
            className="stat-card-visualizations"
          >
            <p className="text-4xl md:text-5xl font-bold text-[#E50914]">
              {summary.totalShows}
            </p>
          </StatCard>

          <StatCard
            icon={Calendar}
            title="Top 5 sèries"
            className="stat-card-top-list"
          >
            <TopList
              items={summary.topSeries.map((series) => ({
                name: series.name,
                count: series.count,
                label: "episodis",
              }))}
            />
          </StatCard>

          <StatCard
            icon={PlayCircle}
            title="Maratons"
            className="stat-card-marathons"
          >
            <MarathonSessions sessions={summary.marathonSessions} />
          </StatCard>
        </div>

        <div className="mt-12 text-center">
          <p className="do-it text-sm md:text-base font-medium text-gray-500">
            Fes el teu a 🎬 netflix-wrapped.nuvol.cat
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E50914] to-[#831010] 
                   text-white rounded-lg hover:opacity-90 transition-opacity duration-200 
                   font-semibold shadow-md"
        >
          <Share2 className="w-5 h-5" />
          Compartir a xarxes socials
        </button>
      </div>
    </div>
  );
};
