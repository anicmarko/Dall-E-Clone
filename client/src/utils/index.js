import FileSaver from 'file-saver';
import {surpriseMePrompts} from '../constants';
import fileSaver from 'file-saver';

export function getRandomPrompt(prompt)
{
    const randIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randPrompt = surpriseMePrompts[randIndex];

    if(randPrompt === prompt) return getRandomPrompt(prompt);
    
    return randPrompt;
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpeg`);
}