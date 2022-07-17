export interface PlayerModel {
	id: string | null;
	name: string;
	// TODO: Rename to avatar
	avatarUrl?: string;
	groups: string[];
}
