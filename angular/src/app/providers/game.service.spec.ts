import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { GameService } from "./game.service";
import { ENDPOINT_URL } from "./tokens";
import { Game } from "../models/game.model";

const MOCK_GAME: Game = {
	id: "game_1",
	finished: false,
	groupId: "groupId",
	participantIds: ["player1", "player2"],
	score: [[12], [12]],
	results: {
		player1: 12,
		player2: 12,
	},
};

describe("GameService", () => {
	let service: GameService;
	let httpMock: HttpTestingController;

	const mockBaseUrl = "http://example.com/api";

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [GameService, { provide: ENDPOINT_URL, useValue: mockBaseUrl }],
		});

		service = TestBed.inject(GameService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should call correct endpoint and return game", () => {
		const gameId = "game123";
		const mockGame: Game = MOCK_GAME;

		service.getGame(gameId).subscribe(game => {
			expect(game).toEqual(mockGame);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Game/Get/${gameId}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockGame);
	});

	it("should call correct endpoint and return games by groupId", () => {
		const groupId = "group123";
		const mockGames: Game[] = [MOCK_GAME];

		service.getGamesByGroupId(groupId).subscribe(games => {
			expect(games).toEqual(mockGames);
		});

		const req = httpMock.expectOne(`${mockBaseUrl}/Game/GetByGroup/${groupId}`);
		expect(req.request.method).toBe("GET");
		req.flush(mockGames);
	});

	it("should call correct endpoint to create game", () => {
		const mockGame: Game = MOCK_GAME;

		service.createGame(mockGame).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Game/Create`);
		expect(req.request.method).toBe("POST");
		expect(req.request.body).toEqual({ game: mockGame });
	});

	it("should call correct endpoint to update game", () => {
		const game: Game = MOCK_GAME;

		service.updateGame(game).subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Game/Update/game_1`);
		expect(req.request.method).toBe("PUT");
		expect(req.request.body["game"]).toEqual(game);
	});

	it("should call correct endpoint to delete game", () => {
		service.deleteGame("gameId").subscribe();

		const req = httpMock.expectOne(`${mockBaseUrl}/Game/Delete/gameId`);
		expect(req.request.method).toBe("DELETE");
	});
});
