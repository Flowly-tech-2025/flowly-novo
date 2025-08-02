// Script para gerenciar o banner de cookies
document.addEventListener('DOMContentLoaded', function() {
    // Criar elementos do banner de cookies e modal de configurações
    criarBannerCookies();
    criarModalConfiguracoes();
    
    // Verificar se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAceitos')) {
        // Mostrar o banner após 1 segundo
        setTimeout(function() {
            document.querySelector('.cookie-banner').classList.add('show');
        }, 1000);
    }
    
    // Adicionar event listeners aos botões
    document.querySelector('.cookie-btn-accept').addEventListener('click', function() {
        aceitarTodosCookies();
    });
    
    document.querySelector('.cookie-btn-settings').addEventListener('click', function() {
        abrirConfiguracoesCookies();
    });
    
    document.querySelector('.cookie-settings-save').addEventListener('click', function() {
        salvarConfiguracoesCookies();
    });
    
    document.querySelector('.cookie-settings-close').addEventListener('click', function() {
        fecharConfiguracoesCookies();
    });
});

// Função para criar o banner de cookies
// Função para criar o banner de cookies
function criarBannerCookies() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa <a href="#" onclick="showSection('privacidade')" style="color: #ff3e3e; text-decoration: underline;">Política de Privacidade</a>.</p>
        </div>
        <div class="cookie-buttons">
            <button class="cookie-btn cookie-btn-settings">Personalizar</button>
            <button class="cookie-btn cookie-btn-accept">Aceitar Todos</button>
        </div>
    `;
    document.body.appendChild(banner);
}

// Função para criar o modal de configurações de cookies
function criarModalConfiguracoes() {
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.innerHTML = `
        <div class="cookie-settings-content">
            <div class="cookie-settings-header">
                <h3>Configurações de Cookies</h3>
                <p>Você pode personalizar suas preferências de cookies abaixo. Por favor, note que desativar certos cookies pode afetar a funcionalidade do site.</p>
            </div>
            <div class="cookie-settings-options">
                <div class="cookie-settings-option">
                    <label>
                        <input type="checkbox" name="cookies-essenciais" checked disabled>
                        Cookies Essenciais
                    </label>
                    <p>Necessários para o funcionamento básico do site. Não podem ser desativados.</p>
                </div>
                <div class="cookie-settings-option">
                    <label>
                        <input type="checkbox" name="cookies-analiticos">
                        Cookies Analíticos
                    </label>
                    <p>Nos ajudam a entender como os visitantes interagem com o site.</p>
                </div>
                <div class="cookie-settings-option">
                    <label>
                        <input type="checkbox" name="cookies-marketing">
                        Cookies de Marketing
                    </label>
                    <p>Utilizados para exibir anúncios relevantes com base em seus interesses.</p>
                </div>
            </div>
            <div class="cookie-settings-footer">
                <button class="cookie-btn cookie-settings-close">Cancelar</button>
                <button class="cookie-btn cookie-btn-accept cookie-settings-save">Salvar Preferências</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Função para aceitar todos os cookies
function aceitarTodosCookies() {
    // Salvar preferências no localStorage
    const preferencias = {
        essenciais: true,
        analiticos: true,
        marketing: true,
        dataAceite: new Date().toISOString()
    };
    
    localStorage.setItem('cookiesAceitos', 'true');
    localStorage.setItem('preferenciaCookies', JSON.stringify(preferencias));
    
    // Fechar o banner
    document.querySelector('.cookie-banner').classList.remove('show');
}

// Função para abrir o modal de configurações
function abrirConfiguracoesCookies() {
    // Carregar preferências salvas (se existirem)
    if (localStorage.getItem('preferenciaCookies')) {
        const preferencias = JSON.parse(localStorage.getItem('preferenciaCookies'));
        document.querySelector('input[name="cookies-analiticos"]').checked = preferencias.analiticos;
        document.querySelector('input[name="cookies-marketing"]').checked = preferencias.marketing;
    }
    
    // Mostrar o modal
    document.querySelector('.cookie-settings-modal').classList.add('show');
}

// Função para salvar as configurações de cookies
function salvarConfiguracoesCookies() {
    // Obter valores dos checkboxes
    const analiticos = document.querySelector('input[name="cookies-analiticos"]').checked;
    const marketing = document.querySelector('input[name="cookies-marketing"]').checked;
    
    // Salvar preferências no localStorage
    const preferencias = {
        essenciais: true, // Sempre ativado
        analiticos: analiticos,
        marketing: marketing,
        dataAceite: new Date().toISOString()
    };
    
    localStorage.setItem('cookiesAceitos', 'true');
    localStorage.setItem('preferenciaCookies', JSON.stringify(preferencias));
    
    // Fechar o modal e o banner
    document.querySelector('.cookie-settings-modal').classList.remove('show');
    document.querySelector('.cookie-banner').classList.remove('show');
}

// Função para fechar o modal de configurações
function fecharConfiguracoesCookies() {
    document.querySelector('.cookie-settings-modal').classList.remove('show');
}