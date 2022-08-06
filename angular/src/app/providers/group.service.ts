import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_URL } from "./tokens";
import { CreateGroupData, GroupModel, JoinGroupData } from "../models/group.model";
import { PlayerModel } from "../models/player.model";
import { OperationResponseModel } from "../models/operation-response.model";

@Injectable({
	providedIn: "root",
})
export class GroupService {
	private get endpoint(): string {
		return `${this.baseUrl}/Group/`;
	}
	constructor(@Inject(ENDPOINT_URL) private readonly baseUrl: string, private readonly httpClient: HttpClient) {}

	getUserGroup(userId: string): Observable<GroupModel[]> {
		return this.httpClient.get<GroupModel[]>(`${this.endpoint}GetByUserId/${userId}`);
	}

	getPlayersInGroup(groupId: string): Observable<PlayerModel[]> {
		return this.httpClient.get<PlayerModel[]>(`${this.endpoint}/GetPlayers/${groupId}`);
	}

	createGroup(data: CreateGroupData): Observable<OperationResponseModel> {
		return this.httpClient.post<OperationResponseModel>(`${this.endpoint}/Add`, data);
	}

	joinGroup(data: JoinGroupData): Observable<OperationResponseModel> {
		return this.httpClient.post<OperationResponseModel>(`${this.baseUrl}/Join`, data);
	}

	leaveGroup(groupId: string, userId: string): Observable<boolean> {
		return this.httpClient.post<boolean>(`${this.baseUrl}/Leave/${groupId}`, {
			userId,
		});
	}

	updateGroup(group: GroupModel, password: string): Observable<boolean> {
		const body: CreateGroupData = { group, password };
		return this.httpClient.put<boolean>(`${this.endpoint}/Update/${group.id}`, body);
	}

	deleteGroup(groupId: string, userId: string): Observable<boolean> {
		return this.httpClient.delete<boolean>(`${this.endpoint}/Delete/${userId}/${groupId}`);
	}
}
