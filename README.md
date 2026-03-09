# Resumo

Esse é meu segundo projeto pessoal utilizando ReactJS, se trata de um sistema para criação de textos prontos (chamados de macros em plataformas de atendimento)

Trabalhei com atendimento por um tempo e apesar do sistema de macros existir sentia que às vezes não eram tão rápidas para utilização pois uma única macro possuía variantes e precisaria remover partes do texto em situações específicas, com isso criar um sistema próprio poderia facilitar

# Funcionalidades

- Visualizar e selecionar os textos cadastros
- Cadastrar macros e variantes
- Copiar texto para a área de transferência (clipboard) com um botão
- Editar macros
- Excluir macros

https://github.com/user-attachments/assets/aefa0e3c-ef75-43c2-ac9a-6255a951ae69

# 🛠️ Tecnologias
- HTML
- CSS
- JavaScript/ReactJS
- Firebase (especificamente a Firestore Database como banco de dados)

Nesse projeto estou praticando meus conhecimentos com o Firebase

# ⚙️ Como rodar localmente

O primeiro passo é possuir o **NodeJS** instalado em sua máquina para que o ReactJS possa funcionar

Em seguida é necessário realizar o cadastro no **Firebase** https://firebase.google.com/?hl=pt-br, criar um projeto e um app que utilizará o **Firestore Database** como banco de dados
Nas configurações do projeto haverá um código pronto contendo dados para conexão com o seu banco de dados

Após isso basta realizar o download dos arquivos desse repositório, em seguida basta  acessar a pasta do projeto através do CMD e rodar o comando `npm start`

### ⚠️ Observação

Nesse caso utilizei um arquivo .env.local para salvar os dados da conexão com o banco de dados
