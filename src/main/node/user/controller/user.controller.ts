import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from 'main/node/common/dto/api.response';
import { constants } from '@app/user/constants';
import { CreateUserRequest } from '@app/user/dto/create.user.request';
import { UserService } from '@app/user/service/user.service';
import { User } from '@app/user/model/user.model';
import { UserResponse } from '@app/user/dto/user.response';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.userService.create(request);
    return ApiResponse.create({
      code: HttpStatus.CREATED,
      message: constants.USER_CREATED,
      status: true,
      data: [this.mapToUserResponse(user)],
    });
  }

  private mapToUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
