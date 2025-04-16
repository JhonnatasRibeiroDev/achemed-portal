"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      router.push("/");
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
      alert("Falha ao autenticar com Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Aqui será a lógica futura de autenticação com email/senha via Firebase
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white text-gray-900">
      {/* Lado esquerdo - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-800 p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img
              width={180}
              className="mx-auto mb-3"
              src="https://achemed.com.br/wp-content/uploads/2025/01/Logo-Achemed.webp"
              alt="Logo Achemed"
            />
            <p className="text-white text-sm opacity-90">
              Acesse sua conta para continuar
            </p>
          </div>

          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
              <CardDescription>Faça login com suas credenciais</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="/recuperar-senha"
                      className="text-sm font-medium text-sky-600 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-800"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Lembrar de mim */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}>
                  {isLoading ? "Autenticando..." : "Entrar com Google"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link
                    href="/registro"
                    className="font-medium text-sky-600 hover:underline">
                    Registre-se
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Lado direito - Imagem */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen relative">
        <div
          className="absolute inset-0 bg-sky-950/60 z-10"
          style={{ backdropFilter: "blur(2px)" }}
        />
        <img
          src="https://funcionalcontabil.com.br/wp-content/uploads/2024/11/Receita-Saude-O-que-e-e-Como-Emitir-o-Recibo-Medico-funcional-contabil.png"
          alt="Saúde"
          className="w-full h-full object-cover z-0"
        />
      </div>
    </div>
  );
}
