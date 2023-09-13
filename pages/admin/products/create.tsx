import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";

import nookies from 'nookies';

import ApiService from '../../../services/api.service';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Theme, Box, Chip, useTheme, SelectChangeEvent } from '@mui/material';

import { HeaderAdmin } from "../../../components/Admin/Header";

import { Container, ContainerCreate } from "../../../pageStyles/admin/products/styles";

import Navigation from "../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../components/Loader";
import Swal, { SweetAlertResult } from "sweetalert2";
import { IServices } from "../../../types/ServiceType";

interface IDataForm {
  title: string;
  product_code: string;
  type_product: number;
  price_net: number;
  ipi: number;
  status: boolean;
  slug: string;
  file: any;
  items: String[],
}

interface IAdminCreateProduct {
  services: IServices[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateProducts: NextPage<IAdminCreateProduct> = ({ services }) => {

  const theme = useTheme();

  const router = useRouter();
  const [nameItem, setNameItem] = React.useState<string[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const schema = yup.object().shape({
    title: yup.string().required('Título é obrigatório'),
    product_code: yup.string().required('Código do produto é obrigatório'),
    type_product: yup.number().required('Tipo de produto é obrigatório'),
    price_net: yup.number().required('Preço líquido é obrigatório'),
    ipi: yup.number().required('IPI é obrigatório'),
    status: yup.boolean().required('Status é obrigatório'),
    slug: yup
      .string()
      .required('Slug é obrigatório')
      .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, 'Slug inválido. Deve conter pelo menos duas palavras separadas por hífen e começar com letras minúsculas. (produto-teste)'),
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
    items: yup
      .array(
        yup.string().required('Ao menos um item é obrigatório'),
      )
      .min(1)
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataForm) => {

    setLoader(true);

    try {

      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('product_code', data.product_code);
      formData.append('type_product', data.type_product.toString());
      formData.append('price_net', data.price_net.toString());
      formData.append('ipi', data.ipi.toString());
      formData.append('status', data.status.toString());
      formData.append('slug', data.slug);
      formData.append('file', data.file[0]);
      formData.append('items', JSON.stringify(services.filter(service => nameItem.includes(service.title))));

      const response = await ApiService.postWithFile('/products', formData);

      setLoader(false);

      if (response.status === 201) {
        Swal.fire({
          text: `Produto criado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result: SweetAlertResult) {
          router.push('/admin/products');
        });
      }

    } catch (error) {
      setLoader(false);
    }
  };

  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event: SelectChangeEvent<typeof nameItem>) => {
    const {
      target: { value },
    } = event;
    setNameItem(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Container>
      <HeaderAdmin />
      <Navigation />
      <ContainerCreate style={{ overflow: 'auto', marginBottom: '60px' }}>
        {loader ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Cadastrar produto</Typography>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '20px' }}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Título" fullWidth error={!!errors.title} helperText={errors.title?.message} />
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
                  name="product_code"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Código produto" fullWidth error={!!errors.product_code} helperText={errors.product_code?.message} />
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
                        <MenuItem value="0">Nacional</MenuItem>
                        <MenuItem value="1">Importado</MenuItem>
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
                  name="price_net"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Preço NET" fullWidth error={!!errors.price_net} helperText={errors.price_net?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="SLUG" fullWidth error={!!errors.slug} helperText={errors.slug?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="ipi"
                  control={control}
                  render={({ field }) => (
                    <TextField type="number"  {...field} label="IPI" fullWidth error={!!errors.ipi} helperText={errors.ipi?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
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
                <Controller
                  name="items"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type_product}>
                      <InputLabel>Itens adicionais</InputLabel>
                      <Select
                        multiple
                        {...field}
                        value={nameItem}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {services.map((service) => (
                          <MenuItem
                            key={service.id}
                            value={service.title}
                            style={getStyles(service.title, nameItem, theme)}
                          >
                            {service.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Typography variant="body2" color="error">
                  <>{errors?.items?.message}</>
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

  const response = await ApiService.get('/services');

  const services = response.data;

  return {
    props: { services },
  };
}
export default CreateProducts;
