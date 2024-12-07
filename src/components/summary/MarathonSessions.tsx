import React from 'react';
import { NetflixSummary } from '../../types/netflix';
import { Trophy } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface MarathonSessionsProps {
  sessions: NetflixSummary['marathonSessions'];
}

export const MarathonSessions: React.FC<MarathonSessionsProps> = ({ sessions }) => {
  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <div key={`${session.series}-${session.date}`} 
             className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r 
                        from-[#E50914]/5 to-[#831010]/5">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Trophy className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{session.series}</h4>
              <p className="text-sm text-gray-600">{formatDate(new Date(session.date))}</p>
            </div>
          </div>
          <div className="text-[#E50914] font-bold">
            {session.episodesCount} episodis
          </div>
        </div>
      ))}
    </div>
  );
};