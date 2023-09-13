import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FilledInput } from '@mui/material';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerCreate } from "../../../pageStyles/admin/services/styles";

import Navigation from "../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../components/Loader";
import Swal, { SweetAlertResult } from "sweetalert2";

interface IDataForm {
  code: string;
  title: string;
  type_product: number;
  quantity: number;
  price_net: number;
  ipi: number;
  status: boolean;
}

const CreateServices: NextPage = () => {

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const schema = yup.object().shape({
    code: yup.string().required('Código é obrigatório'),
    title: yup.string().required('Título é obrigatório'),
    type_product: yup.number().required('Tipo de produto é obrigatório'),
    quantity: yup.number().required('Quantidade é obrigatória'),
    price_net: yup.number().required('Preço é obrigatório'),
    ipi: yup.number().required('IPI é obrigatório'),
    status: yup.boolean().required('Status é obrigatório'),
  });

  const { handleSubmit, control, formState: { errors } } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataForm) => {

    setLoader(true);

    try {

      const response = await ApiService.post('/services', data);

      setLoader(false);

      if (response.status === 201) {
        Swal.fire({
          text: `Serviço criado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result: SweetAlertResult) {
          router.push('/admin/services');
        });
      }

    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerCreate>
        {loader ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Cadastrar serviço</Typography>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Código" fullWidth error={!!errors.code} helperText={errors.code?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Título" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="type_product"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type_product}>
                      <InputLabel>Tipo produto</InputLabel>
                      <Select {...field}>
                        <MenuItem value="0">Material</MenuItem>
                        <MenuItem value="1">Serviço</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                />
                <Typography variant="body2" color="error">
                  {errors?.type_product?.message}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Ativo</InputLabel>
                      <Select {...field}>
                        <MenuItem value="1">Ativo</MenuItem>
                        <MenuItem value="0">Inativo</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                />
                <Typography variant="body2" color="error">
                  {errors?.status?.message}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="number" label="Quantidade" fullWidth error={!!errors.quantity} helperText={errors.price_net?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="price_net"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Preço NET" fullWidth error={!!errors.price_net} helperText={errors.price_net?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="ipi"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="IPI" fullWidth error={!!errors.ipi} helperText={errors.ipi?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Salvar</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </ContainerCreate>
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

  return {
    props: {},
  };
}

export default CreateServices;
