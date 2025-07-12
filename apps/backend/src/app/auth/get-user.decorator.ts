import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, request: any) => {
  const user = request?.token?.user;
  return data ? user?.[data] : user;
});
