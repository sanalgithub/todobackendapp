import { Module } from "@nestjs/common";
import { DataBaseModule } from "@app/common/database/database.module";
import { User } from "@app/user/model/user.model";
import { UserController } from "@app/user/controller/user.controller";
import { UserRepository } from "@app/user/repository/user.repository";
import { MongooseUserRepository } from "@app/user/repository/mongoose.user.repository";
import { UserService } from "@app/user/service/user.service";
import { DefaultUserService } from "@app/user/service/default-user.service";
import { PasswordEncoder } from "@app/common/utils/password.encode";


@Module({
  imports: [
    DataBaseModule.forFeature(User),
  ],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: MongooseUserRepository },
    { provide: UserService, useClass: DefaultUserService },
    PasswordEncoder
  ],
  exports: [UserService],
})
export class UserModule {}
