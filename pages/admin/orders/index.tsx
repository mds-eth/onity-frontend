import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerOrderDashboard, ContentTable } from "../../../pageStyles/admin/orders/styles";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navigation from "../../../components/Admin/Navigation";

import { IOrders } from "../../../types/OrderType";

interface IAdminOrders {
  orders: IOrders[];
}

const AdminEvents: NextPage<IAdminOrders> = ({ orders }) => {

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerOrderDashboard>
        <ContentTable>
          {orders?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Hotel</TableCell>
                    <TableCell align="center">Nome cliente</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Celular</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">CNPJ</TableCell>
                    <TableCell align="center">ICMS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{order.id}</TableCell>
                      <TableCell align="center">{order.hotel}</TableCell>
                      <TableCell align="center">{order.name}</TableCell>
                      <TableCell align="center">{order.email}</TableCell>
                      <TableCell align="center">{order.phone}</TableCell>
                      <TableCell align="center">{order.state}</TableCell>
                      <TableCell align="center">{order.cnpj}</TableCell>
                      <TableCell align="center">{order.icms ? 'SIM' : 'NAO'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>Nenhum pedido localizado</h1>
          )}
        </ContentTable>
      </ContainerOrderDashboard>
    </Container >
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

  const response = await ApiService.get('/orders');

  const orders = response.data;

  return {
    props: { orders },
  };
}

export default AdminEvents;
