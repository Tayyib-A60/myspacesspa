import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../models/photo.model';
import { FileUploader } from 'ng2-file-upload';
import { UUID } from 'angular2-uuid';
import { environment } from '../../../environments/environment';
import * as spaceReducer from '../state/space.reducers';
import * as spaceActions from '../state/space.actions';
import * as spaceSelectors from '../state/space.selector';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Space } from '../models/space.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SetMainPhoto } from '../state/space.actions';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {
  
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentMain: Photo;
  uniqueString = UUID.UUID();
  url = environment.url;
  id: number;
  space: Space;
  componentActive = true;

    constructor(private route: ActivatedRoute,
                private store: Store<spaceReducer.SpaceState>,
                private carouselConfig: NgbCarouselConfig) {
    carouselConfig.showNavigationArrows = true;
    carouselConfig.interval = 0;
    carouselConfig.showNavigationIndicators = false;
              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.initializeUploader(Number(this.id));
          this.store.dispatch(new spaceActions.GetSingleSpace(Number(this.id)));
          this.store.pipe(select(spaceSelectors.getSingleSpace),
          takeWhile(() => this.componentActive))
          .subscribe(space => {
            this.space = space;
            //console.log(space);
          });
        });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(id: number) {
    this.uploader = new FileUploader({
      url: this.url + `/photos/${id}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = file => file.withCredentials = false; 
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.store.pipe(select(spaceSelectors.getSingleSpace),
          takeWhile(() => this.componentActive))
          .subscribe(space => {
            this.space = space;
          });
        // const res: Photo = JSON.parse(response);
        // const photo: Photo = {
        //   id: res.id,
        //   fileName: res.fileName,
        //   dateCreated: res.dateCreated,
        //   isMain: res.isMain,
        //   userId: res.userId,
        //   spaceId: res.spaceId,
        //   publicId: res.publicId
        // };
        // this.photos.push(photo);
        // if (photo.isMain) {
        //   this.authService.changeMemberPhoto(photo.url);
        //   this.authService.currentUser.photoUrl = photo.url;
        // }
      }
    };
  }

  setMainPhoto(id: number) {
    const currentMain = this.space.photos.find(p => p.isMain === true);
    //console.log(currentMain);
    
    const currentMainId = currentMain !== undefined ? currentMain['id'] : 0;
    //console.log({ newMainId: Number(id), currentMainId });
    
    this.store.dispatch(new spaceActions.SetMainPhoto({ newMainId: Number(id), currentMainId }));
    this.store.pipe(select(spaceSelectors.getSingleSpace),
          takeWhile(() => this.componentActive))
          .subscribe(space => {
            this.space = space;
          });
  }

  deletePhoto(id: number) {
    this.store.dispatch(new spaceActions.DeleteSpacePhoto(Number(id)));
    this.store.pipe(select(spaceSelectors.getSingleSpace),
          takeWhile(() => this.componentActive))
          .subscribe(space => {
            this.space = space;
          });
  }
}
