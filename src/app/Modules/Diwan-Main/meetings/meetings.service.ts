import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Meeting } from 'src/app/modals/Meeting';
import { ResponseBody } from 'src/app/modals/response';
import * as _ from 'lodash';
import { isSet, moduleId } from 'src/app/core/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private api: ApiService, private datePipe: DatePipe) { }
  getMeetings(target?): Observable<ResponseBody<Meeting[]>> {
    if (isSet(target)) target=`?target=${target}`
    else target = ''
    return this.api.get<ResponseBody<Meeting[]>>(`meetings${target}`)
  }
  getMeeting(id): Observable<ResponseBody<Meeting>> {
    return this.api.get<ResponseBody<Meeting>>(`meetings/${id}`)
  }
  addMeeting(meeting: Meeting): Observable<ResponseBody<Meeting>> {
    const startDate = this.datePipe.transform(meeting?.startDateTime, 'yyyy-MM-dd hh:mm a')
    const finishDate = this.datePipe.transform(meeting?.finishDateTime, 'yyyy-MM-dd hh:mm a')

    return this.api.post<ResponseBody<Meeting>>(`meetings`, meeting.toDb(startDate, finishDate))
  }
  updateMeeting(meeting: Meeting): Observable<ResponseBody<Meeting>> {
    const startDate = this.datePipe.transform(meeting?.startDateTime, 'yyyy-MM-dd hh:mm a')
    const finishDate = this.datePipe.transform(meeting?.finishDateTime, 'yyyy-MM-dd hh:mm a')

    return this.api.put<ResponseBody<Meeting>>(`meetings/${meeting?.id}`, meeting.toDb(startDate, finishDate))
  }

  deleteMeeting(id): Observable<ResponseBody<Meeting>> {
    return this.api.delete<ResponseBody<Meeting>>(`meetings/${id}`)
  }
  getPrivileges(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`meetings/privileges`)
  }
  addMinutesOfMeeting(meetingId,data: any): Observable<ResponseBody<Meeting>> {
    const body = {
      moduleId:moduleId('Meeting'),
      id:meetingId,
      discussions: data.discussions,
      decisions: data.decisions,
      actionItems: _.map(data?.actionItems, item => {
        return {
          assignedTo: item.assignedTo.userName,
          dueDate: this.datePipe.transform(item?.dueDate, 'yyyy-MM-dd'),
          details: item.details,
        }
      }),
      attachments: _.map(data?.attachments, item => { return item?.fileName })

    }
    return this.api.post<ResponseBody<Meeting>>(`meetings/mom`, body)
  }
  getMinutesOfMeeting(meetingId): Observable<ResponseBody<Meeting>> {

    return this.api.get<ResponseBody<Meeting>>(`meetings/mom?meetingId=${meetingId}`)
  }
  acceptMeeting(requestId): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`meetings/accept/${requestId}`, {})
  }
  rejectMeeting(requestId): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`meetings/reject/${requestId}`, {})
  }
  suggestAnotherDate(requestId, data): Observable<ResponseBody<any>> {
    const startDate = this.datePipe.transform(data?.startDateTime, 'yyyy-MM-dd hh:mm a')
    const finishDate = this.datePipe.transform(data?.finishDateTime, 'yyyy-MM-dd hh:mm a')
    return this.api.put<ResponseBody<any>>(`meetings/suggest-another-date/${requestId}`, { startDateTime: startDate, finishDateTime: finishDate })
  }
}
