import MyButton from "@/components/MyButton";


const TodayWords = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"flex-col gap-2.8 min-w-24 h-full ml-2 pt-11"}>
            <h1 className={"indent-1"}>Today&apos;s</h1>
            {children}
            <MyButton label={"定着度チェック"} type={"Primary"} className={"mb-2 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-[0.3rem] hover:scale-105 max-w-[18rem]"}/>
        </div>
    )
}

export default TodayWords