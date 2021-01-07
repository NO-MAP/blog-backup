import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { tokenInterface } from "src/auth/jwt.strategy";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: tokenInterface = request.user;
    return user
  }
)