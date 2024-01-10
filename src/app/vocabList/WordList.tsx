'use client'

import {useEffect, useRef, useState} from "react";
import getVocabList from "@/app/actions/getVocabList";
import Word from "@/app/vocabList/Word";
import React from "react";
import Loading from "@/app/loading";

export interface WordType {
    word_id: number
    word: string
    phonetic: string | null
    meanings: {
        partOfSpeech: string
        synonyms: string | null
        antonyms: string | null
        definitions: {
            definition: string
            example: string | null
        }[]
    }[]
}

const WordList = () => {
    const [words, setWords] = useState<WordType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true)
            const newWords = await getVocabList(currentPage, 15)
            setWords(prev => [...prev, ...newWords])
            setLoading(false)
        }

        fetchWords().catch()
    }, [currentPage])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.0,
        };

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        }, options);

        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, []);

    return (
        <div className={"flex-col mt-11 max-w-[72rem] gap-0.8"}>
            {words.map(word => (
                <React.Fragment key={crypto.randomUUID()}>
                    <Word wordInfo={word}/>
                </React.Fragment>
            ))}
            {loading && <Loading className={"bg-transparent h-24"}/>}
            <div ref={loader} className={""}/>
        </div>
    )
}

export default WordList