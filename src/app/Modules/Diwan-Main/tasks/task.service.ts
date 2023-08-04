import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { BaseComponent, isSet, moduleId } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { ResponseBody } from 'src/app/modals/response';
import { Task } from 'src/app/modals/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private api: ApiService, private datePipe: DatePipe, private coreService: CoreService) {
  }
  getTasks(statues?): Observable<ResponseBody<Task>> {
    if (isSet(statues)) statues = `?statues=${statues}`
    else statues = ''
    return this.api.get<ResponseBody<Task>>(`tasks${statues}`)
  }
  getTask(id, mode?): Observable<ResponseBody<Task>> {
    if (mode == 'edit') mode = '?mode=edit'
    else mode = ''

    return this.api.get<ResponseBody<Task>>(`tasks/${id}${mode}`)
  }
  getTaskStatistics(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`tasks/statistics`)
  }
  addTask(task: Task): Observable<ResponseBody<Task>> {
    const dueDate = this.datePipe.transform(task?.dueDate, 'yyyy-MM-dd')
    const body = task.toDb(dueDate)
    delete body.updatedReason
    return this.api.post<ResponseBody<Task>>(`tasks`, body)
  }
  deleteTask(id): Observable<ResponseBody<Task>> {
    return this.api.delete<ResponseBody<Task>>(`tasks/${id}`)
  }
  updateTask(task: Task): Observable<ResponseBody<Task>> {
    const dueDate = this.datePipe.transform(task?.dueDate, 'yyyy-MM-dd')

    return this.api.put<ResponseBody<Task>>(`tasks/${task.id}`, task?.toDb(dueDate))
  }

  updateProgress(taskId, progress): Observable<ResponseBody<Task>> {
    return this.api.put<ResponseBody<Task>>(`tasks/progress/${taskId}`, { moduleId:moduleId('Task'),progress: progress })
  }
  markAsCompleted(taskId): Observable<ResponseBody<Task>> {
    return this.api.put<ResponseBody<Task>>(`tasks/mark-as-completed/${taskId}`, { moduleId:moduleId('Task')})
  }


}
