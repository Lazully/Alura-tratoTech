import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itensService from 'services/itens';
import { v4 as uuid } from 'uuid';

const { toast } = createStandaloneToast();

export const buscarItens = createAsyncThunk(
    'itens/buscar',
    itensService.buscar
)

const itensSlice = createSlice({
    name: 'itens',
    initialState: [],
    reducers: {
        mudarFavorito: (state, { payload }) => {
            state.map(item => {
                if (item.id === payload) item.favorito = !item.favorito;
                return item;
            })
        },
        cadastrarItem: (state, { payload }) => {
            state.push({ ...payload, id: uuid() });
        },
        mudarItem: (state, { payload }) => {
            const index = state.findIndex(item => item.id === payload.id);
            Object.assign(state[index], payload.item);
        },
        deletarItem: (state, { payload }) => {
            const index = state.findIndex(item => item.id === payload);
            state.splice(index, 1);
        },
        adicionarItens: (state, {payload}) => {
            state.push(...payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(
            buscarItens.fulfilled,
            (state, { payload }) => {
                toast({
                    title: 'Sucesso',
                    description: 'Itens carregados com sucesso!',
                    status: 'success',
                    duration: 5000,
                    icClosable: true
                })
                return payload;
            }
        )
            .addCase(
                buscarItens.pending,
                (state, { payload }) => {
                    toast({
                        title: 'Carregando',
                        description: 'Itens sendo carregadas',
                        status: 'loading',
                        duration: 1000,
                        icClosable: true
                    })
                }
            )
            .addCase(
                buscarItens.rejected,
                (state, { payload }) => {
                    toast({
                        title: 'Erro',
                        description: 'Erro ao carregar itens',
                        status: 'error',
                        duration: 2000,
                        icClosable: true
                    })
                }
            )
    }
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem, adicionarItens } = itensSlice.actions;

export default itensSlice.reducer;