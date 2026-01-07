import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockDetectAndTranslate } from "./mockAIService";

const CANDIDATE_MODELS = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-pro"
];

export const detectAndTranslate = async (term) => {
    const apiKey = localStorage.getItem('geminiApiKey');

    if (!apiKey) {
        console.log("No API Key found, using Mock Service");
        return await mockDetectAndTranslate(term);
    }

    const cleanKey = apiKey.trim();
    const genAI = new GoogleGenerativeAI(cleanKey);

    let lastError = null;

    // 1. Try candidates
    for (const modelName of CANDIDATE_MODELS) {
        try {
            console.log(`Checking model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `
        You are an expert language tutor. I will give you a word: "${term}".
        1. Detect if it is English (en) or Turkish (tr).
        2. Translate it to the other language.
        3. Create a helpful, B1-level example sentence in the SOURCE language.
        4. Return ONLY valid JSON with this structure:
        {
          "translation": "Translated Word",
          "language": "en or tr",
          "targetLang": "tr or en",
          "example": "Example sentence here."
        }
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonStr = text.replace(/```json|```/g, '').trim();
            return JSON.parse(jsonStr);

        } catch (error) {
            console.warn(`Model ${modelName} failed.`);
            lastError = error;
            if (!error.message.includes('404') && !error.message.includes('not found')) {
                // If it's not a "not found" error (e.g. quota, auth), break and report it.
                // But for now, let's just keep trying to find a working one.
            }
        }
    }

    // 2. If all failed, let's try to LIST available models to debug
    try {
        console.log("Attempting to list available models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
        const data = await response.json();

        if (data.models) {
            const availableNames = data.models.map(m => m.name.replace('models/', '')).join(', ');
            throw new Error(
                `Hiçbir model çalışmadı. Hesabınızda açık olan modeller: \n${availableNames}\n` +
                `Lütfen bu modellerden birini kodda kullanın.`
            );
        } else {
            throw new Error(`Model listesi alınamadı: ${JSON.stringify(data)}`);
        }
    } catch (listError) {
        // If we can't even list models, throw the original error
        throw new Error(
            `Modeller çalıştırılamadı ve liste alınamadı.\nSon Hata: ${lastError?.message}`
        );
    }
};
