import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public mobileBreakpoint: string = '(max-width: 599px)';
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  
  // Snackbar Config params
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar
  ) {}

  /**
   * Manage the mobileIs environment variable
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setIsMobile();
  }

  setIsMobile() {
    environment.isMobile = this.breakpointObserver.isMatched(
      this.mobileBreakpoint
    );
  }
  get isMobile() {
    return environment.isMobile;
  }

  /**
   * Loading
   * Loading component is setted in app.component
   */

  showLoader() {
    this.isLoadingSubject.next(true);
  }

  hideLoader() {
    this.isLoadingSubject.next(false);
  }

  /**
   * Snackbars 
   */

  showSuccess(message: string) {
    this.openSnackBar(message,"OK",{
      duration: 50000,
      verticalPosition: this.verticalPosition,
      panelClass: 'app-notification-success'
    })
  }

  showError(message: string) {
    this.openSnackBar(message,"OK",{
      duration: 50000,
      verticalPosition: this.verticalPosition,
      panelClass: 'app-notification-error'
    })
  }

  openSnackBar(message: string, action: string, params: any) {
    this._snackBar.open(message, action, params);
  }
}
