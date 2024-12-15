import { GifRating } from "../types/types"
import { APIWrapper } from "./base"

export const getTrending = async ({ type, abortController, limit, offset, rating }: {
    type: "gifs" | "stickers",
    abortController?: AbortController,
    limit?: number,
    offset?: number,
    rating?: GifRating
}) => {
    const url = `/${type}/trending`

    const res = await APIWrapper({
        endpoint: url,
        method: "GET",
        abortController: abortController,
        params: {
            limit: limit ?? 10,
            offset: offset ?? 0,
            rating: rating ?? "g"
        }
    })

    return res
}