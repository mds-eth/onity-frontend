import { NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerOrderDashboard, ContentTable } from "./styles";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navigation from "../../../components/Admin/Navigation";

function createData(
  title: any,
  code_product: any,
  type_product: any,
  price_net: any,
  ipi: any,
  price_bruto: any,
  quantity: any,
  status: any,
  file: any,
) {
  return { title, code_product, type_product, price_net, ipi, price_bruto, quantity, status, file };
}

const rows = [
  createData('Titulo'),
  createData('Titulo'),
  createData('Titulo'),
  createData('Titulo'),
  createData('Titulo'),
];



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
      <HeaderAdmin />
      <Navigation />
      <ContainerOrderDashboard>
        <ContentTable>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell align="right">Código produto</TableCell>
                  <TableCell align="right">Tipo produto</TableCell>
                  <TableCell align="right">Preço NET</TableCell>
                  <TableCell align="right">IPI</TableCell>
                  <TableCell align="right">Preço Bruto</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Imagem</TableCell>
                  <TableCell align="right">Acoes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentTable>
      </ContainerOrderDashboard>
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
