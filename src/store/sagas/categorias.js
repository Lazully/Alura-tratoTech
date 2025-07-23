import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { adicionarTodasAsCategorias, carregarCategorias } from 'store/reducers/categorias';
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriasService from 'services/categorias';

const { toast } = createStandaloneToast();

function* observarCategorias() {
    toast({
        title: 'Carregando',
        description: 'Categorias sendo carregadas',
        status: 'loading',
        duration: 1000,
        icClosable: true
    });
    try {
        yield delay(1000);
        const categorias = yield call(categoriasService.buscar);
        yield put(adicionarTodasAsCategorias(categorias)); 
        toast({
            title: 'Sucesso!',
            description: 'Categorias carregadas com sucesso',
            status: 'success',
            duration: 2000,
            icClosable: true
        });
    } catch (erro) {
        toast({
            title: 'Erro',
            description: 'Erro na busca de categorias',
            status: 'error',
            duration: 2000,
            icClosable: true
        });
    }
}

export function* categoriasSaga() {
    const tarefa = yield takeLatest(carregarCategorias, observarCategorias);
    yield takeLatest(adicionarTodasAsCategorias, () => tarefa.cancel);
}