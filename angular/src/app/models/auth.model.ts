import { Player } from "./player.model";

export interface AuthenticatedUserModel {
	accessToken: string;
	userData: Player;
}

export interface LoginModel {
	username: string;
	password: string;
}

export interface SignupModel {
	signupData: LoginModel;
	player: Player;
}
