import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CreateGroupData, GroupModel, JoinGroupData } from "../models/group.model";
import { OperationReasonCode, OperationResponseModel } from "../models/operation-response.model";
import { PlayerModel } from "../models/player.model";
import { Variables } from "../models/types";
import { GroupService } from "./group.service";
import { MOCK_PLAYERS } from "./player.service.mock";

export const MOCK_GROUPS: GroupModel[] = [
	{
		id: "group01",
		name: "Scrabble GroupModel",
		creatorId: "1",
		avatar: "scrabble",
		participants: [
			{ playerId: "1", isActive: true },
			{ playerId: "2", isActive: true },
			{ playerId: "3", isActive: true },
			{ playerId: "4", isActive: true },
		],
	},
];

@Injectable()
export class GroupMockService implements Variables<GroupService> {
	getUserGroup(userId: string): Observable<GroupModel[]> {
		const result = MOCK_GROUPS.filter(group =>
			group.participants.some(participant => participant.isActive && participant.playerId === userId)
		);

		return of(result);
	}

	getPlayersInGroup(groupId: string): Observable<PlayerModel[]> {
		const group = MOCK_GROUPS.find(group => group.id === groupId);
		if (!group) return of([]);

		const players = MOCK_PLAYERS.filter(player =>
			group.participants.some(participant => participant.playerId === player.id)
		);

		return of(players);
	}

	createGroup(data: CreateGroupData) {
		data.group.id = `${MOCK_GROUPS.length}`;
		MOCK_GROUPS.push(data.group);

		return of();
	}

	joinGroup(data: JoinGroupData): Observable<OperationResponseModel> {
		const groupToJoin = MOCK_GROUPS.find(group => group.id === data.groupId);
		if (!groupToJoin) return of({ success: false, reasonCode: OperationReasonCode.GroupNotFound });

		const index = groupToJoin.participants.findIndex(participant => participant.playerId === data.playerId);
		if (index > 0) {
			groupToJoin.participants[index].isActive = true;
		} else {
			groupToJoin.participants.push({
				playerId: data.playerId,
				isActive: true,
			});
		}

		return of({
			success: true,
			reasonCode: OperationReasonCode.Success,
		});
	}

	leaveGroup(groupId: string, userId: string): Observable<boolean> {
		const groupToJoin = MOCK_GROUPS.find(group => group.id === groupId);
		if (!groupToJoin) return of(false);

		const index = groupToJoin.participants.findIndex(participant => participant.playerId === userId);
		if (index > 0) {
			groupToJoin.participants[index].isActive = false;
			return of(true);
		} else {
			return of(false);
		}
	}

	updateGroup(group: GroupModel, password: string): Observable<boolean> {
		const index = MOCK_GROUPS.findIndex(g => g.id === group.id);
		if (index < 0) return of(false);

		MOCK_GROUPS.splice(index, 1, group);
		return of(true);
	}

	deleteGroup(groupId: string, userId: string): Observable<boolean> {
		const index = MOCK_GROUPS.findIndex(group => group.id === group.id);
		if (MOCK_GROUPS[index].creatorId !== userId) return of(false);

		MOCK_GROUPS.slice(index, 0);
		return of(true);
	}
}
