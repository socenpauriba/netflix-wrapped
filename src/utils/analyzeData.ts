import { NetflixData, NetflixSummary } from '../types/netflix';
import { DAYS_OF_WEEK, MONTHS, MARATHON_THRESHOLD } from './constants';

export const analyzeNetflixData = (data: NetflixData[]): NetflixSummary => {
  const seriesCount: { [key: string]: number } = {};
  const monthCount: { [key: string]: number } = {};
  const dayCount: { [key: string]: number } = {};
  const marathons: Map<string, NetflixData[]> = new Map();

  // Initialize counts
  MONTHS.forEach(month => monthCount[month] = 0);
  DAYS_OF_WEEK.forEach(day => dayCount[day] = 0);

  // Group episodes by date for marathon detection
  data.forEach(entry => {
    const dateKey = entry.date.toISOString().split('T')[0];
    if (!marathons.has(dateKey)) {
      marathons.set(dateKey, []);
    }
    marathons.get(dateKey)?.push(entry);

    // Count series
    if (entry.series) {
      seriesCount[entry.series] = (seriesCount[entry.series] || 0) + 1;
    }

    // Count by month
    const month = MONTHS[entry.date.getMonth()];
    monthCount[month]++;

    // Count by day of week
    const day = DAYS_OF_WEEK[entry.date.getDay()];
    dayCount[day]++;
  });

  // Find marathon sessions
  const marathonSessions = Array.from(marathons.entries())
    .filter(([, episodes]) => episodes.length >= MARATHON_THRESHOLD)
    .map(([date, episodes]) => ({
      series: episodes[0].series || episodes[0].title,
      episodesCount: episodes.filter(ep => ep.series === episodes[0].series).length,
      date
    }))
    .sort((a, b) => b.episodesCount - a.episodesCount)
    .slice(0, 5);

  return {
    totalShows: data.length,
    topSeries: Object.entries(seriesCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
    watchingPatterns: {
      byMonth: Object.entries(monthCount)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)),
      byDayOfWeek: Object.entries(dayCount)
        .map(([day, count]) => ({ day, count }))
        .sort((a, b) => DAYS_OF_WEEK.indexOf(a.day) - DAYS_OF_WEEK.indexOf(b.day))
    },
    marathonSessions
  };
};