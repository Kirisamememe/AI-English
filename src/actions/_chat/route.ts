'use server'

import OpenAI from "openai";

const openai = new OpenAI();

async function chatToGpt() {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello!"}
        ],
        stream: true,
    });

    for await (const chunk of completion) {
        console.log(chunk.choices[0].delta.content);
    }
}

export default chatToGpt