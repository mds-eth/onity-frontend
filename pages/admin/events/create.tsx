import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerCreate } from "./styles";

import Navigation from "../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  event_name: yup.string().required('O nome do evento é obrigatório'),
  status: yup.boolean().required('O status é obrigatório'),
  file: yup
    .mixed()
    .test('fileType', 'O arquivo deve ser uma imagem', (value: any) => {
      if (!value) return false;
      return value && value.type.includes('image');
    })
    .required('O arquivo é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  state: yup.string().required('O estado é obrigatório'),
  init_date: yup
    .date()
    .typeError('A data de início é inválida')
    .required('A data de início é obrigatória'),
  end_date: yup
    .date()
    .typeError('A data de término é inválida')
    .required('A data de término é obrigatória'),
});

interface IDataForm {
  event_name: string;
  status: boolean;
  file: any;
  city: string;
  state: string;
  init_date: Date;
  end_date: Date;
}

const CreateEvents: NextPage = () => {

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const { handleSubmit, control, formState: { errors } } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataForm) => {

    setLoader(true);

    try {

      const response = await ApiService.post('/events', data);

      setLoader(false);

      if (response.status === 201) {
        Swal.fire({
          text: `Evento criado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result) {
          router.push('/admin/events');
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
                <Typography variant="h6">Cadastrar evento</Typography>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="event_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Nome" fullWidth error={!!errors.event_name} helperText={errors.event_name?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Status</InputLabel>
                      <Select {...field}>
                        <MenuItem value="true">SIM</MenuItem>
                        <MenuItem value="false">NÃO</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Cidade" fullWidth error={!!errors.city} helperText={errors.city?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Estado" fullWidth error={!!errors.state} helperText={errors.state?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="init_date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <TextField {...field} label="Data início" fullWidth error={!!errors.init_date} helperText={errors.init_date?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="end_date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <TextField {...field} label="Data fim" fullWidth error={!!errors.end_date} helperText={errors.end_date?.message} />
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

export default CreateEvents;
