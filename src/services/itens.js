import instance from 'commom/config/api';

const itensService = {
    buscar: async () => {
        const resposta = await instance.get('/itens');

        return resposta.data;
    },
    buscarDeCategorias: async (nomeCategoria) => {
        const resposta = await instance.get(`/itens?categoria=${nomeCategoria}`);

        return resposta.data;
    }
}

export default itensService;