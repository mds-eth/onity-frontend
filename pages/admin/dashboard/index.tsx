import { NextPage } from "next";
import React, { useState } from "react";
import { Button, Form, Input, Container, TitleForm } from "./styles";

const Dashboard: NextPage = () => {
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
      <h1>Dashboard</h1>
    </Container>
  );
}

export default Dashboard;
