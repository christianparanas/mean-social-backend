import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    EventsModule
  ],
  exports: [
    AuthModule,
    DatabaseModule
  ]
})
export class CoreModule {}
