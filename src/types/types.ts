import { ReactNode } from "react";

export type GifRating = "g" | "pg" | "pg-13" | "r" | "rx" | "rx-17"

export interface Gif {
    id: string;
    image: string;
    slug: string;
    original: string;
}

export interface IGifContext {
    favourites: Array<Gif>;
    headerGif: string;
    searchQuery: string;
    currentTab: "gifs" | "stickers";
    changeTab: (tab: "gifs" | "stickers") => void;
    addSearchQuery: (query: string) => void;
    addHeaderGif: (gif: string) => void;
    addFavourite: (gif: Gif) => void;
    removeFavourite: (gif: Gif) => void;
    clearFavourites: () => void;
}

export interface GifProviderProps {
    children: ReactNode;
}

