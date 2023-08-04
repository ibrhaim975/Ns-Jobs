import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { moduleId } from 'src/app/core/base/base.component';
import { Committees } from 'src/app/modals/committees';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class CommitteesService {

  public showAddMeetings: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showAddMeetingsEmitter: Observable<boolean> = this.showAddMeetings.asObservable();

  public showDetailsMeetings: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showDetailsMeetingsEmitter: Observable<boolean> = this.showDetailsMeetings.asObservable();

  public newCommitteeMeet: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public newCommitteeMeetEmitter: Observable<any> = this.newCommitteeMeet.asObservable();

  public deleteCommitteeMeet: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public deleteCommitteeMeetEmitter: Observable<any> = this.deleteCommitteeMeet.asObservable();

  constructor(private api: ApiService, private datePipe: DatePipe) { }
  getCommittees(role?): Observable<ResponseBody<any>> {
    if (role) role = `?role=${role}`
    else role = ''
    return this.api.get<ResponseBody<any>>(`committees${role}`)
  }
  getCommittee(id, mode?): Observable<ResponseBody<Committees>> {
    if (mode == 'edit') mode = '?mode=edit'
    else mode = ''
    return this.api.get<ResponseBody<Committees>>(`committees/${id}${mode}`)
  }
  addCommittee(committee: Committees): Observable<ResponseBody<Committees>> {
    const startDate = this.datePipe.transform(committee?.startDate, 'yyyy-MM-dd')
    const endDate = this.datePipe.transform(committee?.endDate, 'yyyy-MM-dd')
    const body = committee.toDb(startDate, endDate)
    return this.api.post<ResponseBody<Committees>>(`committees`, body)
  }
  deleteCommittee(committeesId): Observable<ResponseBody<Committees>> {

    return this.api.delete<ResponseBody<Committees>>(`committees/${committeesId}`)
  }
  updateCommittee(committee: Committees): Observable<ResponseBody<Committees>> {
    const startDate = this.datePipe.transform(committee?.startDate, 'yyyy-MM-dd HH:mm:ss')
    const endDate = this.datePipe.transform(committee?.endDate, 'yyyy-MM-dd HH:mm:ss')
    const body = committee.toDb(startDate, endDate)
    return this.api.put<ResponseBody<Committees>>(`committees/${committee?.id}`, body)
  }
  addMeetingCommittee(committeId, meetingId): Observable<ResponseBody<Committees>> {
    const body = {
      id: committeId,
      meetingId: meetingId,
      moduleId: moduleId('Committee'),

    }
    return this.api.post<ResponseBody<Committees>>(`committees/meeting`, body)
  }
  showDocuments(folderId): Observable<ResponseBody<any>> {

    return this.api.get<ResponseBody<any>>(`committees/folder-documents?folderId=${folderId}`)
  }
  newFolder(folder): Observable<ResponseBody<any>> {

    return this.api.post<ResponseBody<any>>(`committees/folders`, folder)
  }
  editfolder(folder): Observable<ResponseBody<any>> {

    return this.api.put<ResponseBody<any>>(`committees/folders/${folder?.id}`, folder)
  }
  deleteFolder(folderID,committeeID): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`committees/folders?folderId=${folderID}&&id=${committeeID}&&moduleId=${moduleId('Committee')}`)
  }
  newFile(folder): Observable<ResponseBody<any>> {

    return this.api.post<ResponseBody<any>>(`committees/folder-documents`, folder)
  }
  deleteFile(fileId,committeeID): Observable<ResponseBody<any>> {

    return this.api.delete<ResponseBody<any>>(`committees/documents?guid=${fileId}&&id=${committeeID}&&moduleId=${moduleId('Committee')}`)
  }


  newMember(committeId, username): Observable<ResponseBody<Committees>> {
    const body = {
      id: Number(committeId),
      username: username,
      moduleId: moduleId('Committee'),
    }
    return this.api.post<ResponseBody<Committees>>(`committees/members`, body)
  }

  deleteMember(mebmerId,committeeID): Observable<ResponseBody<Committees>> {
    
    return this.api.delete<ResponseBody<Committees>>(`committees/members?committeeMemberId=${mebmerId}&&id=${committeeID}&&moduleId=${moduleId('Committee')}`)
  }
}
