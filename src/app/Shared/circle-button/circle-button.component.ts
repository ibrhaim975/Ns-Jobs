import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule],
    selector: 'app-circle-button',
    templateUrl: './circle-button.component.html',
    styleUrls: ['./circle-button.component.scss'],
})
export class circleButtonComponent implements OnInit {
    @Output() action = new EventEmitter();
    @Input() icon: string = '';
    @Input() disabled: boolean = false;
    @Input() pTooltipCustom: any = '';
    @Input() color: any = '';
    @Input() width: any = '';
    @Input() height: any = '';
    @Input() extraClass: any = '';
    constructor() {}

    ngOnInit() {}
}
