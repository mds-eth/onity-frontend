/* eslint-disable @next/next/no-img-element */
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

interface IDataForm {
  event_name: string;
  status: boolean;
  file: string;
  city: string;
  state: string;
  init_date: string;
  end_date: string;
}

interface IPropsUserEdit {
  id: number;
  event_name: string;
  status: boolean;
  file_path: string;
  city: string;
  state: string;
  init_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface IUserProps {
  event: IPropsUserEdit;
}

const EditEvents: NextPage<IUserProps> = (props) => {

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(props.event.file_path);

  const [editFile, setEditFile] = useState<boolean>(false);

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
    defaultValues: props.event
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setEditFile(true);
    }
  };

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
      formData.append('file_change', String(editFile));

      const response = await ApiService.putWithFile(`/events/${props.event.id}`, formData);

      setLoader(false);

      if (response.status === 200) {
        Swal.fire({
          text: `Evento editado com sucesso`,
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
                  onChange={handleFileChange}
                />
                {editFile ? (
                  <img src={selectedImage} alt="imagem front" width={100} height={100} />
                ) : (
                  <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}${props.event.file_path}`} alt="imagem evento" width={100} height={100} />
                )}
                <Typography variant="body2" color="error">
                  {errors?.file?.message}
                </Typography>
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

  const response = await ApiService.get(`/events/${id}`);

  const event = response.data;

  return {
    props: { event },
  };
}

export default EditEvents;
