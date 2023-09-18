/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputMask from 'react-input-mask';

import ApiService from '../../services/api.service';

import { toast } from 'react-toastify';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { BsFillTrashFill } from "react-icons/bs";

import { Container, ContentHomeProducts, TitleEvent, ContentCart, Row, FooterForm, Submit, HeaderForm, FormCart, ItemCart, SpaceMeio, ContentActionsItem, ButtonRemove, ContainerCart, SpaceImage, ContentForm } from '../../pageStyles/cart/styles';
import { useRouter } from 'next/router';

import { useCart } from '../../contexts/CartContext';
import { useEffect } from 'react';
import { IProduct } from '../../types/ProductType';
import Swal from 'sweetalert2';
import { configHost } from '../../services/configHost';

interface FormValues {
  hotel: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  cnpj?: string;
  icms: boolean;
}

const CartUser: NextPage = () => {

  const router = useRouter();

  const { cart, countCart, totalPrice, removeFromCart, removeFromCartOneProduct, addToCart, setCart } = useCart();

  const schema = yup.object().shape({
    hotel: yup.string().required('Hotel name is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    state: yup.string().required('State is required'),
    cnpj: yup.string(),
    icms: yup.boolean().required('ICMS option is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error('Todos os campos são de preenchimento obrigatório.');
    }
  }, [errors])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {

      if (countCart === 0) {
        return Swal.fire({
          text: `É necessário selecionar ao menos um produto para realizar pedido.`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'error',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        })
      }

      const response = await ApiService.post('/orders', {
        ...data,
        orders: cart,
        icms: data.icms ? true : false
      });

      if (response.status === 201) {
        Swal.fire({
          text: `Pedido criado com sucesso`,
          showCancelButton: false,
          confirmButtonText: 'Fechar',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Fechar'
        }).then(async function (result) {

          setCart([]);

          router.push('/success');
        });
      }

    } catch (error) {
      Swal.fire({
        text: `Ocorreu algum erro ao realizar seu pedido. Tente novamente`,
        showCancelButton: false,
        confirmButtonText: 'Fechar',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Fechar'
      })
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 18/09/2023 - 22/09/2023</TitleEvent>
          <ContainerCart>
            <ContentCart>
              {countCart > 0 ? (
                cart?.map((item: IProduct) => {
                  return (
                    <ItemCart key={item.id}>
                      <SpaceImage>
                        <img src={`${configHost.host}${item.file_path}`} alt="image" />
                      </SpaceImage>
                      <SpaceMeio>
                        <span>{item.title}</span>

                        <div className='count'>
                          <div className='less' onClick={() => removeFromCartOneProduct(item?.id)}>-</div>
                          <div className='total'>{item?.quantity === null ? 1 : item?.quantity}</div>
                          <div className='more' onClick={() => addToCart(item)}>+</div>
                        </div>
                      </SpaceMeio>
                      <ContentActionsItem>
                        <ButtonRemove onClick={() => removeFromCart(item.id)}>
                          <BsFillTrashFill />
                        </ButtonRemove>
                      </ContentActionsItem>
                    </ItemCart>
                  )
                })
              ) : (
                <p>Seu carrinho esta vazio...</p>
              )}
            </ContentCart>
            <ContentForm>
              <HeaderForm>
                <span>Preencha os dados abaixo para solicitar orçamento.</span>
              </HeaderForm>
              <FormCart onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="hotel">Hotel</label>
                <input {...register('hotel')} disabled={countCart === 0} type="text" name="hotel" id="hotel" className={errors.hotel && 'error'} />

                <label htmlFor="name">Nome</label>
                <input {...register('name')} disabled={countCart === 0} type="text" name="name" id="name" className={errors.name && 'error'} />

                <label htmlFor="email">Email</label>
                <input {...register('email')} disabled={countCart === 0} type="text" name="email" id="email" className={errors.email && 'error'} />
                <Row>
                  <div>
                    <label htmlFor="phone">Celular</label>
                    <InputMask  {...register('phone')} disabled={countCart === 0} mask="(99) 99999-9999" placeholder="(00) 00000-0000" name="phone" id="phone" className={errors.phone && 'error'} />
                  </div>
                  <div>
                    <label htmlFor="state">Estado</label>
                    <select id="state" {...register('state')} disabled={countCart === 0} className={errors.state && 'error'}>
                      <option value="">Selecione um estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </Row>
                <Row>
                  <div>
                    <label htmlFor="cnpj">CNPJ</label>
                    <InputMask {...register('cnpj')} disabled={countCart === 0} mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" name="cnpj" id="cnpj" className={errors.cnpj && 'error'} />

                  </div>
                  <div>
                    <label htmlFor="icms">Contribuinte ICMS?</label>
                    <select {...register('icms')} id="icms" name="icms" disabled={countCart === 0} className={errors.icms && 'error'}>
                      <option value="null">Selecione</option>
                      <option value="1">SIM</option>
                      <option value="0">NAO</option>
                    </select>
                  </div>
                </Row>
                <FooterForm>
                  <Submit type='submit' disabled={countCart === 0}>Enviar</Submit>
                </FooterForm>
              </FormCart>
            </ContentForm>
          </ContainerCart>
        </ContentHomeProducts>
      </Container >
      <Footer />
    </>
  )
}

export default CartUser
