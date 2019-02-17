class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { user: string; token: string }) {}
}

class Logout {
  static readonly type = '[Auth] Logout';
}

export { Logout, Login };
