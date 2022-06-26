import { Player } from "./player.model";

export interface AuthData {
	accessToken: string;
	userData: Player;
}
