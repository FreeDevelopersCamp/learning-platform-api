import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import configurations from './configurations';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      global: true,
      secret: configurations().security.jwtsecretkey,
      signOptions: {
        expiresIn: configurations().security.tokenexpiration,
      },
    };
  },
};
