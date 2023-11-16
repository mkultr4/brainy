import { Content } from '../../interface/topic/Content';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { TopicLineItemReference } from './topic-line-item-reference';

export class TopicLineItem {
  // Id
  id: any;
  // Parent id
  idParent: any = undefined;
  // Refence
  reference = TopicLineItemReference.DESCRIPTION;
  // topic
  idTopic: any;
  // Reference
  content: Content;
  // Native Element
  nativeElement: any;
  // for the view only
  componentReference: ComponentRef<any>;
  // Type
  type: string;
  // Order
  order: number;
  // Constructor
  constructor();
  constructor(
    id: string,
    //  item: ComponentRef<any>,
  );
  constructor(
    id?: string
  ) {
    this.id = id;
  }
}
