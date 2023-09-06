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
import { ServicesType } from "../../../@types/services-type";

interface IAdminServices {
  services: ServicesType[];
}

const AdminServices: NextPage<IAdminServices> = ({ services }) => {

  const [servicesList, setServicesList] = useState(services);

  const router = useRouter();

  const handleEditClick = () => { }

  const openModalDelete = async (service: ServicesType) => {

    Swal.fire({
      title: 'Atenção!',
      text: `Deseja remover ${service.title}?`,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonAriaLabel: 'Cancelar',
      icon: 'warning',
      showCloseButton: true,
      cancelButtonText: 'Fechar'
    }).then(async function (result) {

      if (result.isConfirmed) {

        try {

          const response = await ApiService.delete(`/services/${service.id}`);

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Registro removido com sucesso.',
              icon: 'success',
              confirmButtonText: 'Fechar'
            }).then(function () {
              setServicesList(servicesList.filter((e) => e.id !== service.id));
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
              onClick={() => router.push('/admin/services/create')}
            >
              <AddIcon />
              Adicionar
            </IconButton>
          </Box>
          {servicesList?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Título</TableCell>
                    <TableCell align="center">Tipo produto</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="center">Preço</TableCell>
                    <TableCell align="center">IPI</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Criado em</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {servicesList.map((service) => (
                    <TableRow key={service.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {service.id}
                      </TableCell>
                      <TableCell align="center">{service.code}</TableCell>
                      <TableCell align="center">{service.title}</TableCell>
                      <TableCell align="center">{service.type_product}</TableCell>
                      <TableCell align="center">{service.quantity}</TableCell>
                      <TableCell align="center">{service.price_net}</TableCell>
                      <TableCell align="center">{service.ipi}</TableCell>
                      <TableCell align="center">{service.status === true ? 'Ativo' : 'Inativo'}</TableCell>
                      <TableCell align="center">{service.created_at}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Editar" onClick={handleEditClick}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Excluir" onClick={() => openModalDelete(service)}>
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

  const response = await ApiService.get('/services');

  const services = response.data;

  return {
    props: { services },
  };
}

export default AdminServices;
