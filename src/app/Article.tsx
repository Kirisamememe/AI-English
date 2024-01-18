const Article = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"flex-col w-full max-w-[54rem] gap-2"}>
            {children}
        </div>
    )
}

export default Article