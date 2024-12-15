import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getSearch } from '../api/search'
import { Gif } from '../types/types'
import { GifCard } from '../components/ui/gif'
import { DefaultLayout } from '../components/layout/default'
import { capitalize } from '../lib/utils'
import { useGifContext } from '../context/GifContext'
import { Button } from '../components/ui/button'
import { Loader2 } from 'lucide-react'

const SearchedTerm = () => {
    const { term } = useParams()
    const [searchResults, setSearchResults] = useState<Array<Gif>>([])
    const { currentTab, addSearchQuery } = useGifContext()
    const [limit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [prevTab, setPrevTab] = useState<string>(currentTab);

    const formattedTerm = capitalize(term?.split("+").join(" ") || '');

    const fetchSearchResults = useCallback(async (searchTerm: string, reset: boolean = false) => {
        if (!searchTerm || isLoading) return;

        const abortController = new AbortController();

        setIsLoading(true);

        try {
            const res = await getSearch({
                type: currentTab,
                abortController,
                q: searchTerm,
                limit,
                offset: reset ? 0 : offset,
            });

            const mappedGifs = res.data?.map((gif: Record<string, any>) => ({
                id: gif.id,
                slug: gif.slug,
                image: gif.images.downsized_small.mp4,
                original: gif.url,
            }));

            setSearchResults((prev) => reset ? mappedGifs : [
                ...prev,
                ...mappedGifs.filter((newGif: Gif) =>
                    !prev.some((existingGif) => existingGif.slug === newGif.slug)
                )
            ]);
            setIsLoading(false);
            setOffset((prevOffset) => prevOffset + limit);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setIsLoading(false);
        } finally {
            return () => {
                abortController.abort();
                setIsLoading(false);
            }
        }
    }, [currentTab, prevTab, offset]);

    useEffect(() => {
        setPrevTab(currentTab);
        addSearchQuery(formattedTerm);
        if (prevTab !== currentTab) {
            setOffset(0);
            setSearchResults([]);
        }
        fetchSearchResults(term as string, true);
    }, [currentTab, prevTab, term, location.pathname]);

    const handleShowMore = () => {
        if (isLoading) return;
        fetchSearchResults(term as string);
    }

    return (
        <DefaultLayout className="flex flex-col justify-start items-start h-full w-full mt-6 space-y-10">
            <h1 className='text-3xl font-semibold'>
                Search - {formattedTerm} {capitalize(currentTab)}
            </h1>
            <div className='grid grid-flow-row grid-cols-5 gap-10'>
                {
                    searchResults.map((gif: Gif) => {
                        return (
                            <div key={gif.slug} className="relative">
                                <GifCard gif={gif} />
                            </div>
                        )
                    })
                }
            </div>
            {isLoading && <Loader2 size={28} className="mx-auto animate-spin text-slate-500" />}
            <Button onClick={handleShowMore} className="mx-auto mt-10 mb-28 flex justify-center items-center bg-white text-slate-800 rounded-md">Show More</Button>
        </DefaultLayout>
    )
}

export default SearchedTerm