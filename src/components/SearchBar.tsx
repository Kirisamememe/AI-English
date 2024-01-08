const SearchBar = () => {
    return (
        <div id={"search"} className={"transition-all duration-200 hover:bg-BlackOp-100 justify-center items-center w-30 bg-BlackOp-50 gap-1.2 px-1.2 py-0.8 rounded-full"}>
            <svg className={"fill-Gr-500"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3 10.6134C3 14.8113 6.45029 18.2268 10.6909 18.2268C12.3678 18.2268 13.9002 17.6926 15.1628 16.7957L19.0725 20.6756C19.2941 20.8951 19.5833 21 19.8917 21C20.5471 21 21 20.5134 21 19.8742C21 19.5689 20.8844 19.2922 20.682 19.0918L16.8011 15.2215C17.7939 13.9431 18.3818 12.3498 18.3818 10.6134C18.3818 6.41554 14.9315 3 10.6909 3C6.45029 3 3 6.41554 3 10.6134ZM4.64805 10.6134C4.64805 7.31237 7.35625 4.63145 10.6909 4.63145C14.0255 4.63145 16.7337 7.31237 16.7337 10.6134C16.7337 13.9144 14.0255 16.5954 10.6909 16.5954C7.35625 16.5954 4.64805 13.9144 4.64805 10.6134Z"
                    />
            </svg>
            <input size={20} className={"border-none outline-none bg-transparent text-Gr-900 text-[1.6rem] mb-0.2"} type={"text"} placeholder={"word or sentence"}/>
        </div>
    )
}

export default SearchBar