import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Region } from '../../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'region-modal',
    templateUrl: 'region-modal.component.html',
    styleUrls: ['region-modal.css']
})
export class RegionModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Region> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование региона';

        return 'Добавление региона';
    }
    
    open(subject: Region) {
        this.modal.open();
        this.name = subject.name;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<Region>{
            name: this.name,
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.name = null;
        this.id = null;
    }
}