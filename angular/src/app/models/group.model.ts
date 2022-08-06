export interface GroupModel {
	id: string;
	name: string;
	creatorId: string;
	password: string;
	avatar: string;
	participants: GroupParticipantModel[];
}

export interface GroupParticipantModel {
	playerId: string;
	isActive: boolean;
}

export interface CreateGroupData {
	group: GroupModel;
	password: string;
}

export interface JoinGroupData {
	playerId: string;
	groupId: string;
	password: string;
}
