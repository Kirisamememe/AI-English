export default function Loading() {

    return (
        <div className={"w-full h-full mt-8 justify-center align-middle"}>
            <svg className={"animate-spin h-5 w-5 mr-3"} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="15.5" stroke="#3EB76E" strokeOpacity="0.2" strokeWidth="5"/>
                <path
                    d="M9.24925 19.2392C10.3836 15.7245 12.7357 12.7303 15.8818 10.796C19.028 8.86168 22.7614 8.11429 26.4097 8.68846C30.058 9.26262 33.3814 11.1206 35.7814 13.9278C38.1813 16.7349 39.5 20.3068 39.5 24"
                    stroke="#3EB76E" strokeOpacity="0.8" strokeWidth="5"/>
            </svg>
            {/*<p className={"text-[2.4rem] text-Gr-900"}>Loading...</p>*/}
        </div>
    )
}