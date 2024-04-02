export interface iTunesResults {
  trackName: string;
  artistName: string;
  artworkUrl60: string;
  previewUrl: string;
  trackId: string;
  wrapperType: string;
  kind: string;
}

export const channelName = "search-results-channel";

export enum FilterValues {
  All = "All",
  Track = "track",
  Audiobook = "audiobook",
  Song = "song",
  Podcast = "podcast",
  TVEpisode = "tv-episode",
  FeatureMovie = "feature-movie",
}
