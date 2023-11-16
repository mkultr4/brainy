import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Table } from 'src/app/models/brief/table';

@Injectable()
export class BriefWorkflowService {
    // Update
    private _updateTitleBriefCategory = new Subject<string>();
    public updateTitleBriefCategory = new Observable<string>();
    // Show briefCategoryItem
    private _showBriefCategoryItemId = new Subject<any>();
    public showBriefCategoryItemId = new Observable<any>();
    constructor() {
        this.updateTitleBriefCategory = this._updateTitleBriefCategory.asObservable();
        // Show brief category item id observable
        this.showBriefCategoryItemId = this._showBriefCategoryItemId.asObservable();
    }
    // Update the title since left sidenav
    fnUpdateTitleBriefCategory(title) {
        this._updateTitleBriefCategory.next(title);
    }
    /**
     * Check if the response if filled, type of brief item must be question
     * @param briefCategoryItem
     */
    public checkIfResponseIsFilled(briefCategoryItem: BriefCategoryItem) {

        let isFilled = false;
        // Text
        if (briefCategoryItem.responseType) {
            if (briefCategoryItem.responseType.key === 'text' ||
                briefCategoryItem.responseType.key === 'text-large'
            ) {
                if (briefCategoryItem.responseContent.text && briefCategoryItem.responseContent.text.length > 0) {
                    isFilled = true;
                }
            }// List, Ascendent
            else if (
                briefCategoryItem.responseType.key === 'list' ||
                briefCategoryItem.responseType.key === 'ascendent'
            ) {
                briefCategoryItem.responseSettings.options.some((option) => {
                    if (option.value && option.value.length > 0) {
                        isFilled = true;
                        return true;
                    }
                });
            }// Checkbox, Yes-No, Radio, Assessment
            else if (
                briefCategoryItem.responseType.key === 'checkbox' ||
                briefCategoryItem.responseType.key === 'yes-no' ||
                briefCategoryItem.responseType.key === 'radio' ||
                briefCategoryItem.responseType.key === 'assessment'
            ) {
                briefCategoryItem.responseContent.options.some((option) => {
                    isFilled = true;
                    return true;
                });
            } // Date
            else if (
                briefCategoryItem.responseType.key === 'date'
            ) {
                let isDateFilled = true;
                briefCategoryItem.responseSettings.options.forEach((option) => {
                    if (option.value && option.value.length > 0 && isDateFilled) {
                        isDateFilled = true;
                    } else {
                        isDateFilled = false;
                    }
                });
                isFilled = isDateFilled;
            }// Date
            else if (
                briefCategoryItem.responseType.key === 'quantity'
            ) {
                if (briefCategoryItem.responseContent.quantity) {
                    isFilled = true;
                }
            }// Select
            else if (
                briefCategoryItem.responseType.key === 'select'
            ) {
                if (briefCategoryItem.responseContent.options.length > 0) {
                    isFilled = true;
                }
            }// Table
            else if (
                briefCategoryItem.responseType.key === 'table'
            ) {
                isFilled = this.checkIsFilledTable(briefCategoryItem.responseSettings.table);
            }
        }

        return isFilled;
    }

    private checkIsFilledTable(table: Table) {
        let isFilledTable = false;
        table.rows.some(row => {
            row.cells.some(cell => {
                if (cell.value) {
                    isFilledTable = true;
                    return false;
                } else {
                    isFilledTable = false;
                    return true;
                }
            })
            if (!isFilledTable) {
                return true
            } else {
                return false;
            }
        });
        return isFilledTable;
    }
    /**
     * Show brief category item id
     * @param categoryId 
     * @param categoryItemId 
     */
    onShowBriefCategoryItemId(categoryId, categoryItemId) {
        this._showBriefCategoryItemId.next({ categoryId: categoryId, categoryItemId:categoryItemId });
    }

}
