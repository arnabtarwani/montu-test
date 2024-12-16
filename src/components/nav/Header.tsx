import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { getTrending } from "../../api/trending";
import { generateRandomPhrase, genRandomInt, getRandomGif } from "../../lib/utils";
import { Input } from "../ui/input";
import { CircleX, Loader2, Search, TrendingUp, X } from "lucide-react";
import { debounce } from "../../lib/debounce";
import { getSearchSuggestions, getTrendingSearches } from "../../api/search";
import { useGifContext } from "../../context/GifContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Button } from "../ui/button";
import { cn } from "../../lib/class-merger";

type Route = {
    path: string;
    label: string;
}

interface INavbarProps {
    routes: Route[]
}

/**
 * Header component for the app
 * @param {INavbarProps} props  
 */
export const Header = ({ routes }: INavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [placeholderText, setPlaceholderText] = useState<string>(generateRandomPhrase());
    const [searchSuggestions, setSearchSuggestions] = useState<Array<string>>([]);
    const [trendingSearches, setTrendingSearches] = useState<Array<string>>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { headerGif, searchQuery, currentTab, changeTab, addSearchQuery, addHeaderGif } = useGifContext()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const suggestionsRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    /**
     * useOutsideClick is a custom hook that checks if the user clicks outside of a specified element.
     * If the user clicks outside of the element, the provided callback function is called.
    */
    useOutsideClick({
        ref: suggestionsRef,
        trendingSearchRef: dropdownRef,
        onClose: () => {
            if (!dropdownRef.current?.focus({
                preventScroll: true,
            })) {
                setShowSuggestions(false);
            }
        },
    })

    /**
    * fetchTrendingStuff is responsible for fetching trending GIF-related data.
    * It retrieves a random trending sticker and a list of trending search terms.
    * @returns {Promise<void>}
    * @throws {Error} If the fetch request fails.
    * @throws {Error} If the response data is invalid.
    */
    const fetchTrendingStuff = useCallback(async () => {
        const abortController = new AbortController();

        try {
            const getTrendingEmoji = async () => {
                try {
                    const data = await getTrending({
                        type: "stickers",
                        abortController: abortController,
                        limit: 1,
                        offset: genRandomInt(0, 1000),
                        rating: "g"
                    });

                    if (data.data.length > 0) {
                        const randomSticker = getRandomGif(data.data);

                        addHeaderGif(randomSticker?.images?.downsized_small?.mp4)
                    }
                } catch (error) {
                    setError(true);
                    console.error("Failed to fetch trending sticker:", error);
                }
            }

            const trendingSearches = async () => {
                try {
                    const data = await getTrendingSearches({
                        abortController: abortController
                    });

                    if (data.length === 0) {
                        return;
                    }

                    setTrendingSearches(data?.data?.slice(0, 5))
                } catch (error) {
                    console.error("Failed to fetch trending searches:", error);
                }
            }

            if (!headerGif.length) {
                getTrendingEmoji();
            }

            if (!trendingSearches.length) {
                trendingSearches();
            }
        } catch (error) {
            setError(true)
            console.error("Error fetching trending stuff:", error);
        } finally {
            return () => {
                abortController.abort();
                setLoading(false);
            }
        }
    }, [])

    useEffect(() => {
        if (!(searchQuery || location.pathname.includes("/search"))) {
            setLoading(false);
            setSearchSuggestions([]);
            addSearchQuery("");
        }

        fetchTrendingStuff()

        const interval = setInterval(() => {
            setPlaceholderText(generateRandomPhrase());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [searchQuery, location.pathname]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        addSearchQuery(e.target.value);
        const debounceSearch = debounce(async (query: string) => {

            if (query.length === 0) {
                setSearchSuggestions([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            const res = await getSearchSuggestions({
                term: query
            })

            if (res.data.length > 0) {
                const suggestions = res.data.map((suggestion: {
                    name: string;
                    analytics_response_payload: string;
                }) => suggestion.name);

                setSearchSuggestions(suggestions);
                setLoading(false);
            }
        }, 500);

        setLoading(false);
        return debounceSearch(e.target.value);
    }, []);

    const handleCancelSearch = () => {
        addSearchQuery("")
        if (location.pathname.includes("/search")) {
            navigate("/")
        }
    }

    return (
        <nav className="sticky top-0 z-40 backdrop-blur-md flex justify-between items-center px-4 py-10 text-gray-100">
            <div onClick={() => {
                navigate('/')
            }} ref={suggestionsRef} className="flex items-center space-x-4 cursor-pointer">
                {headerGif ?
                    <video src={headerGif} autoPlay muted loop className="w-20 h-20" />
                    : <div className="w-20 h-20 flex justify-center items-center" aria-label="Loading Placeholder">
                        {error ? <CircleX size={32} className="text-red-500" /> :
                            <Loader2 size={32} className="animate-spin text-slate-500" />}
                    </div>}
                <span className="text-gray-100 text-3xl font-bold">Giphy</span>
            </div>
            <form
                className="relative flex flex-col items-center justify-center w-full"
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        if (searchQuery.length > 0)
                            navigate(`/search/${searchQuery.toLocaleLowerCase()}`)
                    }
                }>
                <div className="relative flex flex-col items-center justify-center w-2/3">
                    <div className="flex justify-center items-center w-2/3 border border-white">
                        <Input onFocus={() => {
                            setShowSuggestions(true)
                        }} maxLength={30} value={searchQuery} placeholder={placeholderText} onChange={(e) => handleSearch(e)} className="flex items-center placeholder:mt-0.5 px-4 py-2 text-lg placeholder:text-lg rounded-r-none focus:ring-0 focus:outline-none placeholder:ease-in placeholder:duration-300 placeholder:text-slate-500 border-transparent" />
                        {searchQuery.length > 0 &&
                            <div onClick={handleCancelSearch} className="p-0.5 mr-4 rounded-full bg-slate-500">
                                <X size={16} className="text-slate-800" />
                            </div>
                        }
                        <div
                            onClick={() => {
                                if (!loading && searchQuery.length > 0) {
                                    navigate(`/search/${searchQuery.toLocaleLowerCase()}`)
                                }
                            }}
                            className={cn("flex justify-center items-center border border-transparent bg-white p-2 text-slate-900", loading ? "cursor-not-allowed" : "cursor-pointer")}>
                            {loading ? <Loader2 size={28} className="animate-spin text-slate-500" /> : <Search scale={1.5} size={28} />}
                        </div>
                    </div>
                    <div className="flex items-center mt-6 border border-white rounded-md">
                        <Button onClick={() => changeTab("gifs")} className={cn(currentTab === "gifs" && "bg-white text-slate-800", "hover:bg-slate-800 rounded-r-none hover:text-white active:text-white active:bg-white")}>Gifs</Button>
                        <Button onClick={() => changeTab("stickers")} className={cn(currentTab === "stickers" && "bg-white text-slate-800", "hover:bg-slate-800 rounded-l-none hover:text-white active:text-white active:bg-white")}>Stickers</Button>
                    </div>
                    {showSuggestions && (trendingSearches.length > 0 || searchSuggestions.length > 0) && <div ref={dropdownRef} className="absolute top-12 bg-white text-slate-800 w-2/3 space-y-2 pb-2 z-50">
                        {trendingSearches?.length && (<div className="pt-1 pb-2 px-2 space-y-1 border-b border-gray-200">
                            <span className="font-medium text-slate-400 text-xs">Trending Searches</span>
                            <div className="grid grid-flow-col overflow-x-auto space-x-2">
                                {trendingSearches.map(term => {
                                    return <div key={term} className="flex justify-start items-center w-full text-sm">
                                        <div onClick={() => {
                                            navigate(`/search/${term?.split(" ").join("+")}`)
                                        }} className="flex items-center space-x-0.5 bg-gray-300 hover:bg-slate-600 hover:text-white cursor-pointer px-2 py-1 rounded-md text-nowrap">
                                            <span>{term}</span>
                                            <TrendingUp size={16} />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>)
                        }
                        {searchSuggestions?.length > 0 && <div>
                            {searchSuggestions.map((suggestion) => (
                                <div onClick={() => {
                                    navigate(`/search/${suggestion?.split(" ").join("+")}`)
                                }} key={suggestion} className="flex justify-start pl-4 py-1 hover:bg-gray-200 cursor-pointer items-center w-full text-base">
                                    {suggestion}
                                </div>
                            ))}
                        </div>}
                    </div>}
                </div>
            </form>
            <ul className="flex items-center space-x-6">
                {routes.map((route) => (
                    <li key={route.path}>
                        <NavLink
                            to={route.path}
                            className={({ isActive }) => isActive ? "py-2 px-4 bg-white text-slate-950 rounded-md" : "hover:bg-slate-800 py-2 px-4 text-slate-100 rounded-md"}>
                            {route.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav >
    );
};