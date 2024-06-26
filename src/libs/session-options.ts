import { Role } from "@/model/market-data-model";
import { SessionOptions } from "iron-session";

export class UserProfile {
  token: string;
  id: string;
  name: string;
  picture: string;
  roles: Role[] = []

  constructor(
    token: string,
    id: string,
    name: string,
    picture: string,
    roles: Role[]
  ) {
    this.token = token
    this.id = id
    this.name = name
    this.picture = picture
    this.roles = roles
  }
}

export class SessionData {
  userProfile?: UserProfile;
  isLoggedIn: boolean;

  constructor(userInfo: UserProfile, isLoggedIn: boolean) {
    this.userProfile = userInfo
    this.isLoggedIn = isLoggedIn
  }
}

export const defaultSession: SessionData = {
  userProfile: undefined,
  isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
  password: "_qewklsf131@3kmfdsk#$mkd1!s1231kkkdj$2!@",
  cookieName: "authentication-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};