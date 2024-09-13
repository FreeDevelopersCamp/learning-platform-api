import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';

export const UserConstant = {
  userName: 'admin',
  password: 'Admin@123',
  roles: [AllowRoles.owner, AllowRoles.admin],
  personalInformation: {
    firstName: 'Admin',
    lastName: 'User',
  },
  contacts: {
    email: 'admin@example.com',
    phoneNumber: '1234567890',
  },
  address: {
    street: '123 Admin St',
    city: 'Admin City',
    country: 'Adminland',
  },
};
