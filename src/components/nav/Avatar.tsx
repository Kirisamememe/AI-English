import React from "react";
import Image from "next/image";

const Avatar = ({imgUrl}: {imgUrl: string}) => {
    return (
        <div className={"outline outline-1 outline-Brand-500 outline-offset-2 rounded-full"}>
            <Image className={"rounded-full flex-shrink-0"} width={42} height={42} src={imgUrl} alt={'image'}/>
        </div>
    );
};


export default Avatar