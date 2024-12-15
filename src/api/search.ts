import { GifRating } from "../types/types"
import { APIWrapper } from "./base"

export const getSearch = async ({ type, abortController, q, limit, offset, rating }: {
    type: "gifs" | "stickers",
    abortController?: AbortController,
    q: string,
    limit?: number,
    offset?: number,
    rating?: GifRating
}) => {
    try {
        const url = `/${type}/search`

        const res = await APIWrapper({
            endpoint: url,
            method: "GET",
            abortController: abortController,
            params: {
                q: q ?? "",
                limit: limit ?? 10,
                offset: offset ?? 0,
                rating: rating ?? "g"
            }
        })

        return res
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { data: [] }
    }
}

export const getTrendingSearches = async ({ abortController }: {
    abortController?: AbortController
}) => {
    try {
        const url = `/trending/searches`

        const res = await APIWrapper({
            endpoint: url,
            method: "GET",
            abortController: abortController,
        })

        if (!res) {
            throw new Error("Failed to fetch data")
        }

        return res

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { data: [] }
    }
}

export const getSearchSuggestions = async ({ abortController, term }: {
    abortController?: AbortController,
    term: string
}) => {
    try {
        const url = `/tags/related/${term}`

        const res = await APIWrapper({
            endpoint: url,
            method: "GET",
            abortController: abortController
        })

        if (!res) {
            throw new Error("Failed to fetch data")
        }

        return res

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { data: [] }
    }
}