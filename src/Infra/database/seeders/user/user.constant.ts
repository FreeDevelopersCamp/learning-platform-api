import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';

export const UserConstant = {
  userName: 'admin',
  password: 'Admin@123',
  roles: [AllowRoles.owner],
};
