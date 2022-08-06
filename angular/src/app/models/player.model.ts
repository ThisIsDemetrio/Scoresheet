import { Optional } from "./types";

export interface PlayerModel {
	id: Optional<string>;
	name: string;
	avatar?: string;
	groups: string[];
}
