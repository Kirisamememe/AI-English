import React from "react";
import Image from "next/image";

const Avatar = ({imgUrl}: {imgUrl: string}) => {
    return (
        <>
            <Image className={"rounded-full flex-shrink-0"} width={44} height={44} src={imgUrl} alt={'image'}/>
        </>
    );
};


export default Avatar