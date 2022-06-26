import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_URL } from "./tokens";
import { Game } from "../models/game.model";

@Injectable()
export class GameService {
    private get endpoint(): string {
        return `${this.baseUrl}/Game/`;
    }
    constructor(
        @Inject(ENDPOINT_URL) private readonly baseUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    getGame(id: string): Observable<Game> {
        return this.httpClient.get<Game>(`${this.endpoint}Get/${id}`);
    }

    getGamesByGroupId(groupId: string): Observable<Game[]> {
        return this.httpClient.get<Game[]>(
            `${this.endpoint}/GetByGroup/${groupId}`
        );
    }

    createGame(game: Game): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.endpoint}/Create`, {
            game,
        });
    }

    updateGame(game: Game): Observable<boolean> {
        return this.httpClient.put<boolean>(
            `${this.endpoint}/Update/${game.id}`,
            { game }
        );
    }

    deleteGame(gameId: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(
            `${this.endpoint}/Delete/${gameId}`
        );
    }
}
