import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from 'src/app/models/Profile';
import { takeUntil, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/shared/services/app.service';
import { Router } from '@angular/router';

interface IPaginationInfo {
    nextPage: any;
    page: any;
    perPage: any;
    previousPage: any;
    total: any;
    totalPages: any;
}

@Component({
    selector: 'app-profile-list-page',
    templateUrl: './profile-list-page.component.html',
    styleUrls: ['./profile-list-page.component.scss'],
})
export class ProfileListPageComponent implements OnInit, AfterViewInit, OnDestroy {
    profileList: Profile[] = [];
    destroy$ = new Subject();
    displayedColumns: string[] = ['select', 'id', 'email', 'name', 'role', 'actions'];
    dataSource = new MatTableDataSource<Profile>();
    isError: boolean = false;
    searchByQuery: string = '';
    isAllSelected: boolean = false;
    paginationInfo: IPaginationInfo = {
        nextPage: null,
        page: 1,
        perPage: 10,
        previousPage: null,
        total: 50,
        totalPages: 1,
    };

    constructor(private _profielService: ProfileService, private _appService: AppService, private router: Router) {}

    ngOnInit(): void {
        this.loadProfileList();
    }

    ngAfterViewInit() {}

    loadProfileList() {
        this._profielService
            .getProfilesList()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (response: any) => {
                    this.profileList = response?.map((item: any) => {
                        item.isEdit = false;
                        item.isSelect = false;
                        return item;
                    }); //--> this loop is not required if we get this 2 flags [isEdit,isSelect] from API
                    this.dataSource = this.paginator(this.profileList, 1, this.paginationInfo.perPage)['data'];
                    this.paginationInfo = this.paginator(this.profileList, 1, this.paginationInfo.perPage);
                },
                (error) => {
                    this.isError = true;
                    this._appService.showMessage(error.message, true); // error message from api
                    this.router.navigateByUrl('/dashboard/dashboard');
                }
            );
    }

    pageChanged(e: any) {
        this.paginationInfo.page = e.pageIndex + 1;
        this.paginationInfo.perPage = e.pageSize;
        this.dataSource = new MatTableDataSource<Profile>(
            this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data']
        );

        if (this.isAllSelected) {
            this.isAllSelected = false;
            this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data'].forEach(
                (profile: any) => {
                    profile.isSelect = false;
                }
            );
        }
    }

    onEditRow(i: number) {
        this.profileList[i].isEdit = true;
    }

    onUpdate(i: number) {
        this.profileList[i].isEdit = false;
    }

    onDeleteRow(element: any) {
        this.profileList.splice(this.profileList.indexOf(element), 1);
        this.updatePagination();
    }

    onSelectAll(e: boolean) {
        console.log(e);
        if (e == true) {
            this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data'].forEach(
                (profile: Profile) => {
                    profile.isSelect = true;
                }
            );
        } else {
            this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data'].forEach(
                (profile: Profile) => {
                    profile.isSelect = false;
                }
            );
        }
    }

    deleteOnSelect() {
        this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data'].forEach(
            (profile: Profile) =>
                profile.isSelect == true ? this.profileList.splice(this.profileList.indexOf(profile), 1) : profile
        );
        this.isAllSelected = false;
        this.updatePagination();
    }

    updatePagination() {
        this.dataSource = new MatTableDataSource<Profile>(
            this.paginator(this.profileList, this.paginationInfo.page, this.paginationInfo.perPage)['data']
        );
    }

    paginator(items: any, page: number, per_page: number) {
        var page = page || 1,
            per_page = per_page || 10,
            offset = (page - 1) * per_page,
            paginatedItems = items.slice(offset).slice(0, per_page),
            totalPages = Math.ceil(items.length / per_page);
        return {
            page: page,
            perPage: per_page,
            previousPage: page - 1 ? page - 1 : null,
            nextPage: totalPages > page ? page + 1 : null,
            total: items.length,
            totalPages: totalPages,
            data: paginatedItems,
        };
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
