import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TasksModule,TypeOrmModule.forRoot({
     type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'task-management',
      autoLoadEntities:true,
      synchronize: true,
  }), AuthModule, UsersModule,ConfigModule.forRoot(
    {
      isGlobal: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
