function Footer() {
    return (
        <footer className="
            flex 
            flex-col 
            items-center 
            gap-3 
            py-6
            text-emerald-200/40
        ">

            <div className="flex gap-4 text-xs">
                <a
                    href="https://github.com/sebastian-fraga/lynk"
                    className="hover:text-green-200/90 transition"
                    target="_blank"
                    rel="noopener no-referrer"
                >
                    GitHub
                </a>

                <a
                    href="mailto:fragasebastian1@gmail.com"
                    className="hover:text-green-200/90 transition"
                    target="_blank"
                    rel="noopener no-referrer"
                >
                    Contacto
                </a>

                <a
                    href="https://ko-fi.com/sebastianfraga"
                    className="hover:text-green-200/90 transition"
                    target="_blank"
                    rel="noopener no-referrer"
                >
                    Invitame un café
                </a>
            </div>

            <p className="text-xs">
                © {new Date().getFullYear()} Lynk
            </p>
        </footer>
    )
}

export default Footer