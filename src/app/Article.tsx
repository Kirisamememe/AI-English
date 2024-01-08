const Article = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"flex-col gap-2"}>
            {children}
        </div>
    )
}

export default Article