import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  breadcrumb = [
    {
      label: 'Teams',
      url: `teames`,
    },
  ]
  teams = []
  loading=false
  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.getTeams()
  }
  getTeams() {
    this.loading=true
    this.teamsService.getUsersStatistics().subscribe(teams => {
      this.teams = teams?.data
      this.loading=false

    },error=>{
      this.loading=false

    })

  }
}
