import { UserDomain } from 'src/users/domain/user.domain'

export interface ISignupUserService {
  signup(userDomain: UserDomain): Promise<UserDomain>
}
