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
	@ViewChild("avatarSelector") avatarSelector: any;
	matDialogRef: MatDialogRef<unknown, never> | null = null;
	avatarList = AVATAR_LIST;

	private innerValue: Avatar | null = null;

	set value(value: Avatar | null) {
		this.onTouch();
		if (value === this.innerValue) return;

		this.innerValue = value;
		this.onChange();
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

	onChange = () => {};
	onTouch = () => {};

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}
}
