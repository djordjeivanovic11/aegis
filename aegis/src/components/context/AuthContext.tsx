import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { login as loginUser } from "@/services/auth/index";
import { setAuthToken } from "@/services/axiosInstance";
import { TokenResponse } from "@/types/auth/types";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    // Load token from localStorage on mount, if available
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setAuthToken(storedToken);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // call your real backend
            const data: TokenResponse = await loginUser({
                username: email,
                password,
            });
            setToken(data.access_token);
            setAuthToken(data.access_token);
            localStorage.setItem("token", data.access_token);
        } catch (e) {
            console.error("Login failed:", e);
            throw new Error("Invalid credentials");
        }
    };

    const logout = () => {
        setToken(null);
        setAuthToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
