// A file that includes all interfaces needed to handle Setlist.fm data

interface SetlistFmArtistArray {
    disambiguation: string;
    mbid: string;
    name: string;
    sortName: string;
    url: string;
  }
interface SetlistFmSetArray {
    set: SetlistFmSetSetArray[];
}
interface SetlistFmSetSetArray {
    encore?: number;
    song: SetlistFmSetSongArray[];
}
interface SetlistFmSetSongArray {
    name: string;
}
interface SetlistfmTourName {
    name: string;
}
interface SetlistfmVenueCityCoords {
    lat: number;
    long: number;
}
interface SetlistfmVenueCityCountry {
    code: string;
    name: string;
}
interface SetlistfmVenueCity {
    coords: SetlistfmVenueCityCoords;
    country: SetlistfmVenueCityCountry;
    id: string;
    name: string;
    state: string;
    stateCode: string;
}
interface SetlistfmVenue {
    city: SetlistfmVenueCity;
    id: string;
    name: string;
    url: string;
}
export interface SetlistFmSetlistArray {
    artist: SetlistFmArtistArray;
    eventDate: string;
    id: string;
    info: string;
    lastUpdated: string;
    sets: SetlistFmSetArray;
    showMe?: boolean;
    paranoidPlayed?: boolean;
    tour: SetlistfmTourName;
    url: string;
    venue: SetlistfmVenue;
    versionId: string;
}
export interface SetlistfmData {
    itemsPerPage: number;
    page: number;
    setlist: SetlistFmSetlistArray[];
    total: number;
    type: string;
}

export const EmptySetlistfmData: SetlistfmData = {
    itemsPerPage: null,
    page: null,
    setlist: [],
    total: null,
    type: ''
};
