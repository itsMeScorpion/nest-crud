import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
// import { UserModule } from './user/user.module';
// import { BookmarkModule } from './bookmark/bookmark.module';
// import { getORMConfig } from './ormConfig';
// import { configuration } from './config/typeConfiguration';
// import { UserRepository } from './auth/user.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
