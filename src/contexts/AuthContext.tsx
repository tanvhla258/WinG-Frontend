import React from "react";
interface AuthState {
  user: { token: string };
  isAuthenticated: boolean;
}
type Login = { type: "login"; payload: { id: number; username: string } };
type SignUp = {
  type: "signup";
  payload: { id: number; username: string; fullName: string; email: string };
};
type LogOut = {
  type: "logout";
};
type AuthActions = Login | SignUp | LogOut;

function appReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "signup":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Auth aciton unknonw");
  }
}
function AuthContext() {
  return <div>AuthContext</div>;
}

export default AuthContext;
