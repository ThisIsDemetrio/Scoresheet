import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PlayerService } from "./player.service";
import { ENDPOINT_URL } from "./tokens";
import { PlayerModel } from "../models/player.model";
import { IdTextModel } from "../models/shared.model";

describe("PlayerService", () => {
	let service: PlayerService;
	let httpMock: HttpTestingController;

	const mockBaseUrl = "http://example.com/api";

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [PlayerService, { provide: ENDPOINT_URL, useValue: mockBaseUrl }],
		});

		service = TestBed.inject(PlayerService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should call correct endpoint and return player", () => {
		const playerId = "player123";
		const mockPlayer: PlayerModel = { id: "player123", name: "Player 1", groups: [] };

		service.getPlayer(playerId).subscribe(player => {
			expect(player).toEqual(mockPlayer);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Player/Get/${playerId}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockPlayer);
	});

	it("should call correct endpoint and return players by name", () => {
		const playerName = "John";
		const mockPlayers: IdTextModel[] = [{ id: "player1", text: "John Doe" }];

		service.getPlayersByName(playerName).subscribe(players => {
			expect(players).toEqual(mockPlayers);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Player/GetPlayersByName/${playerName}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockPlayers);
	});

	it("should call correct endpoint to update player", () => {
		const mockPlayer: PlayerModel = { id: "player123", name: "Updated Player", groups: [] };

		service.updatePlayer(mockPlayer).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Player/Update/${mockPlayer.id}`);
		expect(req.request.method).toBe("PUT");
		expect(req.request.body).toEqual({ player: mockPlayer });
	});

	it("should call correct endpoint to delete player", () => {
		const playerId = "player123";

		service.deletePlayer(playerId).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Player/Delete/${playerId}`);
		expect(req.request.method).toBe("DELETE");
	});
});
