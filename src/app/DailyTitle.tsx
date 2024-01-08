import SpeechButton from "@/components/SpeechButton";

const DailyTitle = ({title}: {title: string}) => {
    return (
        <div className={"h-5.2 items-center justify-between"}>
            <h1>{title}</h1>
        </div>
    )
}

export default DailyTitle