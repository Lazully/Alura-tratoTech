import instance from "commom/config/api"

const usuariosService = {
    buscarPorId: async (id) =>  {
        const resposta = await instance.get(`/usuarios/${id}`);

        return resposta.data;
    }
}

export default usuariosService;