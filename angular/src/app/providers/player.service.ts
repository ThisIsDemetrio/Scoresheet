import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_URL } from "./tokens";
import { Player } from "../models/player.model";

@Injectable()
export class PlayerService {
	private get endpoint(): string {
		return `${this.baseUrl}/Player/`;
	}
	constructor(@Inject(ENDPOINT_URL) private readonly baseUrl: string, private readonly httpClient: HttpClient) {}

	getPlayer(id: string): Observable<Player> {
		return this.httpClient.get<Player>(`${this.endpoint}Get/${id}`);
	}

	getPlayersByName(name: string): Observable<Player[]> {
		return this.httpClient.get<Player[]>(`${this.endpoint}/FilterPlayers/${name}`);
	}

	updatePlayer(player: Player): Observable<boolean> {
		return this.httpClient.put<boolean>(`${this.endpoint}/Update/${player.id}`, { player });
	}

	deletePlayer(playerId: string): Observable<boolean> {
		return this.httpClient.delete<boolean>(`${this.endpoint}/Delete/${playerId}`);
	}
}
