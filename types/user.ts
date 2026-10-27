export type User = {
    _id: string
    name: string
    email: string
    phone: string
    avatar: string
    role: any
    nidFront: string
    nidBack: string
    tradeLicense: string
    isVerified: boolean
}
export interface UserStat {
  label: string;
  value: string;
  change: string;
  icon: any;
}

export type UserFilter =
  | "All Users"
  | "Guests"
  | "Hotel Owners"
  | "Staff"
  | "Verified"
  | "Suspended";