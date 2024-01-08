'use client'

import Avatar from "@/components/Avatar";
import NavItem from "@/components/NavItem";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import ChangeTheme from "@/components/ChangeTheme";
import SearchBar from "@/components/SearchBar";

const Nav = ({initialTheme}: {initialTheme: 'light' | 'dark'}) => {

    const pathname = usePathname()
    const isActive = (path: string) => {
        return path === pathname
    }

    return (
        <nav className={"fixed top-0 h-8 w-full flex justify-between items-center pl-2.4 pr-1.6 py-1 bg-BGBlur2 backdrop-blur-[2rem] z-50"}>
            <div className={"items-center gap-3.2"}>
                <Logo/>
                <div className={"items-center gap-1.2"}>
                    <NavItem label={"Home"} isSelected={isActive('/')} link={"/"}/>
                    <NavItem label={"Vocab List"} isSelected={isActive('/vocabList')} link={"/vocabList"}/>
                    <NavItem label={"PlayGround"} isSelected={isActive('/playground')} link={"/playground"}/>
                </div>
            </div>
            <div className={"gap-2.4 items-center"}>
                <SearchBar/>
                <ChangeTheme initialValue={initialTheme}/>
                <Avatar imgUrl={"https://s2.loli.net/2023/09/24/5CaOJ9W3b6LIfRT.jpg"}/>
            </div>
        </nav>
    )
}

export default Nav