# 📱 App de Livros - React Native + Expo

Aplicativo mobile para gerenciar um cadastro de livros com CRUD completo.

## Tecnologias
- React Native
- Expo SDK 54
- React Navigation

## Como rodar

### 1. Clone o repositório
```bash
git clone https://github.com/ferreirajsx/app-livros-novo.git
cd app-livros-novo
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o IP do backend
Abra `src/config/api.js` e troque pelo IP da sua máquina:
```js
const API_URL = "http://SEU_IP:3000";
```

### 4. Inicie o app
```bash
npx expo start --lan --no-dev
```
Escaneia o QR code com o Expo Go no celular.

## Funcionalidades
- Listar livros
- Cadastrar livro
- Editar livro
- Deletar livro