import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { GroupService } from "./group.service";
import { ENDPOINT_URL } from "./tokens";
import { GroupModel, CreateGroupData, JoinGroupData } from "../models/group.model";
import { PlayerModel } from "../models/player.model";
import { OperationReasonCode, OperationResponseModel } from "../models/operation-response.model";
import { IdTextModel } from "../models/shared.model";

describe("GroupService", () => {
	let service: GroupService;
	let httpMock: HttpTestingController;

	const mockBaseUrl = "http://example.com/api";

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [GroupService, { provide: ENDPOINT_URL, useValue: mockBaseUrl }],
		});

		service = TestBed.inject(GroupService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should call correct endpoint and return user groups", () => {
		const userId = "user123";
		const mockGroups: GroupModel[] = [{ id: "group1", name: "Group 1", creatorId: "playerId", participants: [] }];

		service.getUserGroups(userId).subscribe(groups => {
			expect(groups).toEqual(mockGroups);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/GetGroupsByPlayerId/${userId}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockGroups);
	});

	it("should call correct endpoint and return players in group", () => {
		const groupId = "group123";
		const mockPlayers: PlayerModel[] = [{ id: "player1", name: "Player 1", groups: [] }];

		service.getPlayersInGroup(groupId).subscribe(players => {
			expect(players).toEqual(mockPlayers);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/GetPlayers/${groupId}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockPlayers);
	});

	it("should call correct endpoint to create group", () => {
		const mockData: CreateGroupData = {
			group: { name: "New Group", id: "groupId", creatorId: "creatorId", participants: [] },
			password: "password",
		};

		service.createGroup(mockData).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/Add`);
		expect(req.request.method).toBe("POST");
		expect(req.request.body).toEqual(mockData);
	});

	// Similar tests can be written for other methods (updateGroup, deleteGroup, etc.)

	it("should call correct endpoint and return groups by name", () => {
		const searchText = "Group";
		const mockGroups: IdTextModel[] = [{ id: "group1", text: "Group 1" }];

		service.getGroupsByName(searchText).subscribe(groups => {
			expect(groups).toEqual(mockGroups);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/GetGroupsByName/${searchText}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockGroups);
	});

	it("should call correct endpoint to join group", () => {
		const mockData: JoinGroupData = { groupId: "group1", playerId: "user1", password: "password" };
		const mockResponse: OperationResponseModel = { success: true, reasonCode: OperationReasonCode.Success };

		service.joinGroup(mockData).subscribe(response => {
			expect(response).toEqual(mockResponse);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/Join`);
		expect(req.request.method).toBe("POST");
		expect(req.request.body).toEqual(mockData);
		req.flush(mockResponse);
	});

	it("should call correct endpoint to update group", () => {
		const groupModel: GroupModel = { id: "groupId", creatorId: "user1", name: "Group #1", participants: [] };
		const password: string = "password";

		service.updateGroup(groupModel, password).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/Update/groupId`);
		expect(req.request.method).toBe("PUT");
		expect(req.request.body).toEqual({ group: groupModel, password });
	});

	it("should call correct endpoint to delete group", () => {
		service.deleteGroup("groupId", "userId").subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/Delete/userId/groupId`);
		expect(req.request.method).toBe("DELETE");
	});

	it("should call correct endpoint to leave group", () => {
		const groupId = "group1";
		const userId = "user1";

		service.leaveGroup(groupId, userId).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Group/Leave/${groupId}`);
		expect(req.request.method).toBe("POST");
		expect(req.request.body).toEqual({ userId });
	});
});
