'use client'

import {ChangeEvent, useState, MouseEvent} from 'react';
import handleMessage from "@/app/actions/chat";

interface ChatMessage {
    role: string;
    parts: string;
}

const Chat = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [response, setResponse] = useState('');

    const sendMessage = async (e: MouseEvent) => {

        const reply = await handleMessage({message, history});
        setResponse(reply);
        console.log(reply);

        setHistory([...history, { role: 'user', parts: message }, { role: 'model', parts: reply }]);
    };

    const paragraphs = response.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-1.2 text-Gr-900 text-[1.6rem]">{paragraph}</p>
    ))

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
                className="bg-green-600 hover:opacity-80 py-0.8 rounded text-3xl text-white" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default Chat;