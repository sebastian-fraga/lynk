import { Chip } from './ui/Chip';
import { GithubIcon } from './icons/GithubIcon'

import { IconHistory, IconMoonFilled, IconSunFilled, IconLanguageHiragana } from '@tabler/icons-react';
import { Tooltip } from './ui/Tooltip';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
    onOpenHistory: () => void;
}

function Header({ onOpenHistory }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="flex justify-between w-[90vw] items-center mx-auto mt-4 lg:mt-6">
            <div>
                <a href="https://github.com/sebastian-fraga" referrer-policy="no-referrer" target="_blank">
                    <GithubIcon className="h-6 w-6 dark:text-green-100/80 text-emerald-950 dark:hover:text-white hover:text-emerald-500 transition" />
                </a>
            </div>
            <div className='flex items-center gap-5 text-white'>
                <Tooltip label="Historial de links" position="bottom">
                    <IconHistory
                        onClick={onOpenHistory}
                        className="dark:text-green-100/80 text-emerald-950 dark:hover:text-white hover:text-emerald-500 transition cursor-pointer"
                    />
                </Tooltip>
                <Tooltip label={isDark ? "Modo claro" : "Modo oscuro"} position="bottom">
                    {isDark ? (
                        <IconSunFilled
                            onClick={toggleTheme}
                            className="text-green-100/80 hover:text-white transition cursor-pointer"
                        />
                    ) : (
                        <IconMoonFilled
                            onClick={toggleTheme}
                            className="dark:text-green-100/80 text-emerald-950 dark:hover:text-white hover:text-emerald-500 transition cursor-pointer"
                        />
                    )}
                </Tooltip>
                <button className="appearance-none bg-transparent border-none p-0">
                    <Tooltip label="Idioma" position="bottom">
                        <Chip
                            icon={IconLanguageHiragana}
                            text="Español"
                            isClickable={true}
                        />
                    </Tooltip>
                </button>
            </div>
        </header>
    )
}
export default Header