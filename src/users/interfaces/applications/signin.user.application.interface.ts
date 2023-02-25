import { UserSessionDomain } from 'src/users/domain/user.session.domain'
import { UserSigninDomain } from 'src/users/domain/user.singin.domain'

export interface ISigninUserApplication {
  signin(userDomain: UserSigninDomain): Promise<UserSessionDomain>
}
