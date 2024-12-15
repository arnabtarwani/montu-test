import { useGifContext } from '../context/GifContext'
import { DefaultLayout } from '../components/layout/default'
import { GifCard } from '../components/ui/gif'
import { Gif } from '../types/types'
import { Button } from '../components/ui/button'

const Favourites = () => {
    const { favourites, clearFavourites } = useGifContext()

    return (
        <DefaultLayout className="flex flex-col justify-start items-start h-full w-full mt-6 space-y-10">
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-3xl font-semibold'>My Favourites</h1>
                <Button onClick={() => {
                    clearFavourites();
                }}
                    className='bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 active:bg-red-700'>
                    Clear All
                </Button>
            </div>
            <div className="grid grid-flow-row grid-cols-5 gap-10">
                {!favourites.length && <div className='text-center text-slate-500 text-xl'>No favourites yet.</div>}
                {
                    favourites.map((gif: Gif) => {
                        return (
                            <div key={gif.id}>
                                <GifCard gif={gif} />
                            </div>
                        )
                    })
                }
            </div>
        </DefaultLayout>
    )
}

export default Favourites