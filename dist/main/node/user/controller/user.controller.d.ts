import { ApiResponse } from 'main/node/common/dto/api.response';
import { CreateUserRequest } from '@app/user/dto/create.user.request';
import { UserService } from '@app/user/service/user.service';
import { UserResponse } from '@app/user/dto/user.response';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(request: CreateUserRequest): Promise<ApiResponse<UserResponse>>;
    private mapToUserResponse;
}
