import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, checkPrivileges, isSet, moduleId } from 'src/app/core/base/base.component';
import { Committees } from 'src/app/modals/committees';
import { CommitteesService } from '../committees.service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-committees-details',
  templateUrl: './committees-details.component.html',
  styleUrls: ['./committees-details.component.scss']
})
export class CommitteesDetailsComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private committeesService: CommitteesService, public translates: TranslateService,
    private datePipe: DatePipe,
    public messageService: MessageService, private confirmationService: ConfirmationService, private authService: AuthService,
    private activateRoute: ActivatedRoute, private coreService: CoreService) {
    super(messageService, translates)
  }
  committee = new Committees()
  committeeActinos = []
  committeePrivileges = []

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();


  committeeID: any
  newMember: any
  newMemberModal = false
  ngOnInit(): void {
    this.getFormUrl()
    this.newCommitteeMeetEmitter()
    this.getCommitteeActinos()
  }
  getCommitteeActinos() {
    this.committeeActinos = []
    this.coreService.getPrivileges(moduleId('Committee'), this.committeeID).subscribe((privileges: any) => {
      this.committeePrivileges = privileges?.data
      this.committeePrivileges.map(action => {
        if (action?.hasPermission == true) {

          if (action?.permissionName == "UpdateCommitteeCommand") {
            this.committeeActinos.push({
              label: this.trans('Edit') + '\n' + this.trans('Committee'),
              icon: 'pi pi-pencil',
              command: () => {
                this.display = false
                this.router.navigate([], {
                  queryParams: {
                    committeeID: this.committeeID,
                    view: 'edit'
                  },
                  queryParamsHandling: 'merge',
                })
                setTimeout(() => {
                  this.displayChange.emit(false)
                }, 300);

              }
            }
            )
          }

          if (action?.permissionName == 'DeleteCommitteeCommand') {
            this.committeeActinos.push({
              label: this.trans('Delete Committee'),
              icon: 'pi pi-trash',
              command: () => {
                this.deleteCommittee()

              }
            })
          }

        }
      })

    })




  }
  deleteCommittee() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Meeting'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.committeesService.deleteCommittee(this.committeeID).subscribe(() => {
          this.loading = false
          this.onHide('reload')
        }, error => {
          this.loading = false

        })
      }

    });
  }
  checkPrivileges(action){
   return checkPrivileges(this.committeePrivileges,action)
  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {
      if (params['committeeID']) {
        this.committeeID = params['committeeID']
        this.getCommittee()
      }
    });
    sub.unsubscribe()
  }
  getCommittee() {
    this.loading = true
    this.committeesService.getCommittee(this.committeeID).subscribe(committee => {
      this.loading = false
      this.committee = Committees.cloneObject(committee.data)
      this.committee.members = [this.committee.chairman, this.committee.secretary]?.concat(this.committee.members)

      console.log(this.committee.members);

    }, error => {
      this.loading = false
    })
  }


  onHide(view?) {
    this.committeesService.showAddMeetings.next(false)
    this.committeesService.showDetailsMeetings.next(false)

    this.display = false
    this.router.navigate([], {
      queryParams: {
        committeeID: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {

      this.displayChange.emit(false)

    }, 300);
  }
  getRole(role) {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    const committeeMemberType = lookups?.find(item => item?.key == 'Committee_Member_Type').items
    const role_ = committeeMemberType?.find(item => item?.key == role)

    return role_?.name

  }
  newCommitteeMeetEmitter() {
    this.committeesService.newCommitteeMeetEmitter.subscribe(meet => {
      if (isSet(meet)) {

        this.committee.meetings.upcomingMeetings.push(meet)
        this.committeesService.newCommitteeMeet.next(null)
      }


    })
  }
  // Members
  sohwAddNewMember() {
    this.newMemberModal = true
  }
  saveNewMember() {
    this.committeesService.newMember(this.committeeID, this.newMember?.userName).subscribe(member => {
      console.log(member);
      this.committee.members.push({ user: this.newMember, role: member, joinDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') })
      this.newMemberModal = false
      this.newMember = null

    })
  }
  deleteMembers(index) {

    this.committeesService.deleteMember(this.committee?.members[index]?.id,this.committeeID).subscribe(member => {
      this.committee?.members.splice(index, 1);

    })
  }
  //
}
