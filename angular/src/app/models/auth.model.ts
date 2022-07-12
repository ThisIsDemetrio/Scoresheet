import { PlayerModel } from "./player.model";

export interface AuthenticatedUserModel {
	accessToken: string;
	userData: PlayerModel;
}

export interface LoginModel {
	username: string;
	password: string;
}

export interface SignupModel {
	signupData: LoginModel;
	player: PlayerModel;
}
