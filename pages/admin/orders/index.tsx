import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { IOrders, IProduct } from "../../../types/OrderType";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";

interface IAdminOrders {
  orders: IOrders[];
}

const AdminEvents: NextPage<IAdminOrders> = ({ orders }) => {

  const [loader, setLoader] = useState<boolean>(false);

  const handleModalSendEmails = () => {

    const total = orders.length;

    Swal.fire({
      title: 'Atenção!',
      html: `${total > 1 ? 'Serão' : 'Será'} ${total > 1 ? 'enviados' : 'enviado'} <b>${total}</b> email${total > 1 ? 's' : ''}, deseja continuar?`,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonAriaLabel: 'Cancelar',
      icon: 'warning',
      showCloseButton: true,
      cancelButtonText: 'Fechar'
    }).then(async function (result) {

      if (result.isConfirmed) {

        setLoader(true);

        try {

          const response = await ApiService.post('/calculate', {});

          setLoader(false);

          if (response.status === 200) {
            Swal.fire({
              text: `Disparo realizado com sucesso.`,
              showCancelButton: false,
              confirmButtonText: 'Fechar',
              icon: 'success',
              showCloseButton: true,
              cancelButtonText: 'Fechar'
            })
          }

        } catch (error) {
          setLoader(false);
        }
      }
    });
  }

  function Row(props: { row: IOrders }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
            {row.hotel}
          </TableCell>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.phone}</TableCell>
          <TableCell align="center">{row.icms}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Produtos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow hover>
                      <TableCell align="center">Código produto</TableCell>
                      <TableCell align="center">Produto</TableCell>
                      <TableCell align="center">Quantidade</TableCell>
                      <TableCell align="center">Criado em</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.orders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell align="center">{order.product_code}</TableCell>
                        <TableCell align="center">{order.title}</TableCell>
                        <TableCell align="center">{order.quantity}</TableCell>
                        <TableCell align="center">{new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(new Date(order.created_at))}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerOrderDashboard>
        <ContentTable>
          {loader ? (
            <Loader />
          ) : (
            orders?.length > 0 ? (
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center">Hotel</TableCell>
                      <TableCell align="center">Nome cliente</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Celular</TableCell>
                      <TableCell align="center">ICMS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order: IOrders) => (
                      <Row key={order.id} row={order} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <h1>Nenhum pedido localizado</h1>
            )
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
    console.log(`to entrando aqui`)
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
