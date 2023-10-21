"use client";

import { Smile } from 'lucide-react';
import  Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useTheme } from 'next-themes';
import {Popover, PopoverTrigger, PopoverContent} from './ui/popover';

interface EmojiProps {
    onChange: (value: string) => void;
}

export const Emoji = ({onChange}: EmojiProps) => {
    const { theme } = useTheme();

    return (
        <Popover>
            <PopoverTrigger>
                <Smile
                    className="h-6 w-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
            </PopoverTrigger>
            <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-16'>
                <Picker 
                    theme={theme}
                    data={data}
                    onEmojiSelect={(emoji:any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}