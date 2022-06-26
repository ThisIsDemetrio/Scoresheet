import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Game } from "../models/game.model";
import { MOCK_GROUPS } from "./group.service.mock";

export const MOCK_GAMES: Game[] = [
    {
        id: "game01",
        finished: false,
        groupId: "group01",
        participantIds: ["1", "2", "3", "4"],
        results: { "2": 21, "4": 19, "1": 17, "3": 17 },
        score: [
            [11, 9, 7, 10],
            [6, 12, 10, 9],
        ],
    },
];

@Injectable()
export class GameMockService {
    getGame(id: string): Observable<Game | undefined> {
        const result = MOCK_GAMES.find((game) => game.id === id);
        return of(result);
    }

    getGamesByGroupId(groupId: string): Observable<Game[]> {
        const result = MOCK_GAMES.filter((game) => game.groupId === groupId);
        return of(result);
    }

    createGame(game: Game): Observable<boolean> {
        MOCK_GAMES.push(game);
        return of(true);
    }

    updateGame(game: Game): Observable<boolean> {
        const index = MOCK_GAMES.findIndex((g) => game.id === g.id);
        if (index < 0) return of(false);

        MOCK_GAMES.splice(index, 1, game);
        return of(true);
    }

    deleteGame(gameId: string): Observable<boolean> {
        const index = MOCK_GAMES.findIndex((game) => game.id === gameId);
        MOCK_GAMES.splice(index, 0);
        return of(true);
    }
}
