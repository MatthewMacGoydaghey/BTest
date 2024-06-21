export interface JWTpayload {
  userID: number,
  role: RoleEnum
}



export type RoleEnum = "Admin" | "User"


export type Roles = 'Admin' | 'User'