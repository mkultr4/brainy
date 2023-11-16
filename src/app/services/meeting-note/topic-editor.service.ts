import { Injectable } from '@angular/core';
import { TopicLineItem } from '../../models/meeting-note/topic-line-item';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable()
export class TopicEditorService extends BaseService {
  // Public 
  public topicLineItems: Observable<TopicLineItem[]>;
  public topicLineItemsDraft: Observable<TopicLineItem[]>;
  public isEditable: Observable<boolean>;
  // Private
  private _topicLineItems: BehaviorSubject<Array<TopicLineItem>>;
  private _topicLineItemsDraft: BehaviorSubject<Array<TopicLineItem>>;
  private _isEditable: BehaviorSubject<boolean>;
  private dataStore: {
    topicLineItems: Array<TopicLineItem>,
    topicLineItemsDraft: Array<TopicLineItem>
  };

  constructor() {
    super();
    // Data store
    this.dataStore = { topicLineItems: [], topicLineItemsDraft: [] };
    // Behavior
    this._topicLineItems = <BehaviorSubject<TopicLineItem[]>>new BehaviorSubject([]);
    this._topicLineItemsDraft = <BehaviorSubject<TopicLineItem[]>>new BehaviorSubject([]);
    // Is editable
    this._isEditable = <BehaviorSubject<boolean>>new BehaviorSubject(false);
    this.isEditable = this._isEditable.asObservable();
    // Observables
    this.topicLineItems = this._topicLineItems.asObservable();
    this.topicLineItemsDraft = this._topicLineItemsDraft.asObservable();

  }
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  // Load All
  loadAll(topicLineItems: Array<TopicLineItem>, topicLineItemsDraft: Array<TopicLineItem>, ) {
    if (topicLineItems && topicLineItems.length > 0) {
      this.dataStore.topicLineItems = topicLineItems;
      this._topicLineItems.next(this.dataStore.topicLineItems);
    }
    if (topicLineItemsDraft && topicLineItemsDraft.length > 0) {
      this.dataStore.topicLineItemsDraft = topicLineItemsDraft;
      this._topicLineItems.next(this.dataStore.topicLineItemsDraft);
    }
  }
  // Items
  addTopicLineItem(item: TopicLineItem) {
    console.log('addTopicLineItem', item);
    this.dataStore.topicLineItems.push(item);
    this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);
  }

  updateTopicLineItem(item: TopicLineItem) {
    this.dataStore.topicLineItems.forEach((topic, i) => {
      if (topic.id === item.id) { this.dataStore.topicLineItems[i] = item; }
    });
    this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);
  }
  removeTopicLineItem(itemId: string) {
    this.dataStore.topicLineItems.forEach((topic, i) => {

      if (topic.id === itemId) { this.dataStore.topicLineItems.splice(i, 1); }
    });

    this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);

  }

  getTopicLineItem(itemId: string) {
    let itemRet = null;

    this.dataStore.topicLineItems.forEach((topic, i) => {
      if (topic.id === itemId) { itemRet = this.dataStore.topicLineItems[i]; }
    });
    return itemRet;
  }
  // Items Draft
  addTopicLineItemDraft(item: TopicLineItem) {
    this.dataStore.topicLineItemsDraft.push(item);
    this._topicLineItemsDraft.next(Object.assign({}, this.dataStore).topicLineItemsDraft);
  }
  updateTopicLineItemDraft(item: TopicLineItem) {
    this.dataStore.topicLineItemsDraft.forEach((topic, i) => {
      if (topic.id === item.id) { this.dataStore.topicLineItemsDraft[i] = item; }
    });
    this._topicLineItemsDraft.next(Object.assign({}, this.dataStore).topicLineItemsDraft);
  }
  removeTopicLineItemDraft(itemId: string) {
    this.dataStore.topicLineItemsDraft.forEach((topic, i) => {

      if (topic.id === itemId) { this.dataStore.topicLineItemsDraft.splice(i, 1); }
    });
    this._topicLineItemsDraft.next(Object.assign({}, this.dataStore).topicLineItemsDraft);

  }
  getTopicLineItemDraft(itemId: string) {
    let itemRet = null;
    this.dataStore.topicLineItemsDraft.forEach((topic, i) => {
      if (topic.id === itemId) { itemRet = this.dataStore.topicLineItemsDraft[i]; }
    });
    return itemRet;
  }

  setDescriptionEditable(editable: boolean) {
    this._isEditable.next(editable);
  }

}
