'use client'

import {useEffect, useState} from "react";
import ChangeThemeIcon from "@/components/ChangeThemeIcon";

type Theme = 'light' | 'dark';

const ChangeTheme = ({ initialValue }: { initialValue: Theme }) => {
    const [theme, setTheme] = useState(initialValue);

    useEffect(() => {
        if (theme) {
            document.cookie = `theme=${theme};path=/;`;
            document.querySelector('body')?.setAttribute('data-mode', theme);
        } else {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
    }, [theme]);

    return (
        <button className={"p-0.4 hover:bg-green-500 hover:bg-opacity-[0.08] rounded-full transition-all duration-300"} type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <ChangeThemeIcon theme={theme}/>
        </button>
    )
}

export default ChangeTheme