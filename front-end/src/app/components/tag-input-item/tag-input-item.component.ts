import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tag-input-item',
  templateUrl: 'tag-input-item.component.html',
  styleUrls: ['tag-input-item.component.css'],
  host: {
    '[class.ng2-tag-input-item-selected]': 'selected'
  }
})
export class TagInputItemComponent  {

  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<any> = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }
}
