export interface AlbumImageItem {
    '#text': string;
    size: string;
}
export interface AlbumImageNumber {
    0: AlbumImageItem;
    1: AlbumImageItem;
    2: AlbumImageItem;
    3: AlbumImageItem;
}

export interface AlbumItem {
    '@attr': string;
    artist: string;
    image: AlbumImageNumber;
    mbid: string;
    title: string;
    url: string;
}

export interface ArtistItem {
    mbid?: string;
    name?: string;
    url?: string;
}

export interface StreamableItem {
    '#text': string;
    fulltrack: string;
}

export interface TopTagsItem {
    tag: ArtistItem[];
}

export interface WikiItem {
    content: string;
    published: string;
    summary: string;
}

export interface Track {
    album?: AlbumItem;
    artist?: ArtistItem;
    duration?: string;
    listeners?: string;
    mbid?: string;
    name?: string;
    playcount?: string;
    streamable?: StreamableItem;
    toptags?: TopTagsItem;
    url?: string;
    wiki?: WikiItem;
}

// Not used atm
export interface Album {
    album_type: string;
    artists: number[];
    available_markets: string[];
    external_urls: string[];
    href: string;
    id: string;
    images: number[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export const EmptyTrack: Track = {
    album: {'@attr': '0', artist: '',
        image: {0: {'#text': '', size: ''}, 1: {'#text': '', size: ''},
            2: {'#text': '', size: ''}, 3: {'#text': '', size: ''}},
        mbid: '', title: '', url: ''
    },
    artist: {
        mbid: '',
        name: '',
        url: ''
    },

    duration: '',
    listeners: '',
    mbid: '',
    name: '',
    playcount: '',

    streamable: {
        '#text': '',
        fulltrack: ''
    },

    toptags: {
        tag: [{name: '', url: ''}]
    },

    url: '',
    wiki: {
        content: '',
        published: '',
        summary: ''
    }
};
