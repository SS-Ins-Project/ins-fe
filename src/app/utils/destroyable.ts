import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class Destroyable implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  public readonly destroy$ = this._destroy$.asObservable();

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
