'use client'

import React from "react";

interface MyButton {
    label: string
    fontSize?: number
    type: 'Primary' | 'Secondary' | 'Ghost'
    rounded?: string
    className?: string
    padding?: number[]
    eventHandler: React.MouseEventHandler
}

const MyButton = ({label, fontSize = 1.6, type, rounded = '-full', padding = [2.4, 1.4], className, eventHandler}: MyButton) => {
    switch (type) {
        case "Primary":
            return <button
                onClick={eventHandler}
                className={`font-sans bg-Brand-950 hover:shadow-lg hover:shadow-Brand-200 text-white text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
        case "Secondary":
            return <button
                onClick={eventHandler}
                className={`font-sans ring-1 ring-Brand-950 hover:bg-Brand-100 text-Brand-950 text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
        case "Ghost":
            return <button
                onClick={eventHandler}
                className={`font-sans bg-Brand-50 hover:bg-Brand-100 text-Brand-950 text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
    }
}

export default MyButton