import { UserSigninDomain } from 'src/users/domain/user.singin.domain'
import { UserSessionDomain } from 'src/users/domain/user.session.domain'

export interface ISigninUserService {
  signin(userDomain: UserSigninDomain): Promise<UserSessionDomain>
}
