import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import InputMask from 'react-text-mask';

import ApiService from '../../../services/api.service';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FilledInput } from '@mui/material';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerCreate } from "../../../pageStyles/admin/events/styles";

import Navigation from "../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../components/Loader";
import Swal, { SweetAlertResult } from "sweetalert2";

interface IDataForm {
  event_name: string;
  status: boolean;
  file: any;
  city: string;
  state: string;
  init_date: string;
  end_date: string;
}

const CreateEvents: NextPage = () => {

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const schema = yup.object().shape({
    event_name: yup.string().required('O nome do evento é obrigatório'),
    status: yup.boolean().required('O status é obrigatório'),
    file: yup
      .mixed()
      .required("Imagem é obrigatória")
      .test("fileSize", "Arquivo com tamanho superior a 5MB. Limite máximo permitido é 5MB.", (value: any) => {
        if (value.length === 0) return false;

        return !value || (value[0]?.size <= 2000000);
      })
      .test("type", "Apenas estes formatos são aceitos: .jpeg, .jpg, .gif", (value: any) => {
        return !value || (
          value[0]?.type === "image/jpeg" ||
          value[0]?.type === "image/jpg" ||
          value[0]?.type === "image/png" ||
          value[0]?.type === 'application/gif'
        );
      }),
    city: yup.string().required('A cidade é obrigatória'),
    state: yup.string().required('O estado é obrigatório'),
    init_date: yup
      .string()
      .test('is-date', 'A data de início é inválida. Formato correto: DD/MM/AAAA', (value) => {
        if (!value) return true;
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(value)) return false;
        const [, day, month, year]: any = regex.exec(value);
        const date = new Date(`${year}-${month}-${day}`);
        return !isNaN(date.getTime());
      })
      .required('A data de início é obrigatória'),
    end_date: yup
      .string()
      .test('is-date', 'A data de término é inválida. Formato correto: DD/MM/YYYY', (value) => {
        if (!value) return true;
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(value)) return false;
        const [, day, month, year]: any = regex.exec(value);
        const date = new Date(`${year}-${month}-${day}`);
        return !isNaN(date.getTime());
      })
      .required('A data de término é obrigatória'),
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataForm) => {

    setLoader(true);

    try {

      const formData = new FormData();
      formData.append('event_name', data.event_name);
      formData.append('status', String(data.status));
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('init_date', data.init_date);
      formData.append('end_date', data.end_date);
      formData.append('file', data.file[0]);

      const response = await ApiService.postWithFile('/events', formData);

      setLoader(false);

      if (response.status === 201) {
        Swal.fire({
          text: `Evento criado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result: SweetAlertResult) {
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
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Ativo</InputLabel>
                      <Select {...field}>
                        <MenuItem value="1">SIM</MenuItem>
                        <MenuItem value="0">NÃO</MenuItem>
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
                  render={({ field }) => (
                    <TextField {...field} label="Data início" fullWidth error={!!errors.init_date} helperText={errors.init_date?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Data fim" fullWidth error={!!errors.end_date} helperText={errors.end_date?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  {...register('file')}
                />
                <Typography variant="body2" color="error">
                  <>{errors?.file?.message}</>
                </Typography>
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

export default CreateEvents;
