import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from '../Main/app.main.component';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent extends BaseComponent implements OnDestroy, OnInit {

    subscription: Subscription;
    items: MenuItem[];
    user = this.authService?.getAuthData()?.user
    currentLogo: any
    constructor(public app: AppComponent, public appMain: AppMainComponent,
        private coreService: CoreService, private sanitizer: DomSanitizer,
        private translate: TranslateService, private route: ActivatedRoute, private router: Router,
        private authService: AuthService,
        @Inject(DOCUMENT) private document: Document) {
        super(null, translate)
    }
    ngOnInit(): void {
        this.getGenralSettings()

    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    changeLang(lang) {
        localStorage.removeItem('genralSettings')
        localStorage.setItem('currentLang', lang)
        localStorage.removeItem('settings')
        location.reload()
    }
    logOut() {
        this.authService.clearAuthData()
        this.router.navigate(['/login']);

    }
    getGenralSettings() {
        this.coreService.genralSettingsEmitter.subscribe(genralSettings => {
            if (!isSet(genralSettings)) {
                return
            }
            this.currentLogo = genralSettings?.find(item => item?.key == 'Logo').value

        })
    }


    sanitize(file: any) {
        return this.sanitizer.bypassSecurityTrustUrl(file.objectURL.changingThisBreaksApplicationSecurity);
    }

  
}
