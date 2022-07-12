import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PlayerModel, PlayerWithPassword } from "../models/player.model";

export const MOCK_PLAYERS: PlayerModel[] = [
	{ id: "1", name: "Erica", groups: ["group01"] },
	{ id: "2", name: "Sabrina", groups: ["group01"] },
	{ id: "3", name: "Chiara", groups: ["group01"] },
	{ id: "4", name: "Gabriella", groups: ["group01"] },
];

@Injectable()
export class PlayerMockService {
	getPlayer(id: string): Observable<PlayerModel | undefined> {
		const result = MOCK_PLAYERS.find(player => player.id === id);
		return of(result);
	}

	loginPlayer(id: string, password: string): Observable<PlayerModel | undefined> {
		const result = MOCK_PLAYERS.find(player => player.id === id);
		return of(result);
	}

	getPlayersByName(name: string): Observable<PlayerModel[]> {
		const result = MOCK_PLAYERS.filter(player => player.name === name);
		return of(result);
	}

	createPlayer(player: PlayerWithPassword): Observable<boolean> {
		MOCK_PLAYERS.push(player);
		return of(true);
	}

	updatePlayer(player: PlayerModel): Observable<boolean> {
		const index = MOCK_PLAYERS.findIndex(p => p.id === player.id);
		if (index < 0) return of(false);

		MOCK_PLAYERS.splice(index, 1, player);
		return of(true);
	}

	deletePlayer(playerId: string): Observable<boolean> {
		const index = MOCK_PLAYERS.findIndex(player => player.id === playerId);
		MOCK_PLAYERS.slice(index, 0);
		return of(true);
	}
}
