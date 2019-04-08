export type Character = {
    name: string,
    playerName?: string,
    isPC: boolean
    currentHp?: number
    totalHp?: number
    initiative?: number
    baseInitiative: number
}