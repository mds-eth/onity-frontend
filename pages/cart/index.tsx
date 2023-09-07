import type { NextPage } from 'next'

import Image from 'next/image';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputMask from 'react-input-mask';

import { toast } from 'react-toastify';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { BsFillTrashFill } from "react-icons/bs";

import { Container, ContentHomeProducts, TitleEvent, ContentCart, Row, FooterForm, Submit, HeaderForm, FormCart, ItemCart, SpaceMeio, ContentActionsItem, ButtonRemove, ContainerCart, SpaceImage, ContentForm } from './styles';
import { useRouter } from 'next/router';

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';
import { useCart } from '../../contexts/CartContext';
import { formatCoinBR } from '../../utils/Utils';
import { useEffect } from 'react';
import { ICart } from '../../types/CartType';

interface FormValues {
  hotel: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  cnpj: string;
  icms: string;
}

const CartUser: NextPage = () => {

  const router = useRouter();

  const { cart, countCart, totalPrice, removeFromCart, removeFromCartOneProduct, addToCart } = useCart();

  const schema = yup.object().shape({
    hotel: yup.string().required('Hotel name is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    state: yup.string().required('State is required'),
    cnpj: yup.string().required('CNPJ is required'),
    icms: yup.string().required('ICMS option is required'),
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {

    router.push('/success');
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
                cart?.map((item: ICart) => {
                  return (
                    <ItemCart key={item.id}>
                      <SpaceImage>
                        <Image src={AdvanceTrillium} alt="image" />
                      </SpaceImage>
                      <SpaceMeio>
                        <span>{formatCoinBR(item.price)}</span>
                        <span>{item.title}</span>
                      </SpaceMeio>
                      <SpaceMeio className='count'>
                        <div className='less' onClick={() => removeFromCartOneProduct(item?.id)}>-</div>
                        <div className='total'>{item?.quantity === null ? 1 : item?.quantity}</div>
                        <div className='more' onClick={() => addToCart(item)}>+</div>
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
                    <input {...register('state')} disabled={countCart === 0} type="text" name="state" id="state" className={errors.state && 'error'} />
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
                  <span>Valor total: <b>{formatCoinBR(totalPrice)}</b></span>
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
