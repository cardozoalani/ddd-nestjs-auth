import { UserDomain } from 'src/users/domain/user.domain'

export interface ISignupUserApplication {
  signup(userDomain: UserDomain): Promise<UserDomain>
}
