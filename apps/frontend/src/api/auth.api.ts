import type { LoginPayload, SignupPayload } from "../interfaces/auth.interface";
import api from "../config/axios";
import { API_ROUTES} from "../config/constants";

export async function loginApi(payload: LoginPayload) {
  const res = await api.post(API_ROUTES.AUTH.LOGIN, payload);
  return res.data;
}

export async function signupApi(payload: SignupPayload) {
  const res = await api.post(API_ROUTES.AUTH.SIGNUP, payload);
  return res.data;
}
