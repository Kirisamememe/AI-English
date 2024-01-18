

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const textOnlyViaGemini = async (userPrompt:string) => {
    console.log(`\n\n-------------Geminiへの問い合わせを開始-------------\n\n`)

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();

    console.log(text);

    console.log(`\n\n-------------Geminiへの問い合わせが正しく終了しました-------------\n\n`)
    return text;
}

export default textOnlyViaGemini;