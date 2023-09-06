import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

import InputMask from 'react-input-mask';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerCreate } from "./styles";

import Navigation from "../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  event_name: yup.string().required('Nome do evento é obrigatório'),
  status: yup
    .string()
    .oneOf(['SIM', 'NAO'], 'Selecione uma opção válida')
    .required('O campo Status é obrigatório'),
  file: yup.mixed().required('Arquivo é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  init_date: yup.date().required('Data inicial é obrigatória'),
  end_date: yup.date().required('Data final é obrigatória'),
});

const CreateServices: NextPage = () => {

  const router = useRouter();

  const { handleSubmit, control, formState: { errors }, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Lógica para enviar os dados do formulário
    console.log(data);
  };

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerCreate>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Cadastrar serviço</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="event_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Nome do Evento" fullWidth error={!!errors.event_name} helperText={errors.event_name?.message} />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field}>
                      <MenuItem value="SIM">SIM</MenuItem>
                      <MenuItem value="NAO">NAO</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                  </FormControl>
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
                name="init_date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputMask  {...field} mask="99/99/9999" placeholder="10/10/2023" name="init_date" id="init_date" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <InputMask  {...register('init_date')} mask="99/99/9999" placeholder="10/10/2023" name="init_date" id="init_date" />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="file"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf" // Exemplo de tipos de arquivo permitidos
                    style={{ display: 'none' }} // Oculta o campo de entrada padrão
                  />
                )}
              />
              <label htmlFor="file">
                <Button variant="contained" component="span" fullWidth>
                  Selecionar Arquivo
                </Button>
              </label>
              {errors.file && (
                <Typography variant="body2" color="error">
                  {errors.file.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Salvar</Button>
            </Grid>
          </Grid>
        </form>
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

export default CreateServices;
