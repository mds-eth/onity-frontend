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
import Swal, { SweetAlertResult } from "sweetalert2";
import { IProduct } from "../../../types/ProductType";

interface IAdminProducts {
  products: IProduct[]
}

const AdminProducts: NextPage<IAdminProducts> = ({ products }) => {

  const [productsList, setProductsList] = useState(products);

  const router = useRouter();

  const handleEditClick = () => { }

  const openModalDelete = async (product: IProduct) => {

    Swal.fire({
      title: 'Atenção!',
      text: `Deseja remover ${product.title}?`,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonAriaLabel: 'Cancelar',
      icon: 'warning',
      showCloseButton: true,
      cancelButtonText: 'Fechar'
    }).then(async function (result: SweetAlertResult) {

      if (result.isConfirmed) {

        try {

          const response = await ApiService.delete(`/products/${product.id}`);

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Registro removido com sucesso.',
              icon: 'success',
              confirmButtonText: 'Fechar'
            }).then(function () {
              setProductsList(productsList.filter((e) => e.id !== product.id));
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Atenção!',
            text: 'Ocorreu algum erro ao tentar remover registro. Tente novamente.',
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
              onClick={() => router.push('/admin/products/create')}
            >
              <AddIcon />
              Adicionar
            </IconButton>
          </Box>
          {productsList?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Código produto</TableCell>
                    <TableCell align="center">Tipo produto</TableCell>
                    <TableCell align="center">Preço</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">IPI</TableCell>
                    <TableCell align="center">Criado em</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsList.map((product) => (
                    <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="center">{product.title}</TableCell>
                      <TableCell align="center">{product.product_code}</TableCell>
                      <TableCell align="center">{product.type_product}</TableCell>
                      <TableCell align="center">{product.price_net}</TableCell>
                      <TableCell align="center">{product.status === true ? 'Ativo' : 'Inativo'}</TableCell>
                      <TableCell align="center">{product.ipi}</TableCell>
                      <TableCell align="center">{product.created_at}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Editar" onClick={handleEditClick}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Excluir" onClick={() => openModalDelete(product)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>Nenhum produto cadastrado</h1>
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

  const response = await ApiService.get('/products');

  const products = response.data;

  return {
    props: { products },
  };
}

export default AdminProducts;
