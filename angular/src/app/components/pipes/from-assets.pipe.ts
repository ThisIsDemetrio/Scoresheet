import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "fromAssets" })
export class FromAssetsPipe implements PipeTransform {
	transform(value: string, ...args: string[]) {
		return `${["assets", ...args].join("/")}/${value}`;
	}
}
