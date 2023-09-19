/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import type { NextPage } from 'next'

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputMask from 'react-input-mask';

import ApiService from '../../services/api.service';

import { toast } from 'react-toastify';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import { Container, ContentHomeProducts, ContentCart, Row, FooterForm, Submit, HeaderForm, FormCart, ItemCart, SpaceMeio, ContentActionsItem, ButtonRemove, ContainerCart, SpaceImage, ContentForm } from '../../pageStyles/cart/styles';
import { useRouter } from 'next/router';

import { useCart } from '../../contexts/CartContext';

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
  terms: boolean;
}

const CartUser: NextPage = () => {

  const router = useRouter();

  const [inputValues, setInputValues] = useState<any>({});


  const { cart, countCart, removeFromCart, removeFromCartOneProduct, addToCart, setCart } = useCart();

  const schema = yup.object().shape({
    hotel: yup.string().required('Hotel name is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    state: yup.string().required('State is required'),
    cnpj: yup.string(),
    icms: yup.boolean().required('ICMS option is required'),
    terms: yup.boolean().required('terms is required'),
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

      if (!data.terms) {
        return Swal.fire({
          text: `É necessário aceitar os termos de uso para prosseguir com orçamento.`,
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

  const handleChangeQuantityValue = (event: any, item: IProduct) => {

    const newValue = event.target.value;

    addToCart(item, parseInt(newValue))

    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      [item.id]: newValue,
    }));
  };

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <ContainerCart>
            <h2>Solicitar Orçamento</h2>
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
                        <ButtonRemove onClick={() => removeFromCart(item.id)}>
                          <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 0.923077V2.46154H8V0.923077H4ZM8.92308 2.46154V0.830769C8.92308 0.371962 8.55116 0 8.09231 0H3.90769C3.44887 0 3.07692 0.371948 3.07692 0.830769V2.46154H0.461538C0.206638 2.46154 0 2.66818 0 2.92308C0 3.17798 0.206638 3.38462 0.461538 3.38462H11.5385C11.7934 3.38462 12 3.17798 12 2.92308C12 2.66818 11.7934 2.46154 11.5385 2.46154H8.92308ZM1.69231 4.92308C1.94721 4.92308 2.15385 5.12971 2.15385 5.38461V11.0769H9.84615V5.38461C9.84615 5.12971 10.0528 4.92308 10.3077 4.92308C10.5626 4.92308 10.7692 5.12971 10.7692 5.38461V11.1692C10.7692 11.6281 10.3973 12 9.93846 12H2.06154C1.60273 12 1.23077 11.6281 1.23077 11.1692V5.38461C1.23077 5.12971 1.43741 4.92308 1.69231 4.92308ZM4.76923 4.92308C5.02413 4.92308 5.23077 5.12971 5.23077 5.38461V9.07692C5.23077 9.33182 5.02413 9.53846 4.76923 9.53846C4.51433 9.53846 4.30769 9.33182 4.30769 9.07692V5.38461C4.30769 5.12971 4.51433 4.92308 4.76923 4.92308ZM7.23077 4.92308C7.48567 4.92308 7.69231 5.12971 7.69231 5.38461V9.07692C7.69231 9.33182 7.48567 9.53846 7.23077 9.53846C6.97587 9.53846 6.76923 9.33182 6.76923 9.07692V5.38461C6.76923 5.12971 6.97587 4.92308 7.23077 4.92308Z" fill="#0095D6" />
                          </svg>
                          <span>Excluir</span>
                        </ButtonRemove>

                      </SpaceMeio>
                      <ContentActionsItem>
                        <div className='count'>
                          <div className='less' onClick={() => removeFromCartOneProduct(item?.id)}>-</div>
                          <input onChange={(event) => handleChangeQuantityValue(event, item)} name={`input-${item.id}`} className='total' id='value' type="tel" value={inputValues[item.id] || item.quantity} />
                          <div className='more' onClick={() => addToCart(item, item.quantity + 1)}>+</div>
                        </div>
                      </ContentActionsItem>
                    </ItemCart>
                  )
                })
              ) : (
                <p>Seu carrinho esta vazio...</p>
              )}
            </ContentCart>
            <h2 style={{ marginTop: '30px' }}>Preencha seus dados</h2>
            <ContentForm>
              <FormCart onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <div>
                    <label htmlFor="name">Nome</label>
                    <input {...register('name')} disabled={countCart === 0} type="text" name="name" id="name" className={errors.name && 'error'} />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input {...register('email')} disabled={countCart === 0} type="text" name="email" id="email" className={errors.email && 'error'} />
                  </div>
                </Row>
                <Row>
                  <div>
                    <label htmlFor="hotel">Hotel</label>
                    <input {...register('hotel')} disabled={countCart === 0} type="text" name="hotel" id="hotel" className={errors.hotel && 'error'} />
                  </div>
                  <div>
                    <label htmlFor="cnpj">CNPJ</label>
                    <InputMask {...register('cnpj')} disabled={countCart === 0} mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" name="cnpj" id="cnpj" className={errors.cnpj && 'error'} />
                  </div>
                </Row>
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
                    <label htmlFor="icms">Contribuinte ICMS?</label>
                    <select {...register('icms')} id="icms" name="icms" disabled={countCart === 0} className={errors.icms && 'error'}>
                      <option value="null">Selecione</option>
                      <option value="1">SIM</option>
                      <option value="0">NAO</option>
                    </select>
                  </div>
                  <div className='terms'>
                    <label className='label-terms' htmlFor="terms">Eu aceito os Termos e Condições de envio dos meus dados</label>
                    <input disabled={countCart === 0} {...register('terms')} type="checkbox" name="terms" id="terms" className={errors.terms && 'error'} />
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
