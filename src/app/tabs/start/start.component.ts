import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
  constructor() {
    console.log("Start ctor");
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log("Start destroyed");
  }
}
