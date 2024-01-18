import Link from "next/link"

interface NavItem {
    label: string
    isSelected: boolean
    link: string
}

const NavItem = (
    { label, isSelected, link }: NavItem ) => {

    return (
        <div className={`cursor-pointer px-1.4 ${isSelected ? 'bg-Brand-100' : ''} rounded-full items-center`}>
            <Link href={link}
                  className={`${isSelected ? 'text-Brand-950 font-bold' : 'text-Gr-700 font-normal'} 
                  font-din text-[1.6rem] leading-[3.2rem]
                  hover:text-Brand-950`}>
                {label}
            </Link>
        </div>
    )
}

export default NavItem