import { Player } from "./player.model";

export interface AuthenticatedUserModel {
	accessToken: string;
	userData: Player;
}
