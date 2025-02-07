import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { StorageModule } from '../storage/storage.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { LocalStorageService } from '../storage/local-storage.service';
@Module({
  imports: [
    ConfigModule.forRoot(),

    MailModule,
    PassportModule,
    JwtModule.registerAsync({

      imports: [ConfigModule,
        MulterModule.register({
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
              cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            },
          }),
        }),
      ],
      
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    StorageModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, LocalStorageService],

})
export class UserModule { }
