/**
 * genRandomInt is a utility function that generates a random integer between a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random integer between the specified range.  
 * @example
 * genRandomInt(1, 10); // returns a random integer between 1 and 10    
 */
export const genRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * getRandomGif is a utility function that returns a random GIF from a specified array of GIFs.
 * @param {any} data - The array of GIFs to choose from.
 * @returns {any} A random GIF from the specified array.  
 * @example
 * const gifs = [    
 *     { id: 1, url: "https://example.com/gif1.gif" },    
 *     { id: 2, url: "https://example.com/gif2.gif" },    
 *     { id: 3, url: "https://example.com/gif3.gif" },    
 * ];    
 * getRandomGif(gifs); // returns a random GIF from the array           
 */
export const getRandomGif = (data: any) => {
    const randomIndex = genRandomInt(0, data.length - 1)
    return data[randomIndex]
}

/**
 * capitalize is a utility function that capitalizes the first letter of a string.
 * @param {string} text - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * generateRandomPhrase is a utility function that generates a random phrase using randomly selected adjectives, nouns, and verbs.
 * @returns {string} A random phrase generated using randomly selected adjectives, nouns, and verbs.
 * @example
 * generateRandomPhrase(); // returns a random phrase like "Funny dog running..."
 */
export const generateRandomPhrase = () => {
    const adjectives = [
        "funny", "happy", "sad", "excited", "angry", "silly", "adorable", "weird",
    ];
    const nouns = [
        "cat", "dog", "dancing", "party", "food", "meme", "game", "reaction",
    ];
    const verbs = [
        "running", "laughing", "crying", "celebrating", "thinking", "eating",
    ];

    // Randomly pick one from each array
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];

    // Combine into a phrase
    const phrases = [
        `${capitalize(adjective)} ${noun} ${verb}...`,
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
};
