import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ORMConfig } from './ormconfig'

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(ORMConfig)],
})
export class AppModule {}
