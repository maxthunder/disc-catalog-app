import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {Disc} from "../../models/disc";
import {DiscService} from "../../services/disc.service";
import {take} from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ["link", "brand", "name", "stability", "speed", "glide", "turn", "fade"];
  discs: Disc[];

  constructor(private discService: DiscService) {
    this.loadDiscsFromDb();
  }

  private loadDiscsFromDb(): void {
    this.discService.loadAllDiscs()
        .pipe(take(1))
        .subscribe(
            data => {
              this.discs = data;
            },
            err => console.error(err),
        );
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
