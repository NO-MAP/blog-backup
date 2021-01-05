import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JWT_CONFIG, DB_CONFIG } from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JWT_CONFIG, DB_CONFIG],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_CONFIG().DB_HOST,
      port: DB_CONFIG().DB_PORT,
      username: DB_CONFIG().DB_USERNAME,
      password: DB_CONFIG().DB_PASSWORD,
      database: DB_CONFIG().DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entityPrefix: 'blog_'
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule { }
