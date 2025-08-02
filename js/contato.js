// Arquivo JavaScript para o formulário de contato

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Função para validar o formato do email
        function validarEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Função para validar o formato do telefone
        function validarTelefone(telefone) {
            // Aceita formatos como (00) 00000-0000 ou 00 00000-0000 ou 0000000000
            const re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
            return telefone === '' || re.test(telefone); // Telefone é opcional
        }
        
        // Função para mostrar mensagem de erro
        function mostrarErro(elemento, mensagem) {
            const formGroup = elemento.parentElement;
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = mensagem;
            
            // Remove mensagens de erro anteriores
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                formGroup.removeChild(existingError);
            }
            
            formGroup.appendChild(errorMessage);
            elemento.classList.add('input-error');
        }
        
        // Função para remover mensagem de erro
        function removerErro(elemento) {
            const formGroup = elemento.parentElement;
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                formGroup.removeChild(existingError);
            }
            elemento.classList.remove('input-error');
        }
        
        // Adiciona estilos CSS para mensagens de erro
        const style = document.createElement('style');
        style.textContent = `
            .error-message {
                color: #ff6b6b;
                font-size: 0.85rem;
                margin-top: 5px;
                font-weight: 500;
            }
            
            .input-error {
                border: 2px solid #ff6b6b !important;
            }
            
            .form-success {
                background-color: rgba(0, 128, 0, 0.8);
                color: white;
                padding: 15px;
                border-radius: 5px;
                text-align: center;
                margin-bottom: 20px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
        
        // Validação em tempo real para o campo de email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validarEmail(this.value)) {
                    mostrarErro(this, 'Por favor, insira um email válido.');
                } else {
                    removerErro(this);
                }
            });
        }
        
        // Validação em tempo real para o campo de telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('blur', function() {
                if (this.value && !validarTelefone(this.value)) {
                    mostrarErro(this, 'Por favor, insira um telefone válido no formato (00) 00000-0000.');
                } else {
                    removerErro(this);
                }
            });
            
            // Máscara para o campo de telefone
            telefoneInput.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 2) {
                        this.value = `(${value}`;
                    } else if (value.length <= 7) {
                        this.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                    } else {
                        this.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                    }
                }
            });
        }
        
        // Manipulador de envio do formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValido = true;
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');
            
            // Validar nome
            if (!nome.value.trim()) {
                mostrarErro(nome, 'Por favor, insira seu nome.');
                formValido = false;
            } else {
                removerErro(nome);
            }
            
            // Validar email
            if (!email.value.trim()) {
                mostrarErro(email, 'Por favor, insira seu email.');
                formValido = false;
            } else if (!validarEmail(email.value)) {
                mostrarErro(email, 'Por favor, insira um email válido.');
                formValido = false;
            } else {
                removerErro(email);
            }
            
            // Validar telefone (opcional)
            if (telefone.value && !validarTelefone(telefone.value)) {
                mostrarErro(telefone, 'Por favor, insira um telefone válido no formato (00) 00000-0000.');
                formValido = false;
            } else {
                removerErro(telefone);
            }
            
            // Validar mensagem
            if (!mensagem.value.trim()) {
                mostrarErro(mensagem, 'Por favor, insira sua mensagem.');
                formValido = false;
            } else {
                removerErro(mensagem);
            }
            
            // Se o formulário for válido, exibe mensagem de sucesso
            if (formValido) {
                // Remover mensagem de sucesso anterior, se existir
                const existingSuccess = document.querySelector('.form-success');
                if (existingSuccess) {
                    existingSuccess.remove();
                }
                
                // Criar e exibir mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Inserir mensagem antes do formulário
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Limpar o formulário
                contactForm.reset();
                
                // Rolar para o topo da seção de contato
                document.querySelector('.contact-section').scrollTop = 0;
                
                // Remover a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
});