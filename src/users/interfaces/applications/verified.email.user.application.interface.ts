export interface IVerifiedEmailUserApplication {
  emailUsed(email: string): Promise<boolean>
}
