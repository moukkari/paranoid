// A file that includes all needed interfaces to handle Spotify API data.

interface SpotifyExternalUrls {
    spotify: string;
}
interface SpotifyTrackAlbum {
    release_date: string;
    id: string;
    external_urls: SpotifyExternalUrls;
}

export interface SpotifyTrack {
    album: SpotifyTrackAlbum;
    artists: string[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
export const EmptySpotifyTrack: SpotifyTrack = {
    album: { release_date: '', id: '', external_urls: { spotify: ''} },
    artists: [],
    available_markets: [],
    disc_number: null,
    duration_ms: null,
    explicit: false,
    external_ids: [],
    external_urls: { spotify: '' },
    href: '',
    id: '',
    is_local: false,
    name: '',
    popularity: null,
    preview_url: '',
    track_number: null,
    type: '',
    uri: ''
};

interface SpotifySearchDataArtists {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
interface SpotifyImageObject {
    height: number;
    url: string;
    width: number;
}
interface SpotifySearchDataAlbum {
    album_type: string;
    artists: SpotifySearchDataArtists[];
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}
interface SpotifyExternalIds {
    isrc: string;
}
export interface SpotifySearchData {
    album: SpotifySearchDataAlbum;
    artists: SpotifySearchDataArtists[];
    available_markets: string[];
    disc_number: 1;
    duration_ms: number;
    explicit: boolean;
    external_ids: SpotifyExternalIds;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
const EmptyArtistsData: SpotifySearchDataArtists = {external_urls: {spotify: ''}, href: '', id: '', name: '', type: '', uri: ''};
export const EmptySearchData: SpotifySearchData[] = [
    {
    artists: [EmptyArtistsData],
    album: {
        album_type: '',
        artists: [EmptyArtistsData],
        available_markets: [''],
        external_urls: {spotify: ''},
        href: '',
        id: '',
        images: [{height: null, width: null, url: ''}],
        name: '',
        release_date: '',
        release_date_precision: '',
        total_tracks: null,
        type: '',
        uri: ''
    },
    available_markets: ['fi'],
    disc_number: null,
    duration_ms: null,
    explicit: false,
    external_ids: { isrc: ''},
    external_urls: {spotify: ''},
    href: '',
    id: '',
    is_local: false,
    name: '',
    popularity: null,
    preview_url: '',
    track_number: null,
    type: '',
    uri: '',
    }];
