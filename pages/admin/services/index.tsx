import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

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
import Swal from "sweetalert2";

interface IAdminServices {
  services: EventsType[];
}

const AdminServices: NextPage<IAdminServices> = ({ services }) => {

  const [eventList, setEventList] = useState(services);

  const router = useRouter();

  const handleEditClick = () => { }

  const openModalDelete = async (event: EventsType) => {

    Swal.fire({
      title: 'Atenção!',
      text: `Deseja remover ${event.event_name}?`,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonAriaLabel: 'Cancelar',
      icon: 'warning',
      showCloseButton: true,
      cancelButtonText: 'Fechar'
    }).then(async function (result) {

      if (result.isConfirmed) {

        try {

          const response = await ApiService.delete(`/services/${event.id}`);

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Registro removido com sucesso.',
              icon: 'success',
              confirmButtonText: 'Fechar'
            }).then(function () {
              setEventList(eventList.filter((e) => e.id !== event.id));
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Atenção!',
            text: String(error),
            icon: 'warning',
            confirmButtonText: 'Fechar'
          });
        }
      }
    });
  }

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
              onClick={() => router.push('/admin/events/create')}
            >
              <AddIcon />
              Adicionar
            </IconButton>
          </Box>
          {eventList?.length > 0 ? (
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
                  {eventList.map((event) => (
                    <TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {event.event_name}
                      </TableCell>
                      <TableCell align="right">{event.status === true ? 'Ativo' : 'Inativo'}</TableCell>
                      <TableCell align="right">{event.city}</TableCell>
                      <TableCell align="right">{event.state}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Editar" onClick={handleEditClick}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Excluir" onClick={() => openModalDelete(event)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>Nenhum serviço cadastrado</h1>
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

  const response = await ApiService.get('/events');

  const events = response.data;

  return {
    props: { events },
  };
}

export default AdminServices;