import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { RangyService } from 'src/app/services/utils/rangy.service';

@Component({
  selector: 'app-topic-dropdown-colors',
  templateUrl: './topic-dropdown-colors.component.html',
  styleUrls: ['./topic-dropdown-colors.component.scss']
})
export class TopicDropdownColorsComponent implements OnInit, AfterContentInit {
  public colors: Array<string>;
  public cmd = 'forecolor';
  @Input() id;
  constructor(
    private _generalService: GeneralService,
    private _rangy: RangyService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.colors = this._generalService.getColors();
  }
  changeCmd($event, cmd) {
    $event.preventDefault();
    $event.stopPropagation();
    this.cmd = cmd;
  }
  execute($event, cmd: string, arg: string) {
    $event.preventDefault();
    $event.stopPropagation();
    if (cmd === 'forecolor') {
      this.setForeColorStyle(arg);
    } else if (cmd === 'backcolor') {
      this.setBackgroundStyle(arg);
    } else if (cmd === 'removeFormat') {
      this.removeFormat(arg);
    }

    const selection = this._rangy.self.getSelection();
    const contentEditable = $(selection.focusNode).closest('[contenteditable]');
    contentEditable.trigger('content-change');

  }
  setForeColorStyle(arg) {
    const forecolor = this._rangy.self.
      createClassApplier('forecolor', {
        tagNames: ['*'],
        normalize: true,
        elementProperties: {
          style: {
            color: arg
          }
        }
      });
    forecolor.toggleSelection();
  }
  setBackgroundStyle(arg) {
    const backcolor = this._rangy.self.
      createClassApplier('backcolor', {
        tagNames: ['*'],
        normalize: true,
        elementProperties: {
          style: {
            background: arg
          }
        }
      });

    backcolor.toggleSelection();
  }
  removeFormat(arg) {
    if (arg === 'forecolor') {


      const forecolor = this._rangy.self.
        createClassApplier('forecolor', {
          tagNames: ['*'],
          normalize: true,
          elementProperties: {
            style: {

            }
          }

        });
      forecolor.undoToSelection();
    } else if (arg === 'backcolor') {
      const backcolor = this._rangy.self.
        createClassApplier('backcolor', {
          tagNames: ['*'],
          normalize: true,
          elementProperties: {
            style: {

            }
          }
        });
      backcolor.undoToSelection();
    }



  }
}
