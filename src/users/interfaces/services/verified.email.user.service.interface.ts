export interface IVerifiedEmaileUserService {
  emailUsed(email: string): Promise<boolean>
}
