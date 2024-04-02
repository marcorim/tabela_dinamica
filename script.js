import UserModel from '../core/user_model.js';

let users = [];
let userModalElement ;

(async () => {
    await getUsers();
    montarHmltPagina();
})();

async function getUsers() {
    try {
        const userModel = new UserModel();
        users = await userModel.fetchAll();
    } catch (error) {
        console.error(error.message);
    }
}

function montarHmltPagina() {
    const table = document.getElementById('table');

    const tableResult = users.map((user, index) => {
        return `<tr>
            <td>${user.nome}</td>
            <td>${user.cidade}</td>
            <td>${user.login}</td>
            <td>
                <button class="btn btn-success" onclick="abrirModalEditar('${index}')">
                    <i class="bi bi-plus-circle"></i> Editar
                </button>
                <a href="#" class="btn btn-danger" onclick="removerUsuario('${user.login}')">
                    <i class="bi bi-trash"></i> Remover
                </a>
            </td>
        </tr>`;
    }).join('');

    const html = `<table class="table table-striped">
        <caption>Resultado da consulta</caption>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Login</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${tableResult}
        </tbody>
    </table>   
    `;

    table.innerHTML = html;
   }
   
   function abrirModalEditar(index) {
        const user = users[index];
        console.log(user);

        const html = `
        <div class="modal" tabindex="-1" id="modalEditar">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="userform">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                    </form>
                </div>
            </div>
        </div>
        `;

        document.querySelector('#modalEditarUsuario').innerHTML = html;
        userModalElement = new bootstrap.Modal(document.getElementById('modalEditar'));
		userModalElement.show();
   }

   function editarUsuario(login) {
       console.log(`Editar usuário - ${login}`);
   }
   
   function removerUsuario(login) {
        console.log(`excluir usuário - ${login}`);
   }

   function adicionarUsuario() {
    console.log('Adicionar usuário');
   }


   // Exportando as funções para o escopo global
window.abrirModalEditar = abrirModalEditar;
window.editarUsuario = editarUsuario;
window.removerUsuario = removerUsuario;
window.adicionarUsuario = adicionarUsuario;

// const result = [
   // Monalisa_Atsoc
    //     {name: 'Marcelo', age: 37},
    //     {name: 'Pamella', age: 40},
    //     {name: 'Mariana', age: 10},
    //     {name: 'Natalia', age: 5},
    // ];

    // const tableResult = result.map((e) => {
    //     return `<tr>
    //         <td>${e.name}</td>
    //         <td>${e.age}</td>
    //     </tr>`;
    // }).join('');