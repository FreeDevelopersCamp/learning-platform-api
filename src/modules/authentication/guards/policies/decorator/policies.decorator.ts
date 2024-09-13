import { Reflector } from '@nestjs/core';
import { Policy } from 'src/modules/core/entity/user/user.schema';

export const Policies = Reflector.createDecorator<Policy[]>();
