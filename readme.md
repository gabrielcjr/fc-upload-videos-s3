# Upload de videos no S3 da FC

## Como executar a aplicação

### 1 - Instalar as dependências
```bash
npm i
```

### 2 - Criar o arquivo .env com as informações fornecidas

### 3 - Colar os arquivos de vídeos diretamente na pasta videos (não colocar em subspastas)

### 4 - Executar a aplicação com o comando
```bash
node index.js
```

### 5 - Escolha em qual módulo os vídeos serão cadastrados

```bash
? Selecione o repositório da lista abaixo: (Use arrow keys)
❯ TYPESCRIPT
  DOTNET
  REACT
  JAVA
  PHP
  PYTHON
  DEPLOY_CLOUDS
(Move up and down to reveal more choices)
```
### 6 - Digite o nome da pasta referente ao capítulo, como está no S3
```bash
Agora digite o número do capítulo
```
### 7 - Agora informe se irá fazer o upload. Selecione Y
```bash
Deseja fazer o upload agora? (y/N) Y
```
### 8 - Agora informe, neste passo, que não irá fazer a modificação das permissões. Selecione N
```bash
Deseja alterar as permissões no S3 agora? (y/N) N
```

Feito isto, a aplicação iniciará o upload dos vídeos.

Um vez finalizado o upload, aguarde o tempo necessário pra que o conversor alterar os vídeos.

Por fim, repita os passos, escolhendo N para o upload e Y para alteração da permissão dos arquivos no S3.

Com isto, os vídeos poderão ser reproduzidos na plataforma.