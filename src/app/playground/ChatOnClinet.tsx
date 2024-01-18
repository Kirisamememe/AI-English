'use client'

import {ChangeEvent, useState, MouseEvent, useEffect} from 'react';
import handleMessage from "@/actions/chatWithGeminiOnServer";
import {GoogleGenerativeAI} from "@google/generative-ai";

interface ChatMessage {
    role: string;
    parts: string;
}

interface request {
    message: string
    history: ChatMessage[]
}

const ChatOnClient = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [response, setResponse] = useState('');
    const [gettingResFlag, setGettingResFlag] = useState(false)

    const handleSendMessage = () => {
        setGettingResFlag(prev => !prev)
    }

    const paragraphs = response.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-1.2 text-Gr-900 text-[1.6rem]">{paragraph}</p>
    ))

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts[1].split(';').shift();
        };

        const genAI = new GoogleGenerativeAI(getCookie("APIKEY") || "");

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

        const sendMessage = async () => {

            const reply = await handleMessage({message, history});
            setResponse(reply);
            console.log(reply);

            setHistory([...history, { role: 'user', parts: message }, { role: 'model', parts: reply }]);
        };

        sendMessage()
            .catch()

    }, [gettingResFlag]);

    return (
        <div className="flex-col max-w-[72rem] w-[64rem] min-w-[36rem] h-full gap-1.6 p-1.6 border border-solid border-BlackOp-100 rounded-lg">
            <div
                className="flex-col w-full h-full min-h-12 p-1 bg-BG-800 text-[1.6rem] text-Gr-900 border border-solid border-BlackOp-100 rounded overflow-auto">
                {paragraphs}
            </div>
            <textarea
                className="w-full p-1 bg-BG-800 text-[1.6rem] text-Gr-900 placeholder:text-Gr-300 border border-solid border-BlackOp-100 rounded"
                value={message}
                rows={6}
                placeholder={"なんでも聞いて！"}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            ></textarea>
            <button
                className="bg-green-600 hover:opacity-80 py-0.8 rounded text-3xl text-white" onClick={handleSendMessage}>
                Send
            </button>
        </div>
    );
};

export default ChatOnClient;