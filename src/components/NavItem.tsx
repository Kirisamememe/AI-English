import Link from "next/link"

interface NavItem {
    label: string
    isSelected: boolean
    link: string
}

const NavItem = (
    { label, isSelected, link }: NavItem ) => {

    return (
        <div className={`cursor-pointer px-1.4 ${isSelected ? 'bg-BlackOp-100' : ''} rounded-full items-center`}>
            <Link href={link}
                  className={`${isSelected ? 'text-Gr-900 font-bold' : 'text-Gr-700 font-normal'} 
                  font-din text-[1.8rem] leading-[3.6rem]
                  hover:text-Gr-900`}>
                {label}
            </Link>
        </div>
    )
}

export default NavItem