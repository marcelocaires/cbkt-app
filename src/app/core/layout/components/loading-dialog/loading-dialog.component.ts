import { Component } from "@angular/core";
import { MaterialProgressModule } from "../../../../shared/material/material-progress.module";
import { SharedModule } from "../../../../shared/shared.module";
import { MaterialLayoutModule } from "../../../../shared/material/material-layout.module";

@Component({
    selector: "app-loading-dialog",
    templateUrl: "./loading-dialog.component.html",
    styleUrls: ["./loading-dialog.component.scss"],
    standalone: true,
    imports: [SharedModule,MaterialProgressModule,MaterialLayoutModule]
})
export class LoadingDialogComponent {
  constructor() {}
}
