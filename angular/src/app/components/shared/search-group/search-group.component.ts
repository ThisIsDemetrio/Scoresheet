import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of } from "rxjs";
import { IdTextModel } from "src/app/models/shared.model";
import { Optional } from "src/app/models/types";
import { GroupService } from "src/app/providers/group.service";
import { debounceTime, distinctUntilChanged, startWith, map, tap, switchMap, catchError, filter } from "rxjs/operators";

@Component({
	selector: "app-search-group",
	templateUrl: "search-group.component.html",
	styleUrls: ["search-group.component.scss"],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchGroupComponent), multi: true }],
})
export class SearchGroupComponent implements ControlValueAccessor, OnInit {
	groupFormControl = new FormControl();
	groups: Observable<IdTextModel[]> = of([]);

	errorWhileLoading = false;
	hasNoResults = false;
	isLoading = false;

	private innerValue: Optional<IdTextModel> = null;

	set value(value: Optional<IdTextModel>) {
		this.onTouch(value);
		if (value === this.innerValue) return;

		this.innerValue = value;
		this.onChange(value);
	}

	get value() {
		return this.innerValue;
	}

	constructor(private readonly service: GroupService) {}

	ngOnInit(): void {
		this.groups = this.groupFormControl.valueChanges.pipe(
			startWith(""),
			debounceTime(500),
			filter(text => text?.length > 3),
			distinctUntilChanged(),
			tap(__ => {
				this.isLoading = false;
				this.errorWhileLoading = false;
			}),
			switchMap(text => this.service.getGroupsByName(text)),
			catchError(__ => {
				this.errorWhileLoading = true;
				return of([]);
			}),
			tap(groups => {
				this.hasNoResults = !this.errorWhileLoading && groups.length > 0;
				this.isLoading = false;
			})
		);
	}

	writeValue(value: Optional<IdTextModel>): void {
		// We assume we always start will null values
		this.innerValue = null;
	}

	onChange: (arg: Optional<IdTextModel>) => void = (arg: Optional<IdTextModel>) => {};
	onTouch: (arg: Optional<IdTextModel>) => void = (arg: Optional<IdTextModel>) => {};

	registerOnChange(fn: (newValue: Optional<IdTextModel>) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: (newValue: Optional<IdTextModel>) => void): void {
		this.onTouch = fn;
	}
}
