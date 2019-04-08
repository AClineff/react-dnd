import { Character } from "./types/character";

export function createEmptyCharacterObject(): Character{
    return {
        name: '',
        playerName: '',
        initiative: 0,
        baseInitiative: 0,
        currentHp: 0,
        isPC: false,
        totalHp: 0
    }
}

export function createPC(name: string, baseInitiative: number = 0): Character{
    return {
        name,
        baseInitiative,
        isPC: true,
    }
}

export function createNPC(name: string, baseInitiative: number = 0): Character{
    return {
        name,
        baseInitiative,
        isPC: false,
    }
}

export function sortByInitiative(characters: Character[]): Character[] {
    function compare(a: Character, b:Character){
        if(a.initiative && b.initiative) return a.initiative - b.initiative;
        else if(a.initiative && !b.initiative) return 1;
        else if(b.initiative) return -1;
        return 0;
    }

    return characters.splice(0).sort(compare);
}