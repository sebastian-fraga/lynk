import { Chip } from './ui/Chip';
import { GithubIcon } from './icons/GithubIcon'

import { IconHistory, IconMoon, IconLanguageHiragana } from '@tabler/icons-react';
import { Tooltip } from './ui/Tooltip';


function Header() {
    return (
        <header className="flex justify-between w-[90vw] items-center mx-auto mt-4 lg:mt-6">
            <div>
                <a href="https://github.com/sebastian-fraga" referrer-policy="no-referrer" target="_blank">
                    <GithubIcon className="h-6 w-6" />
                </a>
            </div>
            <div className='flex items-center gap-5 text-white'>
                <Tooltip label="Historial de links" position="bottom">
                    <IconHistory />
                </Tooltip>
                <Tooltip label="Modo oscuro" position="bottom">
                    <IconMoon />
                </Tooltip>
                <button className="appearance-none bg-transparent border-none p-0">
                    <Tooltip label="Idioma" position="bottom">
                        <Chip
                            icon={IconLanguageHiragana}
                            text="Español"
                        />
                    </Tooltip>
                </button>
            </div>
        </header>
    )
}
export default Header