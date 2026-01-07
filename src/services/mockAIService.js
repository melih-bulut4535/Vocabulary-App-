// Mock AI Service
// Simulates an API call to an LLM

export const mockDetectAndTranslate = async (term) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerTerm = term.toLowerCase().trim();

    // Simple mock database for demonstration
    const mockDB = {
        "apple": {
            translation: "Elma",
            language: "en",
            targetLang: "tr",
            example: "I eat an apple every day for breakfast."
        },
        "elma": {
            translation: "Apple",
            language: "tr",
            targetLang: "en",
            example: "Her gün kahvaltıda bir elma yerim."
        },
        "computer": {
            translation: "Bilgisayar",
            language: "en",
            targetLang: "tr",
            example: "My computer is very fast."
        },
        "bilgisayar": {
            translation: "Computer",
            language: "tr",
            targetLang: "en",
            example: "Bilgisayarım çok hızlı."
        },
        "hello": {
            translation: "Merhaba",
            language: "en",
            targetLang: "tr",
            example: "Hello, how are you today?"
        },
        "merhaba": {
            translation: "Hello",
            language: "tr",
            targetLang: "en",
            example: "Merhaba, bugün nasılsın?"
        },
        "gradable": {
            translation: "Derecelendirilebilir",
            language: "en",
            targetLang: "tr",
            example: "Adjectives like 'good' and 'bad' are gradable adjectives."
        }
    };

    // Fallback for unknown words (Simulation of "AI" generation)
    if (mockDB[lowerTerm]) {
        return mockDB[lowerTerm];
    }

    // Generic fallback if not in mock DB
    // In a real app, this would be the actual API response
    const isEnglish = /^[a-zA-Z\s]+$/.test(term);

    return {
        translation: isEnglish ? `[Simulated] ${term}` : `[Simulated] ${term}`,
        language: isEnglish ? "en" : "tr",
        targetLang: isEnglish ? "tr" : "en",
        example: isEnglish
            ? `(Auto-generated example for "${term}")`
            : `("${term}" için otomatik üretilen örnek)`
    };
};
