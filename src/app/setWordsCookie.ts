'use server'

import { cookies } from 'next/headers'

export default async function setWordsCookie(words: string[]) {
    cookies().set({
        name: "words",
        value: words.join(","),
        httpOnly: true,
        path: '/',
    })
}