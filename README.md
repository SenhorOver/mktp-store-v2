
# Projeto MKTP Store

O Projeto MKTP Store é um website criado utilizando Next js que gerencia tanto o frontent quanto o backend

## Overview

- Projeto para simular um site de compra e venda entre usuários
- Formidable para o gerenciamento de imagens
- Formik + yup para o gerenciamento de formulários
- Next-auth para o gerenciamento do Login
- API integrada ao Next
    - API completa com requisições GET, POST, PUT, DELETE

## Stack utilizada

**Front-end:** React, Next js, MUI, yup, Formik, slugify, react-dropzone, react-material-ui-carousel

**Back-end:** Next js, Next-auth, NextConnect, MongoDB (mongoose), Formidable, bcrypt


## Páginas

- Página Inicial ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Home%20Page.png)
Tela principal que exibe 6 anúncios que estão na base de dados, com uma barra de pesquisa funcional que busca o texto digitado em títulos e descrição de anúncios


- Página de Busca ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Search.png)
Página que recebe como query o termo digitado e procura no db os anúncio e retorna para a tela - (Não fiz sistema de páginas pois esse é um projeto simples)


- Página de Login ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Login.png)
Página em que é possível fazer login pelo próprio site ou pelo google - Não é possível acessar caso já esteja logado


- Página de Registro ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Register.png)
Página para se registrar no sistema caso não tenha conta - Não é possível acessar caso já esteja logado


- Página de Publicar Anúncio ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Publish.png)
*Página para publicação de anúncio com validação feita utilizando Formik + yup - Não é possível acessar sem conta


- Página de Edição de Anúncio ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Edit%20Product.png)
*Página para a edição de anúncio - Não é possível acessar sem conta


- Dashboard do Usuário ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Dashboard.png)
Dashboard do usuário com todos seus anúncios e possibilidade de excluir com modal de confirmação, editar e ver a página no produto - Não é possível acessar sem conta


- Página do Produto ![App Screenshot](https://raw.githubusercontent.com/SenhorOver/mktp-store-v2/main/public/images/pages/Product%20Page.png)
Página do produto com todas as informações preenchidas na página de publicar anúncio + data de publicação e data de edição casa haja


## Obs:

- *Zoomout para ter a página inteira em uma única imagem
