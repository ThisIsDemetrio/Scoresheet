import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_URL } from "./tokens";
import { Player, PlayerWithPassword } from "../models/player.model";
import { IdPasswordModel } from "../models/shared.model";

@Injectable()
export class PlayerService {
    private get endpoint(): string {
        return `${this.baseUrl}/Player/`;
    }
    constructor(
        @Inject(ENDPOINT_URL) private readonly baseUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    getPlayer(id: string): Observable<Player> {
        return this.httpClient.get<Player>(`${this.endpoint}Get/${id}`);
    }

    loginPlayer(id: string, password: string): Observable<Player> {
        const body: IdPasswordModel = { id, password };
        return this.httpClient.post<Player>(`${this.endpoint}/Login`, body);
    }

    getPlayersByName(name: string): Observable<Player[]> {
        return this.httpClient.get<Player[]>(
            `${this.endpoint}/FilterPlayers/${name}`
        );
    }

    createPlayer(player: PlayerWithPassword): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.endpoint}/Create`, {
            player,
        });
    }

    updatePlayer(player: Player): Observable<boolean> {
        return this.httpClient.put<boolean>(
            `${this.endpoint}/Update/${player.id}`,
            { player }
        );
    }

    deletePlayer(playerId: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(
            `${this.endpoint}/Delete/${playerId}`
        );
    }
}
