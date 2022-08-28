import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of } from "rxjs";
import { IdTextModel } from "src/app/models/shared.model";
import { Optional } from "src/app/models/types";
import { GroupService } from "src/app/providers/group.service";
import { debounceTime, distinctUntilChanged, startWith, map, tap, switchMap, catchError, filter } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

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

	private selectedValue: Optional<string> = null;
	private innerValue: Optional<string> = null;

	set value(value: Optional<string>) {
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
				this.hasNoResults = false;
				this.isLoading = true;
				this.errorWhileLoading = false;
			}),
			switchMap(text => this.service.getGroupsByName(text)),
			catchError(__ => {
				this.errorWhileLoading = true;
				return of([]);
			}),
			tap(groups => {
				this.hasNoResults = !this.errorWhileLoading && groups.length === 0;
				this.isLoading = false;
			})
		);
	}

	onGroupSelected(event: MatAutocompleteSelectedEvent): void {
		this.selectedValue = event.option.value ?? null;
		this.value = event.option.value?.id;

		this.groupFormControl.patchValue(event.option.value?.text, { emitEvent: false });
	}

	writeValue(value: Optional<string>): void {
		// We assume we always start will null values
		this.innerValue = null;
	}

	onChange: (arg: Optional<string>) => void = (arg: Optional<string>) => {};
	onTouch: (arg: Optional<string>) => void = (arg: Optional<string>) => {};

	registerOnChange(fn: (newValue: Optional<string>) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: (newValue: Optional<string>) => void): void {
		this.onTouch = fn;
	}
}
