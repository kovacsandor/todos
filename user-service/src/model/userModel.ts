import { Document, model, Model, ObjectId, Schema } from 'mongoose';
import { User } from 'todos-shared';
import { PlainObject } from 'todos-shared-microservices';

type CreateDocumentParams = Omit<User, 'id'>;

interface UserDocument extends Document<ObjectId, any, User> {}

interface UserModel extends Model<UserDocument> {
  readonly createDocument: (attrs: CreateDocumentParams) => UserDocument;
}

const userSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc: UserDocument, { __v, _id, ...rest }: PlainObject<User>): User {
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
  },
);

userSchema.statics.createDocument = ({ email, name, password }: CreateDocumentParams): UserDocument =>
  new userModel({
    email,
    name,
    password,
  });

export const userModel = model<UserDocument, UserModel>('User', userSchema);
