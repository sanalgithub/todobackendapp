import { BaseModel } from '@app/common/database/model/base.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsCompleted } from '@app/todo/types/completedStatus';

@Schema({})
export class Todo extends BaseModel {
  @Prop({ type: 'string' })
  title!: string;

  @Prop({ type: 'string' })
  description!: string;

  @Prop({ type: 'string' })
  date!: string;

  @Prop({ type: 'string' })
  time!: string;

  @Prop({ type: 'string', enum: IsCompleted })
  completed!: IsCompleted;

  constructor(todo: Partial<Todo>) {
    super();
    Object.assign(this, todo);
  }
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
