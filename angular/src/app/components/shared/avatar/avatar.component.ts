import { Component, forwardRef, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Avatar, AVATAR_LIST } from "./utils";

@Component({
	selector: "app-avatar",
	templateUrl: "./avatar.component.html",
	styleUrls: ["./avatar.component.scss"],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AvatarComponent), multi: true }],
})
export class AvatarComponent implements ControlValueAccessor {
	// TODO: Use Optional<Avatar> instead of Avatar | null
	@ViewChild("avatarSelector") avatarSelector: any;
	matDialogRef: MatDialogRef<unknown, never> | null = null;
	avatarList = AVATAR_LIST;

	private innerValue: Avatar | null = null;

	set value(value: Avatar | null) {
		this.onTouch(value);
		if (value === this.innerValue) return;

		this.innerValue = value;
		this.onChange(value);
	}

	get value() {
		return this.innerValue;
	}

	writeValue(value: Avatar): void {
		this.innerValue = value;
	}

	constructor(private readonly matDialog: MatDialog) {}

	openAvatarDialog(): void {
		this.matDialogRef = this.matDialog.open(this.avatarSelector, {
			data: null,
			autoFocus: true,
			hasBackdrop: true,
			panelClass: "avatar-dialog",
		});
	}

	selectAvatar(avatar: Avatar): void {
		this.value = avatar;
		this.matDialogRef?.close();
	}

	onChange: (arg: Avatar | null) => void = (arg: Avatar | null) => {};
	onTouch: (arg: Avatar | null) => void = (arg: Avatar | null) => {};

	registerOnChange(fn: (newValue: Avatar | null) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: (newValue: Avatar | null) => void): void {
		this.onTouch = fn;
	}
}
