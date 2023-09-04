import { NextPage } from "next";
import React, { useState } from "react";
import { Button, Form, Input, Container, TitleForm } from "./styles";

const Login: NextPage = () => {
  const [dados, setDados] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(dados);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDados(Object.assign(dados, { [name]: value }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TitleForm>Acesso administrativo</TitleForm>
        <Input
          type="email"
          name="email"
          value={dados.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          value={dados.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button>Entrar</Button>
      </Form>
    </Container>
  );
}

export default Login;
