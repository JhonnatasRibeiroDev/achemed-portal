"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoUsuario: "paciente",
    senha: "",
    confirmarSenha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, tipoUsuario: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    if (!aceitaTermos) {
      newErrors.termos = "Você deve aceitar os termos e condições";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulação de registro
    setTimeout(() => {
      setIsLoading(false);
      // Redirecionar para a página de login após registro bem-sucedido
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
      <div className="w-full max-w-lg">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 mb-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-sky-700">Portal Médico</h1>
          <p className="text-gray-600">Crie sua conta para começar</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
                {errors.nome && (
                  <p className="text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    className="pl-10"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
                {errors.telefone && (
                  <p className="text-sm text-red-500">{errors.telefone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoUsuario">Tipo de usuário</Label>
                <Select
                  value={formData.tipoUsuario}
                  onValueChange={handleSelectChange}>
                  <SelectTrigger id="tipoUsuario">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paciente">Paciente</SelectItem>
                    <SelectItem value="medico">Médico</SelectItem>
                    <SelectItem value="clinica">Clínica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
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
                {errors.senha && (
                  <p className="text-sm text-red-500">{errors.senha}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
                {errors.confirmarSenha && (
                  <p className="text-sm text-red-500">
                    {errors.confirmarSenha}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="termos"
                  checked={aceitaTermos}
                  onCheckedChange={setAceitaTermos}
                />
                <Label htmlFor="termos" className="text-sm leading-tight">
                  Eu concordo com os{" "}
                  <Link
                    href="/termos"
                    className="font-medium text-sky-600 hover:text-sky-700">
                    termos de serviço
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacidade"
                    className="font-medium text-sky-600 hover:text-sky-700">
                    política de privacidade
                  </Link>
                </Label>
              </div>
              {errors.termos && (
                <p className="text-sm text-red-500">{errors.termos}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrar"}
              </Button>
              <p className="mt-4 text-center text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-sky-600 hover:text-sky-700">
                  Faça login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
