import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { adicionarUmaCategorias, carregarUmaCategoria } from "store/reducers/categorias";
import criarTarefa from "./utils/criarTarefa";

export const categoriasListener = createListenerMiddleware();

categoriasListener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
        const { categorias } = getState();
        const nomeCategoria = action.payload;
        const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria);

        if(categoriaCarregada) return;
        if(categorias.lenght === 5) return unsubscribe()/

        await criarTarefa({
            fork,
            dispatch,
            action: adicionarUmaCategorias,
            busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
            textoCarregando: `Carregando categoria ${nomeCategoria}`,
            textoSucesso: `Categorias ${nomeCategoria} carregada com sucesso`,
            textoErro: `Erro na busca de categoria ${nomeCategoria}`,
        });
    }
})