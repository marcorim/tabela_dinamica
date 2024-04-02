const url = 'https://randomuser.me/api/';

async function getAllUser() {
    const response = await fetch(url + "?results=10");

    // Verifica se a resposta da API é bem-sucedida (status 200)
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }

    const user = await response.json(); 
    return user.results;
}

export {getAllUser};