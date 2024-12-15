import { createContext, useState, useContext, useEffect } from "react";
import { GifProviderProps, Gif, IGifContext } from "../types/types";

// Create a context using the createContext API
const GifStoreContext = createContext<IGifContext | undefined>(
    undefined
);

/**
 * FavouritesProvider component to manage favourites at the application level. This component is using the createContext API to create a context provider and consumer. The context provider is used to set the initial state of the favourites array and the context consumer is used to access the state and functions of the context provider.
 *
 * @param children - ReactNode to include children components
 * @returns FavouritesProvider component
 */
export const GifProvider = ({ children }: GifProviderProps) => {
    const [favourites, setfavourites] = useState<Array<Gif>>(() => {
        const storedFavourites = localStorage.getItem("favourites");
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    });
    const [headerGif, setHeaderGif] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentTab, setCurrentTab] = useState<"gifs" | "stickers">("gifs");

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const addHeaderGif = (gif: string) => {
        setHeaderGif(gif);
    }

    const addFavourite = (gif: Gif) => {
        if (!favourites.find((_) => _.id === gif.id)) {
            setfavourites((prev) => [...prev, gif]);
        }
    };

    const removeFavourite = (gif: Gif) => {
        setfavourites((prev) => prev.filter((_) => _.id !== gif.id));
    };

    const clearFavourites = () => {
        setfavourites([]);
    };

    const addSearchQuery = (query: string) => {
        setSearchQuery(query);
    }

    const changeTab = (tab: "gifs" | "stickers") => {
        setCurrentTab(tab);
    }

    return (
        <GifStoreContext.Provider
            value={{
                favourites,
                headerGif,
                searchQuery,
                currentTab,
                changeTab,
                addSearchQuery,
                addHeaderGif,
                addFavourite,
                removeFavourite,
                clearFavourites,
            }}
        >
            {children}
        </GifStoreContext.Provider>
    );
};

// Custom hook to use GifStoreContext
export const useGifContext = (): IGifContext => {
    const context = useContext(GifStoreContext);
    if (!context) {
        throw new Error("useFavourites must be used within a FavouritesProvider");
    }
    return context;
};
