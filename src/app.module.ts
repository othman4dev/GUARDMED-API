import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { PharmacyRepository } from './repositories/pharmacy.repository';
import { ReviewRepository } from './repositories/review.repository';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './auth/user.module';
import { MailModule } from './mail/mail.module';
import { PharmacyModule } from './pharmacies/pharmacy.module';
import { ReviewModule } from './reviews/review.module';

@Global()
@Module({
  imports: [
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FavoritesModule,
    UserModule,
    MailModule,
    PharmacyModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, PharmacyRepository, ReviewRepository],
  exports: [UserRepository, PharmacyRepository, ReviewRepository],
})
export class AppModule {}