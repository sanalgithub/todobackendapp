import { AuthModule } from '@app/auth';
import { DataBaseModule } from '@app/common/database/database.module';
import { NotificationModule } from '@app/notification/notification.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from 'main/node/todo/todo.module';
import { UserModule } from 'main/node/user/user.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    DataBaseModule,
    NotificationModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.etivdl5.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
