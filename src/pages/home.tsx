import { useEffect, useRef, useState, useCallback } from "react";
import { getTrending } from "../api/trending";
import { DefaultLayout } from "../components/layout/default";
import { GifCard } from "../components/ui/gif";
import { Gif } from "../types/types";
import { useGifContext } from "../context/GifContext";
import { capitalize } from "../lib/utils";
import { CircleX, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";


/**
 * Home page to display trending gifs   
*/
const Home = () => {
    const [trendingGifs, setTrendingGifs] = useState<Array<Gif>>([]);
    const [limit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { currentTab, addSearchQuery } = useGifContext();
    const [prevTab, setPrevTab] = useState<string>(currentTab);
    const [error, setError] = useState<string>("");

    const ref = useRef<HTMLDivElement>(null);

    /**
     * Fetch trending gifs based on the current tab
     * @param reset - whether to reset the offset
     */
    const fetchTrendingGifs = useCallback(async (reset: boolean = false) => {
        if (isLoading) return;
        const abortController = new AbortController();

        setIsLoading(true);

        try {
            const res = await getTrending({
                type: currentTab,
                abortController: abortController,
                limit,
                offset: reset ? 0 : offset,
            });

            const mappedGifs = res.data?.map((gif: Record<string, any>) => ({
                id: gif.id,
                slug: gif.slug,
                image: gif.images.downsized_small.mp4,
                original: gif.url,
            }));

            // Filter out any already existing GIFs based on slug or id
            setTrendingGifs((prev) => reset ? mappedGifs : [
                ...prev,
                ...mappedGifs.filter((newGif: Gif) =>
                    !prev.some((existingGif) => existingGif.slug === newGif.slug)
                )
            ]);

            if (reset) {
                setOffset(0);
            }
            setOffset((prevOffset) => prevOffset + limit);

            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            setError("Error fetching trending gifs.");
            console.error("Error fetching trending gifs:", error);
        } finally {
            return () => {
                setIsLoading(false);
                abortController.abort();
            }
        }
    }, [offset, trendingGifs]);

    const handleShowMore = () => {
        fetchTrendingGifs(false);
    }

    useEffect(() => {
        addSearchQuery("");
        setPrevTab(currentTab);
        if ((prevTab !== currentTab)) {
            setOffset(0);
            setTrendingGifs([]);
        }
        if (!(trendingGifs.length)) {
            fetchTrendingGifs(true);
        }
    }, [currentTab, prevTab]);

    return (
        <DefaultLayout className="flex flex-col justify-start items-start h-full w-full mt-6 space-y-10">
            <h1 className="text-3xl font-semibold">Trending {capitalize(currentTab)}</h1>
            <div ref={ref} aria-label="Trending Gifs" className="grid grid-flow-row grid-cols-5 gap-10">
                {error.length > 0 && <div className='flex items-center space-x-2 text-center text-slate-500 text-xl'>
                    <CircleX size={16} className="text-red-500" />
                    <span className='text-slate-500 ml-2'>{error}</span>
                </div>}
                {trendingGifs?.map((gif: Gif) => (
                    <div key={gif.id} className="relative">
                        <GifCard gif={gif} />
                    </div>
                ))}
            </div>
            {isLoading && <Loader2 size={28} className="mx-auto animate-spin text-slate-500" />}
            {trendingGifs?.length > 0 && <Button onClick={handleShowMore}
                className="mb-10 mx-auto flex justify-center items-center bg-white text-slate-800 rounded-md">
                Show More
            </Button>}
        </DefaultLayout>
    );
};

export default Home;
