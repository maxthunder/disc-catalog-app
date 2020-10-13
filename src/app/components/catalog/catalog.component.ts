import {Component, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";
import {Disc} from "../../models/disc";
import {DiscService} from "../../services/disc.service";
import {take} from "rxjs/operators";

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
