// 'use client'
//
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import {cookies} from "next/headers";
//
// const geminiOnClient = async (userPrompt:string) => {
//     const getCookie = (name: string) => {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) return parts[1].split(';').shift();
//     };
//
//     console.log(`\n\n-------------Geminiへの問い合わせを開始-------------\n\n`)
//
//     const APIKEY = getCookie("APIKEY")
//     const genAI = new GoogleGenerativeAI(APIKEY || "");
//
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//
//     const result = await model.generateContent(userPrompt);
//     const response = result.response;
//     const text = response.text();
//
//     console.log(text);
//
//     console.log(`\n\n-------------Geminiへの問い合わせが正しく終了しました-------------\n\n`)
//     return text;
// }
//
// export default geminiOnClient;