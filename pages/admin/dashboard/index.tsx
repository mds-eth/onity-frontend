import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import nookies from 'nookies';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerListDashboard, ItemDashboard } from "../../../pageStyles/admin/dashboard/styles";

import Navigation from "../../../components/Admin/Navigation";

const Dashboard: NextPage = () => {

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerListDashboard>
        <ItemDashboard>
          <h3>Eventos</h3>
          <h4>14</h4>
        </ItemDashboard>
        <ItemDashboard>
          <h3>Pedidos</h3>
          <h4>180</h4>
        </ItemDashboard>
        <ItemDashboard>
          <h3>Produtos</h3>
          <h4>29</h4>
        </ItemDashboard>
        <ItemDashboard>
          <h3>Usuários</h3>
          <h4>8</h4>
        </ItemDashboard>

      </ContainerListDashboard>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { res } = ctx;

  const user = nookies.get(ctx)['[@auth:user]'];

  if (!user) {
    res.writeHead(302, {
      Location: '/admin/auth/login',
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end();

    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default Dashboard;
