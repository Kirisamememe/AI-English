import type { Metadata } from 'next'
import '../style/globals.scss'
import Nav from "@/components/Nav";
import {cookies} from "next/headers";
import React from "react";


export const metadata: Metadata = {
    title: 'AIlingo',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    return (
        <html lang="en">
            <body data-mode={theme?.value}>
                <Nav initialTheme={theme?.value as 'light' | 'dark'}/>
                {children}
            </body>
        </html>
    )
}
