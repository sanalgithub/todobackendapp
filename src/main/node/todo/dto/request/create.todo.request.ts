import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { constants } from '@app/todo/constants';
import { IsCompleted } from '@app/todo/types/completedStatus';

export class CreateToDoRequest {
  @IsNotEmpty()
  @IsString({ message: constants.TITLE_SHOULD_BE_STRING })
  title!: string;

  @IsNotEmpty()
  @IsString({ message: constants.DESCRIPTION_SHOULD_BE_STRING })
  description!: string;

  @IsNotEmpty()
  @IsString({ message: constants.DATE_SHOULD_BE_STRING })
  date!: string;

  @IsNotEmpty()
  @IsString({ message: constants.TIME_SHOULD_BE_STRING })
  time!: string;

  @IsBoolean()
  @IsOptional()
  completed?: IsCompleted;
}
