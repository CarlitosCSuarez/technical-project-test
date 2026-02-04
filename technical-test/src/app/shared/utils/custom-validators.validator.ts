import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ProductService } from "../../core/services/product-service";
import { catchError, map, Observable, of } from "rxjs";
import { inject } from "@angular/core";

export class CustomValidators {

    private service = inject(ProductService);

    /*
    * If the date is not earlier than today.
    */
    static checkDateFuture(control: AbstractControl): ValidationErrors | null {

        let value = control.value;

        // To required
        if (!value) {
            return null;
        }

        // Formatt date
        let parts: string[] = value.split('-');
        let year: number = Number(parts[0]);
        let month: number = Number(parts[1]) - 1;
        let day: number = Number(parts[2]);

        let date: Date = new Date(year, month, day);
        let today: Date = new Date();

        today.setHours(0, 0, 0, 0);

        if (date >= today) {
            // No error found.
            return null;
        }

        // About error.
        return { pastDate: true };
    }



    /*
    * The date should be one year later
    */
    static checkDateFutureYear(group: AbstractControl): ValidationErrors | null {

        let date_release = group.get('date_release')?.value;
        let date_revision = group.get('date_revision')?.value;

        // To required
        if (!date_release || !date_revision) {
            return null;
        };

        // date_release
        let parts: string[] = date_release?.split('-');
        let year: number = Number(parts[0]);
        let month: number = Number(parts[1]) - 1;
        let day: number = Number(parts[2]);

        let yearExpected = new Date(year + 1, month, day);
        yearExpected.setHours(0, 0, 0, 0);

        // date_revision
        parts = date_revision?.split('-');
        year = Number(parts[0]);
        month = Number(parts[1]) - 1;
        day = Number(parts[2]);

        let dateRevision = new Date(year, month, day);
        dateRevision.setHours(0, 0, 0, 0);

        // About error.
        if (yearExpected.getTime() !== dateRevision.getTime()) {
            return { noYearExpected: true };
        }

        // No error found.
        return null;
    }


    static checkUniqueId(service: ProductService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            if (!control.value) {
                return of(null);
            }

            return service.checkIdProduct(control.value)
                .pipe(map((unique: Boolean) => {
                    return unique ? { exists: true } : null;
                }),
                    catchError(() => {
                        return of(null);
                    }));
        }
    }




}