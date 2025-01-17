import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductsService} from "../products.service";
import {ProductsAPIActions, ProductsPageActions} from "./products.actions";
import {catchError, concatMap, map, of} from "rxjs";

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private productsService: ProductsService) {
  }

  loadProdcuts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      concatMap(() => this.productsService.getAll().pipe(
        map((products) => ProductsAPIActions.productsLoadedSuccess({products})),
        catchError((error) => of(ProductsAPIActions.productsLoadedFail({message: error})))
      ))
    )
  )
}
