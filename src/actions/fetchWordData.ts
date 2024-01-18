'use server'

import textOnlyViaGemini from "@/actions/textOnlyViaGemini";
import sleep from "@/actions/sleep";
import {WordType} from "@/app/vocabList/WordList";
import {Meaning} from "@/actions/insertWordData";

const fetchWordData = async (word: string) => {
    console.log(`\n\n========================Dictionary Apiへの問い合わせを開始==========================\n\n`)

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let notError = false;
    let attempts = 0;

    while (!notError && attempts < 3){
        try {
            const response = await fetch(url);

            // レスポンスの本文をJSONとして解析
            const data = await response.json();

            if (!data[0].phonetic) {
                const prompt = `Please output the phonetic for '${word}'. Follow the format like this: /fəˈnetɪk/. Do not output any irrelevant characters.`

                let validPhoneticFound = false;
                let attempts = 0;

                while (!validPhoneticFound && attempts < 3){
                    try {
                        let phoneticText = await textOnlyViaGemini(prompt);
                        const phoneticPattern = /^\/[A-Za-zəɛɪʊɔæɑʌɝɚɜʃʒθðʤʧŋɡɹlhwʔɑoɔeɪaʊɚɛɪʌɑɝɚɜʃʒθðʤʧŋɡɹlhwʔ]+\/$/;

                        if (phoneticPattern.test(phoneticText)) {
                            data[0].phonetic = phoneticText;
                            validPhoneticFound = true;
                        } else {
                            console.log('Returned text is not valid phonetic:', phoneticText);
                        }
                    }catch (error){
                        console.error('Error generating example:', error);
                    }
                    attempts++
                }

                if (attempts >= 5){
                    data[0].phonetic = ''
                }
            }
            for (const item of data) {
                for (const meaning of item.meanings) {
                    if (meaning.synonyms) meaning.synonyms = meaning.synonyms.join(", ")
                    if (meaning.antonyms) meaning.antonyms = meaning.antonyms.join(", ")

                    for (const definition of meaning.definitions) {

                        // definitionにexampleがない場合、AIを使って生成する
                        if (!definition.example) {
                            const prompt = `I would like an example sentence for the word '${word}'. Based on the definition '${definition.definition}', please write an example sentence that can be understood by English beginners or intermediates. Do not output any irrelevant text, such as spaces or quotation marks. Only output the example sentence.`

                            let validExampleFound = false;
                            let attempts = 0;

                            while (!validExampleFound && attempts < 3) {
                                try {
                                    console.log(`[prompt] : ${prompt} `)
                                    let exampleText = await textOnlyViaGemini(prompt);

                                    // クオーテーションマークの除去
                                    exampleText = exampleText.replace(/^"|"$/g, '');

                                    // 英語の文章チェック
                                    if (/^[A-Za-z0-9\s,.'";:!()?-]+$/.test(exampleText)) {
                                        definition.example = exampleText;
                                        validExampleFound = true; // 正しい例文が見つかった
                                        await sleep(1000)
                                    } else {
                                        console.log('Returned text is not valid English:', exampleText);
                                    }
                                } catch (error: any) {
                                    console.error('Error generating example:', error);
                                    if (error.message.includes("Text not available. Response was blocked due to SAFETY")){
                                        attempts += 3;
                                    }
                                    else {
                                        console.log(JSON.stringify(error, null, 2))
                                        await sleep(3000)
                                    }
                                }
                                attempts++; // 試行回数を増やす
                            }
                        }
                    }
                }
            }

            console.log(`\n\n==============================Dictionary Apiへの問い合わせが正しく終了しました================================\n\n`)

            notError = true;
            if (data.length > 1) {
                const newMeanings: Meaning[] = [];

                data.forEach((data: WordType) => data.meanings && data.meanings.map(meaning => newMeanings.push(meaning)));
                data[0].meanings = newMeanings
            }


            console.log(JSON.stringify(data, null, 2));
            return data[0];
        } catch (error) {
            // エラーをキャッチし、コンソールに出力
            console.error('There was an error!', error);
        }
        attempts++
    }
};

export default fetchWordData
