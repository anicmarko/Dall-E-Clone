import {surpriseMePrompts} from '../constants';

export function getRandomPrompt(prompt)
{
    const randIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randPrompt = surpriseMePrompts[randIndex];

    if(randPrompt === prompt) return getRandomPrompt(prompt);
    
    return randPrompt;
}