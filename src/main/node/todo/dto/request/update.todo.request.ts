import { IsCompleted } from '@app/todo/types/completedStatus';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoRequest {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  date!: string;

  @IsOptional()
  @IsString()
  time!: string;

  @IsBoolean()
  @IsOptional()
  completed?: IsCompleted;
}
