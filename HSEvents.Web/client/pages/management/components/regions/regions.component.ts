import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RegionService } from './regions.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Region } from '../../../../models/address.models';
import { RegionModalComponent } from './region-modal/region-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'regions.component.html',
    styleUrls: ['regions.component.css'],
    providers: [RegionService]
})
export class RegionsComponent extends SearchComponent implements OnInit {

    regions: Region[];

    constructor(private regionService: RegionService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    @ViewChild('modal')
    private modal: RegionModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.regionService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Region[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.regions = data;
            }, error => {

            });

    }

    onAddClick() {
        this.modal.open(new Region());
    }

    onEditClick(region: Region) {
        this.modal.open(region);
    }

    onDeleteClick(region: Region) {
        this.loading = true;
        this.regionService.delete(region.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(region: Region) {
        if (region.id)
            this.update(region);
        else
            this.add(region);
    }

    private add(region: Region) {
        this.regionService.add(region)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(region: Region) {
        this.regionService.update(region)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }
}