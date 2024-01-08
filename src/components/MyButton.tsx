interface MyButton {
    label: string
    fontSize?: number
    type: 'Primary' | 'Secondary' | 'Ghost'
    rounded?: string
    className?: string
}

const MyButton = ({label, fontSize = 1.6, type, rounded = '-full', className}: MyButton) => {
    switch (type) {
        case "Primary":
            return <button
                className={`bg-Brand-950 hover:shadow-lg hover:shadow-Brand-200 text-white text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
        case "Secondary":
            return <button
                className={`ring-1 ring-Brand-950 hover:bg-Brand-100 text-Brand-950 text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
        case "Ghost":
            return <button
                className={`bg-Brand-50 hover:bg-Brand-100 text-Brand-950 text-[${fontSize}rem] px-2.4 py-1.4 leading-none rounded${rounded} ${className}`}>{label}
            </button>
    }
}

export default MyButton