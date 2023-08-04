import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { RolesPermissionsService } from '../roles-permissions.service';

@Component({
  selector: 'app-active-deactive-roles',
  templateUrl: './active-deactive-roles.component.html',
  styleUrls: ['./active-deactive-roles.component.scss']
})
export class ActiveDeactiveRolesComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private rolesPermissionsService: RolesPermissionsService) {
    super(messageService, translates)
  }
  @Input() data: any = { role: { name: { en: null, ar: null } }, claims: {} }
  @Input() moduleId: any
  claims = []
  ngOnInit(): void {
    this.getClaims()
  }
  activeDeactiveClaim(claim) {
    const body = {
      roleId: this.data?.role?.id,
      claimId: claim?.id
    }

    if (claim.value == false) {
      this.deactiveClaimtoRole(body)

    } else {
      this.activeClaimtoRole(body)

    }

  }
  deactiveClaimtoRole(body) {
    this.rolesPermissionsService.dectiveClaimtoRole(body).subscribe(() => {
      this.loading = false
    }, error => {
      this.loading = false
    })
  }
  activeClaimtoRole(body) {
    this.rolesPermissionsService.activeClaimtoRole(body).subscribe(() => {
      this.loading = false
    }, error => {
      this.loading = false
    })
  }

  getClaims() {
    this.loading = true
    this.rolesPermissionsService.getClaims(this.moduleId).subscribe(claims => {
      this.claims = claims.data
      this.getRole()


    }, error => {
      this.loading = false

    })

  }

  getRole() {

    this.rolesPermissionsService.getRole(this.data?.id).subscribe(role => {
      this.data = role?.data
      this.data.claims.map(claim => {
        this.claims.map(item => {
          if (claim?.id == item?.id) {
            item['value'] = true
          }

        })
      })

      this.loading = false
    }, error => {
      this.loading = false
    })
  }
}
