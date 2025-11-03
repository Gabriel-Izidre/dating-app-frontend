# Dating App Frontend

Frontend em **Angular 17**, **TypeScript**, **SCSS** e **RxJS** para um aplicativo de encontros moderno e responsivo.

---

## Requisitos

-   Node.js 18+
-   npm
-   Angular CLI 17+

---

## Instalação

```bash
npm install
```

---

## Inicialização

```bash
ng serve
```

O aplicativo será iniciado em `http://localhost:4200/` com hot reload automático.

---

## Tecnologias utilizadas

-   **Angular 17**: Framework principal com componentes standalone
-   **TypeScript**: Linguagem tipada para JavaScript
-   **SCSS**: Pré-processador CSS para estilização avançada
-   **RxJS**: Programação reativa para gerenciamento de estado
-   **Font Awesome**: Ícones para interface moderna
-   **Angular Router**: Navegação entre páginas
-   **Reactive Forms**: Formulários reativos com validação

---

## Funcionalidades

-   ✅ Autenticação (login/registro)
-   ✅ Sistema de swipe (like/dislike)
-   ✅ Visualização de perfis sugeridos
-   ✅ Sistema de matches
-   ✅ Upload de fotos de perfil
-   ✅ Seleção de interesses
-   ✅ Navegação com bottom navbar
-   ✅ Design responsivo e moderno

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/              # Páginas principais
│   ├── services/           # Serviços para API
│   ├── interfaces/         # Interfaces TypeScript
│   ├── guards/             # Guards de autenticação
│   └── interceptors/       # Interceptors HTTP
├── assets/                 # Recursos estáticos
└── environments/           # Configurações de ambiente
```

---

## Scripts disponíveis

-   `ng serve`: Inicia o servidor de desenvolvimento
-   `ng build`: Build para produção
-   `ng test`: Executa testes unitários
-   `ng lint`: Verifica qualidade do código

---

## Configuração do ambiente

O projeto está configurado para se conectar com o backend em `http://localhost:3000`. Para alterar, edite o arquivo `src/environments/environment.development.ts`.

---

## Autor

Gabriel Izidre e Costa | RA: 194629

---
