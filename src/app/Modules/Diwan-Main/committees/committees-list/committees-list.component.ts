import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Committees } from 'src/app/modals/committees';
import { CommitteesService } from '../committees.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-committees-list',
  templateUrl: './committees-list.component.html',
  styleUrls: ['./committees-list.component.scss']
})
export class CommitteesListComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, private activateRoute: ActivatedRoute,
    private router: Router, @Inject(DOCUMENT) private document: Document,
    private coreService : CoreService,
    private committeesService: CommitteesService,
    public messageService: MessageService) {
    super(messageService, translates)
  }
  breadcrumb = [{ label: 'Committees', url: `committees`, }]
  displayaddEdit = false
  displayCommitteesDetails = false
  activities: any
  committees: any
  loadingCommittees = false
  displayAddEditMeetings = false
  displayDetailsMeetings = false
  SelectedCommitteeID: any
  selectedRole = 'all'
  accessibility:any
  ngOnInit(): void {
    this.getCommittees()
    this.getFromUrl()
    this.showAddMeeting()
    this.showDetailsMeetings()
    this.getAccessibilities()
  }
  getAccessibilities(){
    const sub = this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
         this.accessibility= accessibilities?.find(item => item?.key == "Committee")
       })
       this.subscriptions.push(sub)
   
     }
  getCommittees(role?) {
    this.loadingCommittees = true
    this.committeesService.getCommittees(role).subscribe((committees) => {
      if (this.selectedRole == 'all') {
        this.committees = committees.data
      } else {
        this.committees.items = committees?.data?.items
      }
      this.loadingCommittees = false
    }, error => {
      this.loadingCommittees = false

    })
  }

  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['view'] == 'details' && params['committeeID']) {
        this.showCommitteesDetails(params['committeeID'])

      }
      
      if (params['view'] == 'edit' && params['committeeID']) {
        this.showAddEditCommittees(params['committeeID'], params['view'])

      }
    
      
      if (params['view'] == 'reload') {
        this.getCommittees()
        this.router.navigate([], {
          queryParams: {
            view: null
          },
          queryParamsHandling: 'merge',
        })

      }
      if (!isSet(params['view'])) {
        if (this.displayAddEditMeetings == false) {
          this.overflow('auto')

        }
      }
    });
  }
  showCommitteesDetails(committeeID) {
    this.SelectedCommitteeID = committeeID
    this.displayCommitteesDetails = true
    this.router.navigate([], {
      queryParams: {
        committeeID: committeeID,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })

  }
  showAddEditCommittees(committeeID?, view?) {
    this.displayaddEdit = true
    this.router.navigate([], {
      queryParams: {
        committeeID: committeeID,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  overflow(value) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement
    htmlTag.style.overflow = value
  }
  showAddMeeting() {
    this.committeesService.showAddMeetingsEmitter.subscribe(satus => {
      this.displayAddEditMeetings = satus

    })
  }
  showDetailsMeetings() {
    this.committeesService.showDetailsMeetingsEmitter.subscribe(satus => {
      this.displayDetailsMeetings = satus
    })
  }
}
