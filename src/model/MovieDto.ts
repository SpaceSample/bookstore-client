export interface MovieDto {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
  rate: {
    rate: number;
    count: number;
  };
}

export interface MovieSummaryDto {
  id: number;
  title: string;
  posterUrl: string;
  rate: {
    rate: number;
    count: number;
  };
}