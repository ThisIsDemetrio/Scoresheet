import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of } from "rxjs";
import { IdTextModel } from "src/app/models/shared.model";
import { debounceTime, distinctUntilChanged, startWith, tap, switchMap, catchError, filter } from "rxjs/operators";
import { PlayerService } from "src/app/providers/player.service";

@Component({
	selector: "app-search-players",
	templateUrl: "search-players.component.html",
	styleUrls: ["search-players.component.scss"],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchPlayersComponent), multi: true }],
})
export class SearchPlayersComponent implements ControlValueAccessor, OnInit {
	playerFormControl = new FormControl();
	players: Observable<IdTextModel[]> = of([]);

	errorWhileLoading = false;
	hasNoResults = false;
	isLoading = false;

	private innerValue: IdTextModel[] = [];

	set value(value: IdTextModel[]) {
		this.onTouch(value);
		if (value === this.innerValue) return;

		this.innerValue = value;
		this.onChange(value);
	}

	get value() {
		return this.innerValue;
	}

	constructor(private readonly service: PlayerService) {}

	ngOnInit(): void {
		this.players = this.playerFormControl.valueChanges.pipe(
			startWith(""),
			debounceTime(500),
			filter(text => text?.length > 3),
			distinctUntilChanged(),
			tap(__ => {
				this.isLoading = false;
				this.errorWhileLoading = false;
			}),
			switchMap(text => this.service.getPlayersByName(text)),
			catchError(__ => {
				this.errorWhileLoading = true;
				return of([]);
			}),
			tap(players => {
				this.hasNoResults = !this.errorWhileLoading && players.length > 0;
				this.isLoading = false;
			})
		);
	}

	writeValue(value: IdTextModel[]): void {
		// We assume we always start will null values
		this.innerValue = [];
	}

	onChange: (arg: IdTextModel[]) => void = (arg: IdTextModel[]) => {};
	onTouch: (arg: IdTextModel[]) => void = (arg: IdTextModel[]) => {};

	registerOnChange(fn: (newValue: IdTextModel[]) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: (newValue: IdTextModel[]) => void): void {
		this.onTouch = fn;
	}
}
