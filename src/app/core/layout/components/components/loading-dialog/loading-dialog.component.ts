import { Component } from "@angular/core";
import { MaterialProgressModule } from "../../../../../shared/material/material-progress.module";
import { SharedModule } from "../../../../../shared/shared.module";

@Component({
    selector: "app-loading-dialog",
    templateUrl: "./loading-dialog.component.html",
    styleUrls: ["./loading-dialog.component.scss"],
    standalone: true,
    imports: [SharedModule,MaterialProgressModule]
})
export class LoadingDialogComponent {
  constructor() {}
}
