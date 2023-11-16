import { NgModule } from '@angular/core';
import { TopicLineTextComponent } from './topic-line-text/topic-line-text.component';
import { TopicLineImageGalleryComponent } from './topic-line-image-gallery/topic-line-image-gallery.component';
import { TopicLineTaskComponent } from './topic-line-task/topic-line-task.component';
import { SharedModule } from '../shared/shared.module';
import { TopicLineSubTopicComponent } from './topic-line-sub-topic/topic-line-sub-topic.component';
import { TopicLineImageComponent } from './topic-line-image/topic-line-image.component';
import { TopicLineVideoComponent } from './topic-line-video/topic-line-video.component';
import { TopicLineLinkComponent } from './topic-line-link/topic-line-link.component';
import { TopicLineAttachmentComponent } from './topic-line-attachment/topic-line-attachment.component';
import { TaskBlockComponent } from './task-block/task-block.component';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';

@NgModule({
  imports: [
    SharedModule,
    CommentThreadModule
  ],
  declarations: [
    // Editor lines
    TopicLineTextComponent,
    TopicLineSubTopicComponent,
    TopicLineImageComponent,
    TopicLineImageGalleryComponent,
    TopicLineVideoComponent,
    TopicLineLinkComponent,
    TopicLineAttachmentComponent,
    TopicLineTaskComponent,
    // Task
    TaskBlockComponent,
    
  ],
  exports: [
    TopicLineTextComponent,
    TopicLineSubTopicComponent,
    TopicLineImageComponent,
    TopicLineImageGalleryComponent,
    TopicLineVideoComponent,
    TopicLineLinkComponent,
    TopicLineAttachmentComponent,
    TopicLineTaskComponent,
    // Task
    TaskBlockComponent
  ],
  entryComponents: [
    TopicLineTextComponent,
    TopicLineSubTopicComponent,
    TopicLineImageComponent,
    TopicLineImageGalleryComponent,
    TopicLineVideoComponent,
    TopicLineLinkComponent,
    TopicLineAttachmentComponent,
    TopicLineTaskComponent,
    
  ]
})
export class ShareMeetingNoteModule { }
