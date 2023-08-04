import { Component, Input, OnInit } from '@angular/core';
import { Committees } from 'src/app/modals/committees';

@Component({
  selector: 'app-committee-card',
  templateUrl: './committees-card.component.html',
  styleUrls: ['./committees-card.component.scss']
})
export class CommitteesCardComponent implements OnInit {

  constructor() { }
  @Input() committee=new Committees()
  ngOnInit(): void {

  }

}
