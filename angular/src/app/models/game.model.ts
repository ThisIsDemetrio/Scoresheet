export interface Game {
    id: string;
    finished: boolean;
    groupId: string;
    participantIds: string[];
    results: Record<string, number>;
    score: number[][];
}
