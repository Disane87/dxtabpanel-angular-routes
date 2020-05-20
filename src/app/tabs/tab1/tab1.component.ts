import { Component, OnInit, Inject } from "@angular/core";
import { CurrentTabInjector } from "../app.component";
import { Tab } from "../../app.component";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.component.html",
  styleUrls: ["./tab1.component.css"]
})
export class Tab1Component implements OnInit {
  // constructor(private tab: Tab) {
  //   console.log("Tab1 ctor");
  // }

  public count = -1;

  ngOnInit() {}

  ngOnDestroy() {
    console.log("Tab1 destroyed");
  }

  close() {
    this.tab.close();
  }
}
