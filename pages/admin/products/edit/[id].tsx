/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";

import nookies from 'nookies';

import ApiService from '../../../../services/api.service';

import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Theme, SelectChangeEvent, OutlinedInput, Box, Chip, useTheme } from '@mui/material';

import { HeaderAdmin } from "../../../../components/Admin/Header";

import { Container, ContainerCreate } from "../../../../pageStyles/admin/products/styles";

import Navigation from "../../../../components/Admin/Navigation";
import { useRouter } from "next/router";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "../../../../components/Loader";
import Swal, { SweetAlertResult } from "sweetalert2";
import { urlToFiles } from "../../../../utils/Utils";
import { IServices } from "../../../../types/ServiceType";

interface IDataForm {
  id?: number;
  title: string;
  product_code: string;
  type_product: number;
  price_net: number;
  status: boolean;
  slug: string;
  ipi: number;
  file: any;
  file_path?: string;
  created_at?: string;
  updated_at?: string;
  items?: String[],
}

interface IProductProps {
  product: IDataForm;
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


const EditProducts: NextPage<IProductProps> = ({ product, services }) => {
  const theme = useTheme();

  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [nameItem, setNameItem] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(product?.file_path);
  const [editFile, setEditFile] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(product.items) && Array.isArray(services)) {
      const updatedNameItem = product.items.map((item: any) => {
        const service = services.find((service) => service.id === item.id);

        if (service) {
          return service.title;
        }
        return ''
      });
      setNameItem(updatedNameItem);
    }
  }, [product.items, services]);

  const schema = yup.object().shape({
    title: yup.string().required('Título é obrigatório'),
    product_code: yup.string().required('Código do produto é obrigatório'),
    type_product: yup.number().required('Tipo de produto é obrigatório'),
    price_net: yup.number().required('Preço líquido é obrigatório'),
    status: yup.boolean().required('Status é obrigatório'),
    slug: yup.string().required('Slug é obrigatório'),
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
  });

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<IDataForm>({
    resolver: yupResolver(schema) as any,
    defaultValues: product
  });

  useEffect(() => {
    urlToFiles(`${process.env.NEXT_PUBLIC_API_BACKEND}${product.file_path}`)
      .then(files => {
        product.file = files

        reset(product);
      })
      .catch(error => {
        console.error('Erro ao criar o FileList:', error);
      });
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setEditFile(true);
    }
  };

  const onSubmit = async (data: IDataForm) => {

    try {

      if (services.filter(service => nameItem.includes(service.title)).length === 0) {
        return Swal.fire({
          title: 'Atenção!',
          text: 'Informe ao menos um item adicional.',
          icon: 'warning',
          confirmButtonText: 'Fechar'
        });
      }

      setLoader(true);

      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('product_code', data.product_code);
      formData.append('type_product', data.type_product.toString());
      formData.append('price_net', data.price_net.toString());
      formData.append('status', data.status.toString());
      formData.append('ipi', data.ipi.toString());
      formData.append('slug', data.slug);
      formData.append('file', data.file[0]);
      formData.append('file_change', String(editFile));
      formData.append('items', JSON.stringify(services.filter(service => nameItem.includes(service.title))));

      const response = await ApiService.putWithFile(`/products/${product.id}`, formData);

      setLoader(false);

      if (response.status === 200) {
        Swal.fire({
          text: `Produto editado com sucesso`,
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
      <ContainerCreate>
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
                  onChange={handleFileChange}
                />
                {editFile ? (
                  <img src={selectedImage} alt="imagem front" width={100} height={100} />
                ) : (
                  <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}${product?.file_path}`} alt="imagem evento" width={100} height={100} />
                )}
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

  const { res, query } = ctx;

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

  const { id } = query;

  const [responseService, responseProduct] = await Promise.all([
    ApiService.get('/services'),
    ApiService.get(`/products/id/${id}`)
  ])

  const services = responseService.data;
  const product = responseProduct.data;

  return {
    props: { services, product },
  };
}

export default EditProducts;
