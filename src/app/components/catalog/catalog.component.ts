import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {Disc} from "../../models/disc";
import {DiscService} from "../../services/disc.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-catalog',
  /*
     * Set a fixed row height of 36px (20px line height, 2 * 8px padding)
     *
     * [row height] = [line height] + [padding] + [border]
     *
     * Note: If using the Kendo UI Material theme, add 1px to the row height
     * to account for the bottom border width.
     */
  encapsulation: ViewEncapsulation.None,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnDestroy {
  // dtOptions: DataTables.Settings = {};
  // // We use this trigger because fetching the list of subjects can be quite long,
  // // thus we ensure the data is fetched before rendering
  // dtTrigger: Subject<any> = new Subject();

  public gridView: GridDataResult;
  public data: Array<Disc>;
  public pageSize = 100;
  public skip = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private discService: DiscService) {
    this.loadDiscsFromDb();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public pageChange(event: PageChangeEvent): void {
    console.log("page change.");
    this.skip = event.skip;
    this.loadDiscsIntoGrid();
  }

  private loadDiscsIntoGrid(): void {
    this.gridView = {
      data: this.data.slice(this.skip, this.skip + this.pageSize),
      total: this.data.length
    };
  }

  private loadDiscsFromDb(): void {
    this.discService.loadAllDiscs()
        .pipe(take(1))
        .subscribe(
            data => {
              this.data = data;
              this.loadDiscsIntoGrid();
            },
            err => console.error(err),
        );
  }
}
