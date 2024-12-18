import { GIPHY_API_KEY, GIPHY_BASE_URL } from "../lib/constants"

export const APIWrapper = async ({ endpoint, method, payload, params }: {
    endpoint: string,
    method: string,
    payload?: any,
    params?: Record<string, any>,
}) => {
    const abortController = new AbortController()

    try {
        const queryParams = new URLSearchParams(params)

        const res = await fetch(`${GIPHY_BASE_URL}${endpoint}?api_key=${GIPHY_API_KEY}&${queryParams}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            signal: abortController?.signal,
        })

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        const data = await res.json()

        return data
    } catch (error) {
        throw error;
    } finally {
        return abortController.abort();
    }
}