'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

interface request {
    message: string
    history: {
        role: string;
        parts: string;
    }[]
}

const handleMessage = async (req: request) => {
    const { message, history } = req;

    // Google AIモデルを初期化
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // チャット履歴を使用してチャットを開始
    const chat = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 2000 },
    });

    // メッセージを送信し、結果を取得
    const result = await chat.sendMessage(message);
    const response = result.response;

    return response.text();
};

export default handleMessage;
