'use client'

import Avatar from "@/components/nav/Avatar";
import NavItem from "@/components/nav/NavItem";
import { usePathname } from "next/navigation";
import Logo from "@/components/nav/Logo";
import ChangeTheme from "@/components/nav/ChangeTheme";
import SearchBar from "@/components/nav/SearchBar";
import GithubLink from "@/components/nav/GithubLink";

const Nav = ({initialTheme}: {initialTheme: 'light' | 'dark'}) => {

    const pathname = usePathname()
    const isActive = (path: string) => {
        return path === pathname
    }

    return (
        <nav
            className={
            "fixed top-0 h-7.2 w-full flex justify-between items-center px-1.6 py-1 bg-BGBlur2 backdrop-blur-[2rem] z-50 shadow-b"
        }>
            <div className={"items-center gap-1.6 shrink-0"}>
                <Logo/>
                <div className={"items-center gap-1"}>
                    <NavItem label={"Home"} isSelected={isActive('/')} link={"/"}/>
                    <NavItem label={"Vocab List"} isSelected={isActive('/vocabList')} link={"/vocabList"}/>
                    <NavItem label={"PlayGround"} isSelected={isActive('/playground')} link={"/playground"}/>

                </div>
            </div>
            <div className={"gap-2.4 items-center"}>
                <SearchBar/>
                <div className={"gap-1.2"}>
                    <GithubLink/>
                    <ChangeTheme initialValue={initialTheme}/>
                </div>
                <Avatar imgUrl={"https://s2.loli.net/2023/09/24/5CaOJ9W3b6LIfRT.jpg"}/>
            </div>
        </nav>
    )
}

export default Nav