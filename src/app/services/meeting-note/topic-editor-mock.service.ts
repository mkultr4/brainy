import { Injectable } from '@angular/core';
import { TopicLineItem } from '../../models/meeting-note/topic-line-item';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from '../base.service';


@Injectable()
export class TopicEditorMockService extends BaseService {
  // Description Line
  private _topicLineItems: BehaviorSubject<Array<TopicLineItem>>;
  public topicLineItems: Observable<TopicLineItem[]>;

  private dataStore: {
    topicLineItems: Array<TopicLineItem>,
    topicLineItemsDraft: Array<TopicLineItem>
  };

  constructor() {
    super();
    // Data store
    this.dataStore = { topicLineItems: [], topicLineItemsDraft: [] };
    // Line descripcion
    this._topicLineItems = <BehaviorSubject<TopicLineItem[]>>new BehaviorSubject([]);
    this.topicLineItems = this._topicLineItems.asObservable();


  }
  // Process request
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  // Load All
  loadAll(topicId: any, refernceTopicLine: string, topicLineItems: Array<TopicLineItem>) {
    console.log(topicLineItems, 'of topic');
    const observable = new Observable((observer) => {

      this.dataStore.topicLineItems = [];
      this.dataStore.topicLineItemsDraft = [];
      if (topicLineItems && topicLineItems.length > 0) {
        this.dataStore.topicLineItems = topicLineItems;
      }
      this._topicLineItems.next(Object.assign([], this.dataStore).topicLineItems);
      observer.next(this.dataStore.topicLineItems);
    });
    return observable;
  }
  // Items
  addTopicLineItem(item: TopicLineItem) {

    const observable = new Observable((observer) => {
      this.dataStore.topicLineItems.push(item);
      this._topicLineItems.next(Object.assign([], this.dataStore).topicLineItems);
      observer.next(item);
      observer.complete();
    });
    return observable;
  }
  // Update
  updateTopicLineItem(item: TopicLineItem) {
    const observable = new Observable((observer) => {
      this.dataStore.topicLineItems.forEach((topic, i) => {
        if (topic.id === item.id) { this.dataStore.topicLineItems[i] = item; }
      });
      this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);
      observer.next(this.dataStore.topicLineItems);
    });
    return observable;
  }
  // Remove
  removeTopicLineItem(itemId: any, updateDataStore = true) {
    const observable = new Observable((observer) => {
      console.log('remove', itemId);
      // console.log('update data store', updateDataStore);
      if (updateDataStore) {
        this.dataStore.topicLineItems.forEach((item, i) => {

          if (item.id === itemId) {
            this.dataStore.topicLineItems.splice(i, 1);
          }
        });

        this._topicLineItems.next(Object.assign([], this.dataStore).topicLineItems);
        observer.next(this.dataStore.topicLineItems);
      } else {
        observer.next(itemId);
      }
    });
    return observable;
  }
  // Update all
  updateItems(items: TopicLineItem[]) {
    // console.log('update topic items', items);
    const observable = new Observable((observer) => {
      this.dataStore.topicLineItems = Object.assign([], items);
      this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);
      observer.next(this.dataStore.topicLineItems);
    });
    return observable;
  }
  // Update from description
  updateDescription(description: string) {
    const observable = new Observable((observer) => {
      const descripionHTML = document.createElement('div');
      descripionHTML.innerHTML = description;
      const children = descripionHTML.children;
      
      for (let i = 0; i < children.length; i++) {
        const id = children[i].id;  
        const topicLineItem = this.dataStore.topicLineItems.filter(item => item.id === id)[0];
        if (topicLineItem) {
          if (topicLineItem.type === 'text' || topicLineItem.type === 'sub-topic') {
            const style = children[i].attributes.getNamedItem('style');
            if (style) {
              topicLineItem.content.style = style.textContent.replace('style', '');
            }
             this.unwrapTextEdited(children[i]);
            topicLineItem.content.text = children[i].innerHTML.replace('active', '').replace('active-sidenav','');
          } else if (topicLineItem.type === 'link') {
            // Set link html
            const link = document.createElement('div');
            link.innerHTML = children[i].innerHTML;
            const linkContent = link.getElementsByClassName('link-content');
            this.unwrapTextEdited(linkContent[0]);
            topicLineItem.content.text = linkContent[0].innerHTML.replace('active', '').replace('active-sidenav','');
            console.log(topicLineItem.content.text);
          }
          else if (topicLineItem.type === 'attachment') {
            // Set link html
            const attachment = document.createElement('div');
            attachment.innerHTML = children[i].innerHTML;
            const attachmentContent = attachment.getElementsByClassName('attachment-content');
            this.unwrapTextEdited(attachmentContent[0]);
            topicLineItem.content.text = attachmentContent[0].innerHTML.replace('active', '').replace('active-sidenav','');
            console.log(topicLineItem.content.text);
          }
          else if (topicLineItem.type === 'task') {
            // Set link html
            const task = document.createElement('div');
            task.innerHTML = children[i].innerHTML;
            const taskDescription = task.getElementsByClassName('task-description-content');
            this.unwrapTextEdited(taskDescription[0]);
            const descriptionHTML = taskDescription[0].innerHTML.replace('active', '').replace('active-sidenav','');
            topicLineItem.content.task.description = descriptionHTML;
            // console.log(topicLineItem.content.text);
          }
        }
      }
      // this._topicLineItems.next(Object.assign({}, this.dataStore).topicLineItems);
      observer.next(this.dataStore.topicLineItems);
    });
    return observable;
  }
  unwrapTextEdited(text) {

    const wrapper = text.parentNode.getElementsByClassName('topic-line-edited-wrapper')[0];
    // return if wrapper already been unwrapped
    if (typeof wrapper !== 'undefined') {
      // remmove the wrapper from img
      wrapper.outerHTML = wrapper.innerHTML;
      console.log(text);
    }
    //     return true;
  }
  //#region Draft

  // get draft
  getTopicLineItemDraft(itemId: any) {
    let item = null;
    this.dataStore.topicLineItemsDraft.forEach((i, index) => {
      if (itemId === i.id) {
        item = i;
      }
    });
    return item;
  }
  addTopicLineItemDraf(item: TopicLineItem) {
    this.dataStore.topicLineItemsDraft.push(item);
  }
  // update draft
  updateTopicLineItemDraf(item: TopicLineItem) {
    this.dataStore.topicLineItemsDraft.forEach((i, index) => {
      if (item.id === i.id) {
        this.dataStore.topicLineItemsDraft[index] = item;
      }
    });
  }
  // Remove draft
  removeTopicLineItemDraf(itemId: any) {
    this.dataStore.topicLineItemsDraft.forEach((i, index) => {
      if (itemId === i.id) {
        this.dataStore.topicLineItemsDraft.splice(index, 1);
      }
    });
  }
  //#endregion

}
