const ChangeThemeIcon = ({ theme }: { theme: 'light' | 'dark' }) => {
    return (
        <>
            {theme === 'dark' ?
                <svg className={""} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.0051 8.94559C16.4832 8.94559 16.8798 8.55002 16.8798 8.06316V5.88243C16.8798 5.39557 16.4832 5 16.0051 5C15.5169 5 15.1202 5.39557 15.1202 5.88243V8.06316C15.1202 8.55002 15.5169 8.94559 16.0051 8.94559ZM20.9889 11.0249C21.3347 11.3596 21.8941 11.3698 22.24 11.0249L23.7961 9.47303C24.1318 9.13831 24.1318 8.57031 23.7961 8.22545C23.4604 7.89073 22.9011 7.89073 22.5553 8.22545L20.9889 9.78746C20.6533 10.1323 20.6533 10.6902 20.9889 11.0249ZM23.0536 16.005C23.0536 16.4818 23.4604 16.8774 23.9385 16.8774H26.1253C26.6033 16.8774 27 16.4818 27 16.005C27 15.5284 26.6033 15.1226 26.1253 15.1226H23.9385C23.4604 15.1226 23.0536 15.5284 23.0536 16.005ZM20.9889 20.9853C20.6533 21.3301 20.6533 21.8879 20.9889 22.2227L22.5553 23.7948C22.9011 24.1194 23.4604 24.1092 23.7961 23.7847C24.1318 23.4398 24.1318 22.882 23.7961 22.5472L22.2298 20.9853C21.8941 20.6607 21.3347 20.6607 20.9889 20.9853ZM16.0051 23.0646C15.5169 23.0646 15.1202 23.4601 15.1202 23.9368V26.1277C15.1202 26.6044 15.5169 27 16.0051 27C16.4832 27 16.8798 26.6044 16.8798 26.1277V23.9368C16.8798 23.4601 16.4832 23.0646 16.0051 23.0646ZM11.0111 20.9853C10.6653 20.6607 10.0957 20.6607 9.76006 20.9853L8.20389 22.5371C7.86824 22.8718 7.86824 23.4297 8.19371 23.7745C8.52936 24.0991 9.09894 24.1092 9.44475 23.7847L11.0009 22.2227C11.3366 21.8879 11.3366 21.3301 11.0111 20.9853ZM8.94637 16.005C8.94637 15.5284 8.53952 15.1226 8.06149 15.1226H5.87471C5.39667 15.1226 5 15.5284 5 16.005C5 16.4818 5.39667 16.8774 5.87471 16.8774H8.06149C8.53952 16.8774 8.94637 16.4818 8.94637 16.005ZM11.0009 11.0249C11.3366 10.7003 11.3366 10.1222 11.0111 9.78746L9.45492 8.22545C9.11928 7.90087 8.5497 7.89073 8.21405 8.22545C7.87841 8.57031 7.87841 9.13831 8.20389 9.46289L9.76006 11.0249C10.0957 11.3596 10.6551 11.3596 11.0009 11.0249Z"
                        fill="#3EB76E" fillOpacity="0.7"/>
                    <path
                        d="M15.995 21.1782C18.8225 21.1782 21.172 18.8352 21.172 16.0053C21.172 13.1653 18.8225 10.8223 15.995 10.8223C13.1674 10.8223 10.8179 13.1653 10.8179 16.0053C10.8179 18.8352 13.1674 21.1782 15.995 21.1782Z"
                        fill="#3EB76E" fillOpacity="0.1"/>
                    <path
                        d="M20.172 16.0053C20.172 18.2816 18.2716 20.1782 15.995 20.1782C13.7183 20.1782 11.8179 18.2816 11.8179 16.0053C11.8179 13.7176 13.7196 11.8223 15.995 11.8223C18.2703 11.8223 20.172 13.7176 20.172 16.0053Z"
                        stroke="#3EB76E" strokeOpacity="0.7" strokeWidth="2"/>
                </svg>
                :
                <svg className={""} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.5168 17.3187C22.7181 17.3187 22.8558 17.1811 22.8769 16.9692C23.2266 14.1411 23.3642 14.0669 26.2347 13.6009C26.4572 13.5691 26.5948 13.4526 26.5948 13.2513C26.5948 13.0501 26.4572 12.923 26.2771 12.8912C23.3854 12.3404 23.2266 12.351 22.8769 9.52287C22.8558 9.31102 22.7181 9.17333 22.5168 9.17333C22.3262 9.17333 22.1885 9.31102 22.1567 9.51228C21.7966 12.3828 21.6906 12.4781 18.7566 12.8912C18.5765 12.9124 18.4389 13.0501 18.4389 13.2513C18.4389 13.442 18.5765 13.5691 18.7566 13.6009C21.6906 14.1622 21.786 14.1622 22.1567 16.9903C22.1885 17.1811 22.3262 17.3187 22.5168 17.3187ZM17.4537 10.1478C17.5809 10.1478 17.6445 10.0737 17.6656 9.95715C17.994 8.18825 17.9834 8.14588 19.8264 7.79634C19.9429 7.77515 20.0277 7.70101 20.0277 7.57391C20.0277 7.4468 19.9429 7.37265 19.8264 7.35147C17.9834 6.98075 18.0469 6.93837 17.6656 5.19066C17.6445 5.07415 17.5809 5 17.4537 5C17.3267 5 17.2525 5.07415 17.2313 5.19066C16.8606 6.93837 16.9242 6.98075 15.0811 7.35147C14.954 7.37265 14.8799 7.4468 14.8799 7.57391C14.8799 7.70101 14.954 7.77515 15.0811 7.79634C16.9242 8.16707 16.903 8.18825 17.2313 9.95715C17.2525 10.0737 17.3267 10.1478 17.4537 10.1478Z"
                        fill="#3EB76E" fillOpacity="0.7"/>
                    <path
                        d="M14.6575 26.9999C18.5342 26.9999 21.6801 25.051 23.0994 21.725C23.2902 21.2801 23.2266 20.92 23.0253 20.7188C22.8453 20.5281 22.5169 20.4963 22.1461 20.6341C21.3411 20.9518 20.3773 21.1425 19.1592 21.1425C14.4139 21.1425 11.3739 18.1766 11.3739 13.5373C11.3739 12.2556 11.6175 10.974 11.9459 10.3066C12.1471 9.89354 12.1365 9.52282 11.9459 9.31097C11.7446 9.07795 11.3845 9.0038 10.8973 9.19446C7.64545 10.5185 5.3999 13.9186 5.3999 17.8695C5.3999 23.0279 9.2025 26.9999 14.6575 26.9999Z"
                        fill="#3EB76E" fillOpacity="0.1"/>
                    <path
                        d="M21.9877 21.7493C20.6643 24.4177 18.0056 25.9999 14.6575 25.9999C9.75783 25.9999 6.3999 22.4786 6.3999 17.8695C6.3999 14.4636 8.23848 11.5724 10.8655 10.3025C10.5541 11.1704 10.3739 12.3876 10.3739 13.5373C10.3739 16.0809 11.2123 18.256 12.7884 19.7951C14.362 21.3317 16.5765 22.1425 19.1592 22.1425C20.2446 22.1425 21.1725 22.0029 21.9877 21.7493Z"
                        stroke="#3EB76E" strokeOpacity="0.7" strokeWidth="2"/>
                </svg>

            }
        </>
    )
}

export default ChangeThemeIcon