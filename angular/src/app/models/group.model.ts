export interface Group {
    id: string;
    name: string;
    creatorId: string;
    password: string;
    avatarUrl: string;
    participants: GroupParticipant[];
}

export class GroupParticipant {
    playerId: string;
    isActive: boolean;
}

export interface CreateGroupData {
    group: Group;
    password: string;
}
