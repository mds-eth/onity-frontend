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

import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { IEvents } from "../../../types/EventType";

interface IAdminEvents {
  events: IEvents[];
}

const AdminEvents: NextPage<IAdminEvents> = ({ events }) => {

  const [eventList, setEventList] = useState(events);

  const router = useRouter();

  const handleEditClick = () => { }

  const openModalDelete = async (event: IEvents) => {

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

          const response = await ApiService.delete(`/events/${event.id}`);

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
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Evento</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Cidade</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Criado em</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventList?.map((event) => (
                    <TableRow key={event?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {event?.id}
                      </TableCell>
                      <TableCell align="center">{event?.event_name}</TableCell>
                      <TableCell align="center">{event?.status === true ? 'Ativo' : 'Inativo'}</TableCell>
                      <TableCell align="center">{event?.city}</TableCell>
                      <TableCell align="center">{event?.state}</TableCell>
                      <TableCell align="center">{event?.created_at}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Editar" onClick={() => router.push(`/admin/events/edit/${event.id}`)}>
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
            <h1>Nenhum evento cadastrado</h1>
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

export default AdminEvents;
