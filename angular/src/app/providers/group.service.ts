import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_URL } from "./tokens";
import { CreateGroupData, GroupModel, JoinGroupData } from "../models/group.model";
import { PlayerModel } from "../models/player.model";
import { OperationResponseModel } from "../models/operation-response.model";
import { IdTextModel } from "../models/shared.model";

@Injectable({
	providedIn: "root",
})
export class GroupService {
	private get endpoint(): string {
		return `${this.baseUrl}/Group/`;
	}
	constructor(@Inject(ENDPOINT_URL) private readonly baseUrl: string, private readonly httpClient: HttpClient) {}

	getUserGroups(userId: string): Observable<GroupModel[]> {
		return this.httpClient.get<GroupModel[]>(`${this.endpoint}GetByUserId/${userId}`);
	}

	getPlayersInGroup(groupId: string): Observable<PlayerModel[]> {
		return this.httpClient.get<PlayerModel[]>(`${this.endpoint}GetPlayers/${groupId}`);
	}

	//#region CRUD operations on groups
	createGroup(data: CreateGroupData): Observable<void> {
		return this.httpClient.post<void>(`${this.endpoint}Add`, data);
	}

	updateGroup(group: GroupModel, password: string): Observable<boolean> {
		const body: CreateGroupData = { group, password };
		return this.httpClient.put<boolean>(`${this.endpoint}Update/${group.id}`, body);
	}

	deleteGroup(groupId: string, userId: string): Observable<boolean> {
		return this.httpClient.delete<boolean>(`${this.endpoint}Delete/${userId}/${groupId}`);
	}
	//#endregion

	getGroupsByName(text: string): Observable<IdTextModel[]> {
		return this.httpClient.get<IdTextModel[]>(`${this.endpoint}GetGroupsByName/${text}`);
	}
	joinGroup(data: JoinGroupData): Observable<OperationResponseModel> {
		return this.httpClient.post<OperationResponseModel>(`${this.endpoint}Join`, data);
	}

	leaveGroup(groupId: string, userId: string): Observable<boolean> {
		return this.httpClient.post<boolean>(`${this.endpoint}Leave/${groupId}`, {
			userId,
		});
	}
}
