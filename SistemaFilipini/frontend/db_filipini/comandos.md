# FRONTEND

### SE - Criar um novo projeto Web com Vue
```
vue create NOME_DO_PROJETO
[x] - Selecionar "Manually select features" e dar enter
[x] - Marcar "Router" com barra de espaço e dar enter
[x] - Selecionar "2.x"
[x] - Selecionar "ESLint with error prevention only" e dar enter
[x] - Selecionar "Lint on save" e dar enter
[x] - Selecionar "In package.json" e dar enter
[x] - N para a última pergunta e enter
cd NOME_DO_PROJETO
vue add vuetify
[x] - Selecionar "Default"
npm install jwt-decode --save
npm install axios --save
```

### SE - For clonar (outra pessoa criou o projeto), executar
```
npm install
```

### Rodar o projeto em desenvolvimento
```
npm run serve
```

### Compilar o programa
```
Dentro de vue.config.js, acrescentar a linha:
publicPath: '/app/' - Modificar "app" para o caminho que desejam
npm run build
```

---

# BACKEND

### SE - Criar um novo projeto no nodejs
```
npm init
npm install express mysql body-parser --save
npm install cors jsonwebtoken bcryptjs -save
```

##3 SE - Clonar projeto
```
npm install
```

### Configurar banco de dados

Abrir arquivo backend/app/configs/db.js e alterar configurações

### Importar banco de dados no XAMPP

[x] Abrir o XAMPP
[X] Iniciar Apache e MySQL
[x] Abrir localhost/phpmyadmin
[x] Clicar na opção "Import" da navbar
[x] Escolher o arquivo .sql e importar
[x] Se atentar para erros de "VISIBLE" - retirar se estiver no .sql

### Rodar projeto Node
```
node NOME_DO_ARQUIVO_DE_ENTRADA.js
```

### Alternativa - instalar nodemon
```
npm install -g nodemon
```

### Alternativa - rodar com nodemon
```
nodemon server.js
```

### Referências
[Referência das configurações](https://cli.vuejs.org/config/).

