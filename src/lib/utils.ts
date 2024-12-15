export const genRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomGif = (data: any) => {
    const randomIndex = genRandomInt(0, data.length - 1)
    return data[randomIndex]
}

export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

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
