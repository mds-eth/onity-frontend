/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import * as yup from 'yup';

import { toast } from 'react-toastify';

import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Form, Input, Container, TitleForm } from "../../../../pageStyles/admin/auth/login/styles";

import { useAuth } from "../../../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {

  const { login, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    logout(true);
  }, [])

  const schema = yup.object().shape({
    email: yup.string()
      .required('Este campo é obrigatório')
      .email('Digite um email válido'),
    password: yup.string()
      .required('Este campo é obrigatório')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    try {
      const response: any = await login(data.email, data.password);

      if (response) {
        return router.push('/admin/dashboard');
      }
      return toast.error('Dados informados não localizados.');
    } catch (error) {
      return toast.error('Dados informados não localizados.');
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleForm>Acesso administrativo</TitleForm>
          <Input
            type="email"
            placeholder="Email"
            className={errors.email && 'border-errror'}
            {...register("email")}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <Input
            type="password"
            placeholder="Senha"
            className={errors.password && 'border-errror password'}
            style={{ marginTop: '15px' }}
            {...register("password")}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
          <Button type="submit">Entrar</Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
