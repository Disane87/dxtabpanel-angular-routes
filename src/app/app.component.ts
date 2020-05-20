import { Component, Injector, Type } from "@angular/core";

import { Router, RoutesRecognized, Route } from "@angular/router";

import { Subject } from "rxjs";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent {
  public tabs: Tab[] = [];
  public routes: Route[] = [];
  public currentHoverTabKey: string;
  public currentDraggedTab: Tab;
  public activatedTabIndex = 0;

  constructor(private router: Router, private injector: Injector) {
    // listen to routing change event to attach new tabs or activate a new one
    router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });
  }

  ngOnInit() {
    // get all routes to mock a navigation
    this.routes = this.router.config;
  }

  disposeTab(tab: Tab) {
    if (this.tabs.length > 1) {
      this.tabs = this.tabs.filter(item => item.key !== tab.key);

      // deactivate all tabs
      this.router.navigateByUrl(this.tabs[this.tabs.length - 1].route.path);
    }
  }

  checkAndAddRouteTab(val: RoutesRecognized) {
    // get the component to activate by the route
    const comp = val.state.root.firstChild.component;
    const currentRoute = val.state.root.firstChild.routeConfig;

    // check if the tab to be activated is already existing
    if (this.tabs.find(tab => tab.name === comp["name"]) == null) {
      // if not, push it into the tab array
      const newTab = new Tab(comp["name"], currentRoute, comp);
      newTab.injector = Injector.create({
        providers: [{ provide: Tab, useValue: newTab }],
        parent: this.injector
      });

      this.tabs.push(newTab);

      this.activatedTabIndex = this.tabs.length - 1;
    } else {
      // if the tab exists, activate it
      this.activatedTabIndex = this.tabs.findIndex(
        tab => tab.key === comp["name"]
      );
    }
  }

  tabChanged(event) {
    this.router.navigateByUrl(event.itemData.route.path);
  }
}

export class Tab {
  public name: string;
  public component: any;
  public route: Route;
  public key: string;
  public injector: Injector;
  private tabClose$: Subject<boolean>;

  constructor(name: string, route: Route, component: string | Type<any>) {
    this.name = name;
    this.route = route;
    this.component = component;
    this.key = name;
  }

  close() {
    this.tabClose$.next();
  }
}
