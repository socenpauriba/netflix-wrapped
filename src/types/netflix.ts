export interface NetflixData {
  title: string;
  date: Date;
  series?: string;
  season?: string;
  episode?: string;
}

export interface NetflixSummary {
  totalShows: number;
  topSeries: Array<{
    name: string;
    count: number;
  }>;
  watchingPatterns: {
    byMonth: Array<{
      month: string;
      count: number;
    }>;
    byDayOfWeek: Array<{
      day: string;
      count: number;
    }>;
  };
  marathonSessions: Array<{
    series: string;
    episodesCount: number;
    date: string;
  }>;
}