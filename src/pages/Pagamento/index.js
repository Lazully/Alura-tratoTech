import Header from 'components/Header'
import styles from './Pagamento.module.scss'
import Select from 'components/Select'
import Button from 'components/Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { carregarPagamento } from 'store/reducers/carrinho'

export default function Pagamento() {
    const [formaDePagamento, setFormaDePagamento] = useState('-');
    const dispatch = useDispatch();
    const usuario = useSelector(state => state.usuario);
    const total = useSelector(state => state.carrinho.total);
    const valorTotal = formaDePagamento === '-' ? total : total * formaDePagamento.taxa

    console.log('Usuário carregado:', usuario);

    function mudarFormaDePagamento(evento) {
        if (evento.target.value === '-') return setFormaDePagamento('-');

        setFormaDePagamento(usuario.cartoes.find(cartao => cartao.id === evento.target.value));
    }

    useEffect(() => {
        dispatch(carregarPagamento())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Header titulo='Pagamento' />
            <div className={styles.dados}>
                <p className={styles.forma}> Olá {usuario.nome}! Escolha a sua forma de pagamento: </p>
                <Select value={formaDePagamento.id} onChange={mudarFormaDePagamento} placeholder='Forma de pagamento' alt='Forma de pagamento'>
                    <option value='-'> Forma de Pagamento </option>
                    {usuario.cartoes?.map(cartao => (
                        <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
                    ))}
                </Select>
                <div className={styles.content}>
                    {formaDePagamento !== '-' && (
                        <>
                            <p>A forma de pagamento {formaDePagamento.nome} tem taxa de {formaDePagamento.taxa}x</p>
                            <p>O saldo deste cartão é de R$ {formaDePagamento.saldo.toFixed(2)} </p>
                        </>
                    )}
                    <p> Total com taxas: R$ {valorTotal.toFixed(2)}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button> Finalizar Compra </Button>
                </div>
            </div>
        </div>

    )
}