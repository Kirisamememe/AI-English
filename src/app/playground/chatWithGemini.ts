// 'use client'
//
// import { GoogleGenerativeAI } from "@google/generative-ai";
//
// const getCookie = (name: string) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts[1].split(';').shift();
// };
//
//
//
// interface request {
//     message: string
//     history: {
//         role: string;
//         parts: string;
//     }[]
// }
//
// const genAI = new GoogleGenerativeAI(getCookie("APIKEY") || "");
//
// const handleMessage = async (req: request) => {
//     const { message, history } = req;
//
//     // Google AIモデルを初期化
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//
//     // チャット履歴を使用してチャットを開始
//     const chat = model.startChat({
//         history,
//         generationConfig: { maxOutputTokens: 2000 },
//     });
//
//     // メッセージを送信し、結果を取得
//     const result = await chat.sendMessage(message);
//     const response = result.response;
//
//     return response.text();
// };
//
// export default handleMessage;
