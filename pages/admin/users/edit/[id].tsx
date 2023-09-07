import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import ApiService from '../../../../services/api.service';

import InputMask from 'react-input-mask';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import { HeaderAdmin } from "../../../../components/Admin/Header";

import { Container, ContainerCreate } from "../styles";

import Navigation from "../../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../../components/Loader";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('O email deve ser um endereço de email válido')
    .required('O email é obrigatório'),
  phone: yup.string().matches(/^\d{11}$/, 'O número de telefone deve conter 11 dígitos').required('O número de telefone é obrigatório'),
  status: yup.boolean().required('O status é obrigatório'),
});

interface IDataForm {
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

interface IPropsUserEdit {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  first_access: boolean;
  last_access: string;
  created_at: string;
  updated_at: string;
}

interface IUserProps {
  user: IPropsUserEdit;
}


const EditUsers: NextPage<IUserProps> = (props) => {

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const { handleSubmit, control, formState: { errors } } = useForm<IDataForm>({
    resolver: yupResolver(schema),
    defaultValues: props.user
  });

  const onSubmit = async (data: IDataForm) => {

    setLoader(true);

    try {

      const response = await ApiService.put(`/users/${props.user.id}`, data);

      setLoader(false);

      if (response.status === 200) {
        Swal.fire({
          text: `Usuário editado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result) {
          router.push('/admin/users');
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
                <Typography variant="h6">Editar usuário</Typography>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Nome" fullWidth error={!!errors.name} helperText={errors.name?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Contato" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>STATUS</InputLabel>
                      <Select {...field}>
                        <MenuItem value="true">SIM</MenuItem>
                        <MenuItem value="false">NÃO</MenuItem>
                      </Select>
                    </FormControl>
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
  const { res, query } = ctx;

  const userSession = nookies.get(ctx)['[@auth:user]'];

  if (!userSession) {
    res.writeHead(302, {
      Location: '/admin/auth/login',
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end();

    return {
      props: {},
    };
  }

  const { id } = query;

  const response = await ApiService.get(`/users/${id}`);

  const user = response.data;

  return {
    props: { user },
  };
}

export default EditUsers;
