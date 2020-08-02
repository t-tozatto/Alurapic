import { NgModule } from '@angular/core';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoDetailsModule } from './photo-detail/photo-details.module';

@NgModule({
    imports: [
      PhotoModule,
      PhotoFormModule,
      PhotoListModule,
      PhotoDetailsModule
    ]
})

export class PhotosModule {}
