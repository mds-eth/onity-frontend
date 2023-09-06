import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { EventsType } from "../../../@types/events-type";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

interface IAdminProducts {
  events: EventsType[];
}

const AdminProducts: NextPage<IAdminProducts> = ({ events }) => {

  const router = useRouter();

  const handleEditClick = () => { }

  const handleDeleteClick = () => { }

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerOrderDashboard>
        <ContentTable>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton
              color="primary"
              aria-label="Adicionar"
              onClick={() => router.push('/admin/products/create')}
            >
              <AddIcon />
              Adicionar
            </IconButton>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Evento</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Cidade</TableCell>
                  <TableCell align="right">Estado</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.event_name}
                    </TableCell>
                    <TableCell align="right">{row.status === true ? 'Ativo' : 'Inativo'}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="Editar" onClick={handleEditClick}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="Excluir" onClick={handleDeleteClick}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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

  const response = await ApiService.get('/products');

  const events = response.data;

  return {
    props: { events },
  };
}

export default AdminProducts;
