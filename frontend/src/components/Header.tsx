import { Chip } from './ui/Chip';
import { GithubIcon } from './icons/GithubIcon'

import { IconHistory, IconMoonFilled, IconLanguageHiragana } from '@tabler/icons-react';
import { Tooltip } from './ui/Tooltip';

interface HeaderProps {
    onOpenHistory: () => void;
}

function Header({ onOpenHistory }: HeaderProps) {
    return (
        <header className="flex justify-between w-[90vw] items-center mx-auto mt-4 lg:mt-6">
            <div>
                <a href="https://github.com/sebastian-fraga" referrer-policy="no-referrer" target="_blank">
                    <GithubIcon className="h-6 w-6 text-green-100/85 hover:text-white transition" />
                </a>
            </div>
            <div className='flex items-center gap-5 text-white'>
                <Tooltip label="Historial de links" position="bottom">
                    <IconHistory
                        onClick={onOpenHistory}
                        className="text-green-100/80 hover:text-white transition cursor-pointer"
                    />
                </Tooltip>
                <Tooltip label="Modo oscuro" position="bottom">
                    <IconMoonFilled className='text-green-100/80 hover:text-white transition cursor-pointer' />
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