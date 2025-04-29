document.addEventListener('DOMContentLoaded', function () {
    const botaoAbrirModal = document.getElementById('abrirModalCadastro');
    const modalCadastro = document.getElementById('modalCadastro');
    // Não precisamos mais do botaoFecharModal aqui se estamos usando data-dismiss="modal"

    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');

    if (botaoAbrirModal && modalCadastro && nomeInput && telefoneInput && cpfInput && cepInput && ruaInput && bairroInput) {
        botaoAbrirModal.addEventListener('click', function () {
            // Usando a função do Bootstrap para mostrar o modal
            const modal = new bootstrap.Modal(modalCadastro);
            modal.show();
        });

        // Evento para formatar o nome (primeira letra de cada palavra em maiúsculo)
        nomeInput.addEventListener('input', function () {
            this.value = this.value.replace(/(?:^|\s)\S/g, c => c.toUpperCase());
        });

        // Evento para formatar o telefone
        telefoneInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            if (value.length > 9) {
                value = value.substring(0, 10) + '-' + value.substring(10);
            }
            this.value = value;
        });

        // Evento para formatar o CPF
        cpfInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 3) {
                value = value.substring(0, 3) + '.' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + '.' + value.substring(7);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + '-' + value.substring(11);
            }
            this.value = value;
        });

        // Evento para buscar o endereço pelo CEP
        cepInput.addEventListener('blur', function () {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            ruaInput.value = data.logradouro;
                            bairroInput.value = data.bairro;
                            // Você pode adicionar lógica para preencher outros campos se necessário
                        } else {
                            alert('CEP não encontrado.');
                            ruaInput.value = '';
                            bairroInput.value = '';
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                        alert('Erro ao buscar CEP. Tente novamente.');
                    });
            } else if (cep.length > 0) {
                alert('CEP inválido. Digite um CEP com 8 dígitos.');
                ruaInput.value = '';
                bairroInput.value = '';
            }
        });

        // Removendo a manipulação direta de display, o Bootstrap cuida disso
        // const botaoFecharModal = modalCadastro.querySelector('[data-dismiss="modal"]');
        // if (botaoFecharModal) {
        //     botaoFecharModal.addEventListener('click', function () {
        //         modalCadastro.style.display = 'none';
        //     });
        // }

        // Removendo a lógica de fechar o modal ao clicar fora, o Bootstrap cuida disso
        // window.addEventListener('click', function (event) {
        //     if (event.target === modalCadastro) {
        //         modalCadastro.style.display = 'none';
        //     }
        // });

    } else {
        console.error('Um ou mais elementos do formulário de cadastro não foram encontrados no DOM.');
    }
});