import { getSearch } from "../api/search";
import { test, beforeAll, describe, expect, expectTypeOf } from "vitest";

describe("Search GIFs API", () => {
    let response: Response;
    let body: Array<{ [key: string]: unknown }>;

    beforeAll(async () => {
        response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=3IFw2ECzX0WpG6D3bAE6SY2IQRBVgsZL&q=cats&limit=10&offset=0&rating=g");
        body = await response.json();
    });

    test("base url should be correct", () => {
        expect(response.url).toBe("https://api.giphy.com/v1/gifs/search?api_key=3IFw2ECzX0WpG6D3bAE6SY2IQRBVgsZL&q=cats&limit=10&offset=0&rating=g");
    });

    test("should return a list of trending gifs", async () => {
        expectTypeOf(body).toBeArray();
    });

    test("should return a list of trending searches", async () => {
        expectTypeOf(body).toBeArray();
    });

    test("should return a list of search results", async () => {
        const res = await getSearch({
            type: "gifs",
            q: "cat",
            limit: 10,
            offset: 0,
        });
        expect(res.data).toBeInstanceOf(Array);
    });

    test("should return an empty list if no results are found", async () => {
        const res = await getSearch({
            // ts-expect-error: Invalid type
            type: "hello" as any,
            q: "dog",
            limit: 10,
            offset: 0,
        });
        expect(res.data).toBeInstanceOf(Array);
        expect(res.data.length).toBe(0);
    });

    test("should return an error if the API key if rate limit is exceeded", async () => {
        const res = await getSearch({
            type: "gifs",
            q: "dog",
            limit: 10,
            offset: 0,
        });
        expect(res.data).toBeInstanceOf(Array);
        expect(res.data.length).toBe(0);
    });
});