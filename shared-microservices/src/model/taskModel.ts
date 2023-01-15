import { Document, model, Model, ObjectId, Schema, Types } from 'mongoose';
import { PlainObject } from 'src/type/PlainObject';
import { Task } from 'todos-shared';

type CreateDocumentParams = Pick<Task, 'description' | 'dueDate' | 'owner' | 'summary' | 'type'>;

interface TaskDocument extends Document<ObjectId, any, Task> {}

interface TaskModel extends Model<TaskDocument> {
  readonly createDocument: (attrs: CreateDocumentParams) => TaskDocument;
}

const taskSchema = new Schema(
  {
    createdOn: {
      required: true,
      type: Date,
    },
    description: {
      type: String,
    },
    dueDate: {
      required: true,
      type: Date,
    },
    owner: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
    status: {
      enum: ['completed', 'todo'],
      required: true,
      type: String,
    },
    summary: {
      required: true,
      type: String,
    },
    type: {
      enum: ['private', 'work'],
      required: true,
      type: String,
    },
  },
  {
    collection: 'Task',
    toJSON: {
      transform(doc: TaskDocument, { __v, _id, owner, ...rest }: PlainObject<Task>): Task {
        return {
          ...rest,
          owner: owner.toString(),
          id: _id.toString(),
        };
      },
    },
  },
);

taskSchema.statics.createDocument = ({
  description,
  dueDate,
  owner,
  summary,
  type,
}: CreateDocumentParams): TaskDocument => {
  const calculated: Omit<Task, keyof CreateDocumentParams | 'id'> = {
    createdOn: new Date(),
    status: 'todo',
  };

  return new taskModel({
    ...calculated,
    description,
    dueDate,
    owner: new Types.ObjectId(owner),
    summary,
    type,
  });
};

export const taskModel = model<TaskDocument, TaskModel>('Task', taskSchema);
