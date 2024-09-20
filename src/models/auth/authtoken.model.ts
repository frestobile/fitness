export interface AuthToken {
  token?: string;
}

export class JwtAuthToken implements AuthToken{
  constructor(
    public token?: string
  ){}
}
