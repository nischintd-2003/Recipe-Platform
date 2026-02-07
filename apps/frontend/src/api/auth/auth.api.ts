import type {
  LoginPayload,
  SignupPayload,
} from "../../interfaces/auth.interface";
import api from "../../config/axios";

export async function loginApi(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function signupApi(payload: SignupPayload) {
  const res = await api.post("/auth/signup", payload);
  return res.data;
}
