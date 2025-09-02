import { Component, OnInit } from "@angular/core";

import { SharedModule } from "../../../../shared/shared.module";

@Component({
    selector: "app-loading-dialog",
    templateUrl: "./loading-dialog.component.html",
    styleUrls: ["./loading-dialog.component.scss"],
    imports: [SharedModule]
})
export class LoadingDialogComponent {
  constructor() {}
}
