
import { useGifContext } from '../../context/GifContext';
import { cn } from '../../lib/class-merger';
import { Gif } from '../../types/types';
import { Heart, Link } from 'lucide-react';

interface IGifCardProps {
    gif: Gif
}

export const GifCard = ({
    gif
}: IGifCardProps) => {
    const { favourites, addFavourite, removeFavourite } = useGifContext()

    const handleClickFavourite = (gif: Gif) => {
        if (favourites.find((_) => _.id === gif.id)) {
            removeFavourite(gif);
        } else {
            addFavourite(gif);
        }
    }

    const isGifInFavourites = favourites.find((_) => _.id === gif.id)

    return (
        <div className='relative'>
            <video src={gif.image} autoPlay muted loop className="w-80 h-80" />
            <div className="absolute top-0 right-0 flex items-center space-x-2">
                <Heart fill={
                    isGifInFavourites ? "red" : ""
                } onClick={() => {
                    handleClickFavourite(gif);
                }} size={16} className={cn("text-slate-500", isGifInFavourites ? "text-red-500 transition-all animate-pulse duration-300 scale-125" : "text-slate-500")} />
                <Link onClick={() => {
                    window.open(gif.original, "_blank");
                }} size={16} className="text-slate-500" />
            </div>
        </div>
    )
}
