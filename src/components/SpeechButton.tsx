'use client'

import {SpeechIcon} from "@/components/Icon";

const SpeechButton =({className, sentences}: {className: string, sentences: string}) => {
    const speakText = () => {
        if (sentences) {
            const utterance = new SpeechSynthesisUtterance(sentences);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className={className}>
            <button
                className={"group p-0.4 hover:bg-Brand-100 rounded-full"}
                type="button"
                onClick={speakText}>
                <SpeechIcon/>
            </button>
        </div>
    )
}

export default SpeechButton