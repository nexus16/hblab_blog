import { Component, OnInit ,HostBinding, Input, Output, Provider, forwardRef, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import {TagInputItemComponent} from '../tag-input-item';

import {Tag} from '../../models/tag.model';
import {TagService} from '../../services/tag.service';


@Component({
  moduleId: module.id,
  selector: 'tag-input',
  templateUrl: 'tag-input.component.html',
  styleUrls: ['tag-input.component.css'],
  directives: [TagInputItemComponent],
  providers: [TagService]
})
export class TagInputComponent implements OnInit {

  @Input() placeholder: string = 'Add a tag';
  @Input() ngModel: string[];
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @HostBinding('class.ng2-tag-input-focus') isFocussed;

  public tagsList: string[];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;
  listAllTags: Array<Tag>;
  listSearchTags: Array<Tag>;
  constructor(private _ngControl: NgControl,private _tagService: TagService) {
    this._ngControl.valueAccessor = this;
  }

  ngOnInit() {
    if (this.ngModel) this.tagsList = this.ngModel;
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);

    this.getAllTag();
    
  }


  getAllTag(){
    this._tagService.findAll().then(
      tags=>{this.listAllTags = tags;console.log(tags);}
    )
    .catch(error => console.log(error));
  }

  ngAfterViewInit() {
    // If the user passes an undefined variable to ngModel this will warn
    // and set the value to an empty array
    if (!this.tagsList) {
      console.warn('TagInputComponent was passed an undefined value in ngModel. Please make sure the variable is defined.');
      this.tagsList = [];
      this.onChange(this.tagsList);
    }
  }

  inputChanged(event) {
    let key = event.keyCode;
    switch(key) {
      case 13: //Enter
         console.log(this.inputValue);
         let data = this.inputValue;
         let tag:any={name:data};
         if(this.listAllTags.filter(function(value){return value.name == data}).length == 0 ){
           //console.log("ok");
           this._tagService.insert({tag:tag})
           .then(res=>{this.getAllTag();})
           .catch();
         }
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        
        break;

      

      default:
        this._resetSelected();
        break;
    }
  }


  addSearchTag(data){
    console.log(data);
    this._addTags([data]);
    this.listSearchTags = null;
  }

  inputBlurred(event) {
    this.addOnBlur && this._addTags([this.inputValue]);
    this.isFocussed = false;
  }
  inputFocused(event) {
    this.isFocussed = true;
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
    console.log("flag");
  }



  searchTag(key: string){
    console.log(key);
    if(key.length == 0){
      this.listSearchTags = null;
      return;
    }
    this.listSearchTags = this.listAllTags.filter(function(value){
      return value.name.includes(key);
    });
    console.log(this.listSearchTags);
  }




  private _splitString(tagString: string) {
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
  }

 
  private _resetSelected() {
    this.selectedTag = null;
  }

  private _resetInput() {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => { };

  onTouched: () => any = () => { };

  writeValue(value: any) { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
