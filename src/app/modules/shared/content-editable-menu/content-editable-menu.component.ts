import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-content-editable-menu,[app-content-editable-menu]',
    templateUrl: './content-editable-menu.component.html',
    styleUrls: ['./content-editable-menu.component.scss']
})
export class ContentEditableMenuComponent implements OnInit {
    @Input() show = true;
    @Input() unorderedList = true;
    @Input() align = false;
    constructor() { }

    ngOnInit() {
    }
    execute($event, command: string, commandValue?: string) {
        $event.preventDefault();
        $event.stopPropagation();

        if (command === 'h1' || command === 'h2' || command === 'p') {
            document.execCommand('formatBlock', false, command);
        } else if (command === 'forecolor' || command === 'backcolor') {
            document.execCommand(command, false, commandValue);
        } else if (command === 'createlink' || command === 'insertimage') {
            const urlImage = prompt('Enter the link here: ', 'http:\/\/');
            if (urlImage) {
                document.execCommand(command, false, urlImage);
            }
        } else if (command === 'removeFormat') {
            document.execCommand(command, false, commandValue);

        } else {
            document.execCommand(command, false, null);
        }
    }
}
