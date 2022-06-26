import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Group } from "../models/group.model";
import { Player } from "../models/player.model";
import { MOCK_PLAYERS } from "./player.service.mock";

export const MOCK_GROUPS: Group[] = [
    {
        id: "group01",
        name: "Scrabble Group",
        creatorId: "1",
        password: "password",
        avatarUrl: "scrabble",
        participants: [
            { playerId: "1", isActive: true },
            { playerId: "2", isActive: true },
            { playerId: "3", isActive: true },
            { playerId: "4", isActive: true },
        ],
    },
];

@Injectable()
export class GroupMockService {
    getUserGroup(userId: string): Observable<Group[]> {
        const result = MOCK_GROUPS.filter((group) =>
            group.participants.some(
                (participant) =>
                    participant.isActive && participant.playerId === userId
            )
        );

        return of(result);
    }

    getPlayersInGroup(groupId: string): Observable<Player[]> {
        const group = MOCK_GROUPS.find((group) => group.id === groupId);
        if (!group) return of([]);

        const players = MOCK_PLAYERS.filter((player) =>
            group.participants.some(
                (participant) => participant.playerId === player.id
            )
        );

        return of(players);
    }

    createGroup(group: Group, password: string): Observable<boolean> {
        group.password = password;
        group.id = `${MOCK_GROUPS.length}`;
        MOCK_GROUPS.push(group);

        return of(true);
    }

    joinGroup(
        groupId: string,
        userId: string,
        password: string
    ): Observable<boolean> {
        const groupToJoin = MOCK_GROUPS.find(
            (group) => group.id === groupId && group.password === password
        );
        if (!groupToJoin) return of(false);

        const index = groupToJoin.participants.findIndex(
            (participant) => participant.playerId === userId
        );
        if (index > 0) {
            groupToJoin.participants[index].isActive = true;
        } else {
            groupToJoin.participants.push({
                playerId: userId,
                isActive: true,
            });
        }

        return of(true);
    }

    leaveGroup(groupId: string, userId: string): Observable<boolean> {
        const groupToJoin = MOCK_GROUPS.find((group) => group.id === groupId);
        if (!groupToJoin) return of(false);

        const index = groupToJoin.participants.findIndex(
            (participant) => participant.playerId === userId
        );
        if (index > 0) {
            groupToJoin.participants[index].isActive = false;
            return of(true);
        } else {
            return of(false);
        }
    }

    updateGroup(group: Group, password: string): Observable<boolean> {
        const index = MOCK_GROUPS.findIndex(
            (g) => g.id === group.id && g.password === group.password
        );
        if (index < 0) return of(false);

        MOCK_GROUPS.splice(index, 1, group);
        return of(true);
    }

    deleteGroup(groupId: string, userId: string): Observable<boolean> {
        const index = MOCK_GROUPS.findIndex((group) => group.id === group.id);
        if (MOCK_GROUPS[index].creatorId !== userId) return of(false);

        MOCK_GROUPS.slice(index, 0);
        return of(true);
    }
}
