import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer,forwardRef,AfterContentInit,OnChanges,SimpleChange} from '@angular/core';
import {Ng2Uploader} from 'ng2-uploader/ng2-uploader';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  DefaultValueAccessor,
  NgModel,
} from '@angular/common';
const noop = () => {};

//Quan trong
export const MD_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PictureUploaderComponent),
  multi: true
};

@Component({
  moduleId : module.id,
  selector: 'picture-uploader',
  styleUrls: ['picture-uploader.css'],
  templateUrl: 'picture-uploader.html',
  providers: [Ng2Uploader,MD_UPLOAD_CONTROL_VALUE_ACCESSOR]
})
export class PictureUploaderComponent implements ControlValueAccessor /* AfterContentInit, OnChanges*/{
  @Input() picture:string = '';
  @Input() uploaderOptions:any = {"url":"http://localhost/"};
  @Input() canDelete:boolean = true;
  @Output() onUploadCompleted : EventEmitter<any> = new EventEmitter();
  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  
  onUpload:EventEmitter<any> = new EventEmitter();
  
  private _value: any = '';

  get value(): any { return this._value }
  
  @Input() set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }
  public uploadInProgress:boolean = false;
  
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;
  //  _handleFocus(event: FocusEvent) {
    
  // }

  _handleBlur(event: FocusEvent) {
   
  }

  _handleChange(event: Event) {
    this._onTouchedCallback();
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
   this._value = value;
  }

  // /**
  //  * Implemented as part of ControlValueAccessor.
  //  * TODO: internal
  //  */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  /** TODO: internal */
  // ngAfterContentInit() {
   
  // }
  // ngOnChanges(changes: {[key: string]: SimpleChange}) {

  // }
  constructor(private renderer:Renderer, protected _uploader:Ng2Uploader) {
  }

  public ngOnInit():void {
    if (this._canUploadOnServer()) {
      setTimeout(() => {
        this._uploader.setOptions(this.uploaderOptions);
      });

      this._uploader._emitter.subscribe((data) => {
        this._onUpload(data);
      });
    } else {
      console.warn('Please specify url parameter to be able to upload the file on the back-end');
    }
  }

  public onFiles():void {
    let files = this._fileUpload.nativeElement.files;
    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      if (this._canUploadOnServer()) {
        this.uploadInProgress = true;
        this._uploader.addFilesToQueue(files);
      }
    }
  }

  public bringFileSelector():boolean {
    //this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement,"click",null);
    return false;
  }

  public removePicture():boolean {
    this.value = '';
    return false;
  }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  protected _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    let url = JSON.parse(data.response);
    this.value = url.src;
    //this.onUploadCompleted.emit(JSON.parse(data.response));
  }

  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }
}
