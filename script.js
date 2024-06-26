import UserModel from '../core/user_model.js';

let users = [];
let userModalElement ;

const htmlModal = `
<div class="modal" tabindex="-1" id="showModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="userform">
                <div class="modal-header">
                    <h5 id="titulo-modal" class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div class="modal-body">
                    <div class="mb-3">
                        <label>Nome</label>
                        <input type="text" name="nome" id="nome" class="form-control" value=""/>
                    </div>
                    <div class="mb-3">
                        <label>Cidade</label>
                        <input type="text" name="cidade" id="cidade" class="form-control" value=""/>
                    </div>
                    <div class="mb-3">
                        <label>login</label>
                        <input type="text" name="login" id="login" class="form-control" value=""/>
                    </div>
                 </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" id="confirmar" class="btn btn-primary">Confirmar</button>
                </div>
            </form>
        </div>
    </div>
</div>
`;

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
                <button class="btn btn-success" onclick="modalEditarUsuario('${index}')">
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
   
   function modalAdicionarUsuario() {
        document.querySelector('#modalUsuario').innerHTML = htmlModal;
        document.getElementById('titulo-modal').innerHTML = `Adicionar usuário`;

        showModal();
   }

   function modalEditarUsuario(index) {
        const user = users[index];
        console.log(user);

        document.querySelector('#modalUsuario').innerHTML = htmlModal;
        document.getElementById('titulo-modal').innerHTML = `Editar usuário`;

        document.getElementById('nome').value = `${user.nome}`;
        document.getElementById('cidade').value = `${user.cidade}`;
        document.getElementById('login').value = `${user.login}`;

        document.getElementById('confirmar').addEventListener('click', function() {
            users[index].nome = document.getElementById('nome').value;
            users[index].cidade = document.getElementById('cidade').value;
            users[index].login = document.getElementById('login').value;

            document.getElementById('table').innerHTML = '';
            montarHmltPagina();

            userModalElement.hide();
        });
        
        showModal();
   }

   function showModal() {
        userModalElement = new bootstrap.Modal(document.getElementById('showModal'));
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
window.modalEditarUsuario = modalEditarUsuario;
window.editarUsuario = editarUsuario;
window.removerUsuario = removerUsuario;
window.modalAdicionarUsuario = modalAdicionarUsuario;

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