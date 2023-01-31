
# Projeto MKTP Store

O Projeto MKTP Store é um website criado utilizando Next js que gerencia tanto o frontent quanto o backend


## Stack utilizada

**Front-end:** React, Next js, MUI, yup, Formik, slugify, react-dropzone, react-material-ui-carousel

**Back-end:** Next js, Next-auth, NextConnect, MongoDB (mongoose), Formidable, bcrypt


## Obs:

Não fiz o deploy do projeto pois estava com problemas de Timeout


## Páginas

- Página Inicial ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Home%20Page.png?raw=true)
Tela principal que exibe 6 anúncios que estão na base de dados, com uma barra de pesquisa funcional que busca o texto digitado em títulos e descrição de anúncios


- Página de Busca ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Search.png?raw=true)
Página que recebe como query o termo digitado e procura no db os anúncio e retorna para a tela - (Não fiz sistema de páginas pois esse é um projeto simples)


- Página de Login ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Login.png?raw=true)
Página em que é possível fazer login pelo próprio site ou pelo google - Não é possível acessar caso já esteja logado


- Página de Registro ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Register.png?raw=true)
Página para se registrar no sistema caso não tenha conta - Não é possível acessar caso já esteja logado


- Página de Publicar Anúncio ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Publish.png?raw=true)
Página para publicação de anúncio com validação feita utilizando Formik + yup


- Página de Edição de Anúncio ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Edit%20Product.png?raw=true)
Página para a edição de anúncio


- Dashboard do Usuário ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Dashboard.png?raw=true)
Dashboard do usuário com todos seus anúncios e possibilidade de excluir com modal de confirmação, editar e ver a página no produto


- Página do Produto ![App Screenshot](https://github.com/SenhorOver/mktp-store-v2/blob/photos/public/images/pages/Product%20Page.png?raw=true)
Página do produto com todas as informações preenchidas na página de publicar anúncio + data de publicação e data de edição casa haja