import api, { setAuthToken } from "@/services/axiosInstance";
import { LoginCredentials, TokenResponse } from "@/types/auth/types";

export async function login(
    creds: LoginCredentials
): Promise<TokenResponse> {
    // OAuth2PasswordRequestForm wants form‐urlencoded 'username' & 'password'
    const form = new URLSearchParams();
    form.append("username", creds.username);
    form.append("password", creds.password);

    const { data } = await api.post<TokenResponse>(
        "/auth/login",
        form.toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    // apply the token for future requests
    setAuthToken(data.access_token);

    return data;
}
