'use client'

import {useEffect, useRef, useState} from "react";
import getVocabList from "@/actions/getVocabList";
import Word from "@/app/vocabList/Word";
import React from "react";
import Loading from "@/app/loading";
import AddWord from "@/app/vocabList/AddWord";

export interface WordType {
    word_id: number
    word: string
    phonetic: string | null
    meanings?: {
        meaning_id: number
        partOfSpeech: string
        synonyms: string | null
        antonyms: string | null
        order: number | null
        definitions: {
            definition_id: number
            definition: string
            example: string | null
            order: number | null
        }[]
    }[]
}

const WordList = () => {
    const [words, setWords] = useState<WordType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);

    const addNewWord = (word: WordType) => {
        setWords(prevWords => [word, ...prevWords])
    }

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true)
            const newWords = await getVocabList(currentPage, 15)
                .finally(() => {
                    setLoading(false)
                })

            setWords(prev => [
                ...prev,
                ...prev[0]?.word_id !== newWords[0].word_id ? newWords : []
                //, ...newWords
                //開発モードではuseEffectが2回実行されることによるデータの重複を回避してみる
            ])


            // newWords.forEach(word => {
            //     if (word.meanings.length <= 0){
            //         console.log(JSON.stringify(word, null, 2))
            //     }
            //     word.meanings.forEach(meaning => {
            //         if (!meaning){
            //             console.log(JSON.stringify(word, null, 2))
            //         }
            //     })
            // })
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
        <div className={"flex-col mt-10 w-full max-w-[72rem] gap-0.8"}>
            <AddWord addNewWord={addNewWord}/>
            {words.map((word, index) => (
                <Word
                    key={`${word.word_id}_${word.word}_${index}`}
                    wordInfo={word}
                    setWords={setWords}
                />
            ))}
            {loading && <Loading className={"bg-transparent h-24"}/>}
            <div ref={loader} className={"min-h-20"}/>
        </div>
    )
}

export default WordList