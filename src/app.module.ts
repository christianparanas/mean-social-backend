import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


// modules
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from './core/core.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    CoreModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
