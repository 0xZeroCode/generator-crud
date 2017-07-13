import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '<%= listItemComponentTagName %>',
    templateUrl: '<%= listItemComponentFileName %>.component.html',
})
export class <%= listItemComponentName %> implements OnInit {
    @Input() <%= model %>: any;
    @Output() modalToggle = new EventEmitter();
    @Output() remove = new EventEmitter();

    <%= model %>ToUpdate: any = {};

    constructor() { }

    ngOnInit() {
        Object.assign(this.<%= model %>ToUpdate, this.<%= model %>);
    }

    onUpdate(result) {
        Object.assign(this.<%= model %>, this.<%= model %>ToUpdate);
    }

    cancel() {
        Object.assign(this.<%= model %>ToUpdate, this.<%= model %>);
    }

    toggleModal() {
        const info = {
            <%= model %>: this.<%= model %>ToUpdate,
            onUpdate: this.onUpdate.bind(this),
            cancel: this.cancel.bind(this)
        };

        this.modalToggle.emit(info);
    }

    onRemove() {
      this.remove.emit(this.<%= model %>);
    }
}
