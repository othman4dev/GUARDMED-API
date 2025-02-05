import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { PharmacyModule } from '../pharmacies/pharmacy.module';

@Module({
    imports: [
        PharmacyModule,
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule { } 