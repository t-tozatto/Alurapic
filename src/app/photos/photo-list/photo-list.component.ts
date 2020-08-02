import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from './../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  hasMore = true;
  currentPage = 1;
  userName = '';
  filter = '';

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos;
    });
  }

  load(): void {
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage).subscribe((photos: any) => {
      this.filter = '';
      this.photos = this.photos.concat(photos);
      console.log(this.photos.length);
      if (!photos.length){
        this.hasMore = false;
      }
    });
  }
}
