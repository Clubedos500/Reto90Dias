# Como Configurar o Firebase e Obter a API Key

Para que o login funcione, você precisa criar um projeto gratuito no Google Firebase. Siga os passos abaixo:

## 1. Criar o Projeto

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Clique em **"Adicionar projeto"** (ou "Create a project").
3. Dê um nome ao projeto (ex: `SoloLevelingSystem`) e continue.
4. Desative o Google Analytics (não é necessário agora) e clique em **"Criar projeto"**.

## 2. Registrar o App Web

1. Na tela inicial do projeto, clique no ícone de **Web** (parece com `</>`).
2. Dê um apelido para o app (ex: `SystemApp`) e clique em **"Registrar app"**.
3. **IMPORTANTE**: Vai aparecer um código com `const firebaseConfig = { ... }`.
4. Copie apenas o conteúdo de dentro das chaves `{ ... }` (apiKey, authDomain, etc).

## 3. Colocar as Chaves no Código

1. Abra o arquivo `solo-leveling-system/js/firebase-config.js` no seu computador.
2. Substitua os valores de exemplo pelas chaves que você copiou.

## 4. Ativar o Login (Authentication)

1. No menu lateral esquerdo do Firebase, clique em **"Criação"** > **"Authentication"**.
2. Clique em **"Vamos começar"**.
3. Na aba **"Sign-in method"**, ative:
   - **E-mail/Senha**: Clique, ative e salve.
   - **Google**: Clique, ative, escolha seu e-mail de suporte e salve.

## 5. Ativar o Banco de Dados (Firestore)

1. No menu lateral, clique em **"Criação"** > **"Firestore Database"**.
2. Clique em **"Criar banco de dados"**.
3. Escolha o local (pode ser o padrão).
4. **IMPORTANTE**: Escolha **"Iniciar no modo de teste"** (Start in test mode) para facilitar o desenvolvimento inicial.
5. Clique em **"Criar"**.

Pronto! Agora seu app tem permissão para logar e salvar dados.
