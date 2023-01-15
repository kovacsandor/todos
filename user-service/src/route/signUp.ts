import { hash } from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import { sendMessage } from 'src/kafka';
import { SignUp, signUpValidationSchema, StatusCode, validateFields } from 'todos-shared';
import { CustomValidationError, getJWT, KafkaTopic, userModel, UserSignedUp } from 'todos-shared-microservices';

const method: SignUp['method'] = 'post';
const path: SignUp['path'] = '/api/user-service/sign-up';

export const signUp = Router();

signUp[method](
  path,
  async (
    req: Request<{}, SignUp['response'], SignUp['requestBody']>,
    res: Response<SignUp['response']>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await validateFields(req.body, signUpValidationSchema);
    } catch (validationError) {
      return next(validationError);
    }

    const existingUser = await userModel.findOne({
      email: req.body.email,
    });

    if (!!existingUser) {
      return next(new CustomValidationError(StatusCode.BadRequest, 'Email is already taken', req.body.email, 'email'));
    }

    const password = await hash(req.body.password, 10);

    const document = await userModel
      .createDocument({
        email: req.body.email,
        name: req.body.name,
        password: password,
      })
      .save();

    const user = document.toJSON();

    await sendMessage<UserSignedUp>({
      message: {
        user: {
          email: user.email,
          name: user.name,
        },
      },
      messageKey: user.id,
      topic: KafkaTopic.UserSignedUp,
    });

    const token = getJWT(user.id);

    res.status(StatusCode.Created).send({
      payload: { token },
      type: 'Success',
    });
  },
);
