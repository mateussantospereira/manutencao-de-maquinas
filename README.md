<h2>Manutenção de Máquinas</h2>

18/06/2024

Esta aplicação foi desenvolvida com o objetivo de organizar a manutenção de determinados tornos. Nesta aplicação cada torno possui um histórico de manutenção. Neste podemos visualizar informações sobre a manutenção. A aplicação tem como base o meu projeto dos "patrimônios". Sendo desenvolvido com base neste este projeto tem as funcionalidades dos patrimônios, e também as funcionalidades da manutenção das máquinas.

O registro de usuários possui três níveis. Sendo estes o administrador, o professor e o aluno. O administrador pode importar, cadastrar, atualizar as maquinas, ele também pode registrar novos usuários e administrar os registros. O professor pode ver e exportar o histórico. E o aluno pode fazer a manutenção das máquinas.

As funcionalidades implementadas foram: o registro da manutenção das máquinas, a exportação dos registros e a importação dos registros, esta permitida apenas pelo administrador. As funcionalidades que este possui da aplicação dos "patrimônios" são: o escaneamento de máquina pelo código QR, o cadastro de máquina, a importação das máquinas, a exportação das máquinas, a impressão dos códigos QR das máquinas e a administração dos registros.

Para entrar no sistema é necessário a validação do e-mail e da senha. Porém o usuário precisará estar registrado no banco de dados. Para o registro do usuário é necessário que o administrador da aplicação realize o mesmo. É importante ressaltar que cada senha cadastrada possui criptografia hash e não pode ser acessada diretamente pelo administrador do banco de dados.

Nesta parte será descrito cada funcionalidade desta aplicação.

A primeira funcionalidade é o cadastro de máquina. Para realizar o cadastro de uma máquina o administrador deverá preencher os campos com os as informações desta e então confirmar o cadastro. No preenchimento das informações cada máquina deve possuir um número de inventário único, este podendo ser um número ou dois números separados por um sinal de "-". Depois de cadastrado as informações da máquina serão enviadas para o banco de dados, e então será criado um código QR com o número de inventário e o nome desta máquina.

Depois de cadastrado a máquina o administrador será redirecionado a página de listagem de patrimônios onde ele poderá ver algumas informações da máquina cadastrada ou então atualizá-la.

Na parte de atualização da máquina o administrador deverá preencher um formulário como o do cadastro de máquina onde ele poderá alterar todas as informações da máquina, exceto o número de inventário. Nesta mesma tela ele poderá deletar esta máquina. Para isto ele deverá apertar no botão de deleção da máquina e assim confirmar o ato. É importante dizer que depois que for confirmada a deleção da máquina esta máquina será também deletada do banco de dados. Portanto não será mais possível recuperar os dados da máquina a menos que esta for novamente cadastrada ou importada de uma planilha.

Para a importação de uma lista de máquinas é necessário um arquivo XLSX, tipo este usado pelo excel. Os arquivos que serão importados não podem passar do tamanho limite que, por padrão, é 150 KB. Estes arquivos precisam seguir um padrão. Neste padrão o cabeçalho possuí: "NI", "INSTITUIÇÃO", "TAG", "DESCRIÇÃO", "INCORPORAÇÃO", "MARCA", "SERIE", "VALOR", "SALA", "LOCAL", "ATIVO/BAIXA" e "OBS". "NI", é o número de inventário, principal identificador. "INSTITUIÇÃO", é a instituição da máquina. "TAG", é a tag da máquina, a identificação da máquina pela empresa que a produziu. "DESCRIÇÃO", é o nome da máquina. "INCORPORAÇÃO", é a data de incorporação, cada linha deve conter a formatação padrão de data no arquivo XLSX, por exemplo o texto "25/05/2024" com a formatação "Data" ou com a formatação de texto, que segue o padrão "dia/mês/ano". "MARCA", é a marca da máquina. "SERIE", é a série da máquina. "VALOR", é o preço da máquina. "SALA", é a sala em está a máquina. "LOCAL", é o local da máquina. "ATIVO/BAIXA", é o campo que identifica se a máquina está ativa. "OBS", é alguma observação sobre a máquina. 

Exemplo de cabeçalho do arquivo de importação:

<table id="cabecalho"><thead><tr><th>NI</th><th>INSTITUIÇÃO</th><th>TAG</th><th>DESCRIÇÃO</th><th>INCORPORAÇÃO</th><th>MARCA</th><th>SERIE</th><th>VALOR</th><th>SALA</th><th>LOCAL</th><th>ATIVO/BAIXA</th><th>OBS</th></tr></thead></table> 

Na exportação de máquinas, o administrador ou professor deverá especificar as máquinas a serem exportadas. Sendo as opções de especificação, por texto ou por número de inventário. Depois de especificada as máquinas que serão exportadas, será feito o download pelo navegador da planilha XLSX com as mesmas máquinas da lista.

Na impressão de máquinas acontece também uma especificação de máquinas. As opções de especificação são por texto ou pelos números de inventário. Depois que as máquinas forem escolhidas, o usuário será redirecionado para outra tela que possui um arquivo PDF com todos os códigos QR das máquinas escolhidas anteriormente.

O gerenciamento de registros pode somente ser acessado pelo usuário administrador. No gerenciamento de registros o administrador pode criar outro registro ou modificar os já existentes.

Na criação de um novo registro de usuário, será preenchido um formulário com as informações deste. Será requerido o nome, o e-mail e a senha deste usuário. Cada usuário deve possuir um e-mail único. Antes das informações serem enviadas para o banco de dados, a senha deste usuário será criptografada em hash, e não poderá ser vista pelo administrador do banco de dados. Depois que o usuário for criado as informações deste serão enviadas para o banco de dados.

Na modificação do usuário será preenchido um formulário. Neste formulário é requerida a senha para a modificação do usuário. As informações que poderão ser alteradas são: o nome, o e-mail e a senha. Não é obrigatório o preenchimento do campo de nova senha. Depois de finalizado o preenchimento as informações serão alteradas no banco de dados.

Para realizar a manutenção de uma máquina o aluno pode escolher o tipo da manutenção a ser realizada. Depois de escolhido o tipo de manutenção será preenchido um formulário. Este formulário possuirá vários checkboxes com os detalhes a serem percebidos na realização da manutenção. Depois de finalizado a manutenção do aluno, as informações da manutenção serão gravadas no histórico de manutenção da máquina.

Para a exportação do histórico de alguma máquina é necessário que seja feito por um professor ou administrador. O usuário deve escolher a máquina em que será exportado o histórico. Depois de escolhida a máquina será feito o download do arquivo XLSX com o histórico dessa máquina.

Para a importação de histórico de máquina é necessário um usuário administrador. Na importação o usuário deve escolher a máquina em que será importada a lista de histórico. É importante, no arquivo de importação, que estejam o histórico de apenas uma máquina. Para esta importação é necessário um arquivo XLSX com tamanho limite, por padrão 150 KB. O cabeçalho deve conter os campos: "NI", "PERÍODO", "ATOR", "E-MAIL", "DATA" e "HORA". "NI", é o número de inventário da máquina. "PERÍODO", é o período da manutenção realizada. "ATOR", é a pessoa que realizou a manutenção. "E-MAIL", é o E-mail do autor da manutenção. "DATA", é o dia em que foi realizada. A data da manutenção deve conter a formatação data no arquivo XLSX, ou então, deve ser escrita como "dia/mês/ano". "HORA", é a hora em que a manutenção foi realizada. A hora em foi realizada a manutenção deve ser escrita como "hora:minuto:segundo".

Exemplo de cabeçalho do arquivo de importação:

<table id="cabecalho"><thead><tr><th>NI</th><th>PERÍODO</th><th>AUTOR</th><th>E-MAIL</th><th>DATA</th><th>HORA</th></thead></table> 

O cache desta aplicação é feito em javaScript. Ele armazena tokens de usuários que utilizam determinada rota da aplicação. Os tokens são armazenados para controlar requisições que podem ser vulneráveis a possíveis ataques de hackers. Também para controlar a quantidade de manutenções feitas por dia. O cache não armazena informações como nome do usuário, email, ou senha deste. O cache é limpo, por padrão, a cada 1 dia.

Autor: Mateus dos Santos Pereira.

GITHUB: <a href="https://github.com/mateussantospereira" target="_blank" rel="external">https://github.com/mateussantospereira</a>

<h2>Bibliotecas</h2>

- express - A primeira biblioteca usada foi o express. O express foi usado com finalidade de criar uma aplicação em node js. <a href="https://www.npmjs.com/package/express" target="_blank" rel="external">https://www.npmjs.com/package/express</a>.

- express-session - A biblioteca express-session foi usada com a finalidade de criar uma sessão para os usuário autenticados e bloqueando, portanto, os usuários não autenticados. <a href="https://www.npmjs.com/package/express-session" target="_blank" rel="external">https://www.npmjs.com/package/express-session</a>.

- cors - A biblioteca cors foi usada para restringir o acesso de servidores à esta aplicação e bloquear, portanto, os servidores não permitidos. <a href="https://www.npmjs.com/package/cors" target="_blank" rel="external">https://www.npmjs.com/package/cors</a>.

- dotenv - A biblioteca dotenv foi usada para que o servidor que hospeda a aplicação possa configurar as variáveis de ambiente. <a href="https://www.npmjs.com/package/dotenv" target="_blank" rel="external">https://www.npmjs.com/package/dotenv</a>.

- node-schedule - Esta biblioteca foi usada para configurar o período da de limpeza do Cache local desta aplicação. <a href="https://www.npmjs.com/package/node-schedule" target="_blank" rel="external">https://www.npmjs.com/package/node-schedule</a>.

- mysql - A biblioteca mysql foi usada para conectar a aplicação em node js com o banco de dados MySQL. Possibilitando assim que a aplicação execute comandos SQL no local do banco de dados MySQL. <a href="https://www.npmjs.com/package/mysql" target="_blank" rel="external">https://www.npmjs.com/package/mysql</a>

- jsonwebtoken - Esta biblioteca foi usada para gerar tokens de sessão para os usuários autenticados da aplicação. <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="external">https://www.npmjs.com/package/jsonwebtoken</a>.

- bcryptjs - Esta biblioteca foi usada para criptografar a senha com a função criptográfica hash e enviar assim a senha com criptografia para o banco de dados MySQL. <a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="external">https://www.npmjs.com/package/bcryptjs</a>.

- qrcode - A biblioteca qrcode foi usada com a finalidade de criar um código QR para cada máquina cadastrada nesta aplicação. <a href="https://www.npmjs.com/package/qrcode" target="_blank" rel="external">https://www.npmjs.com/package/qrcode</a>.

- xlsx - A biblioteca xlsx foi usada para ler e escrever dados em arquivos XLSX. Esta biblioteca foi usada para a importação e a exportação de maquinas por meio de arquivos XLSX. <a href="https://www.npmjs.com/package/xlsx" target="_blank" rel="external">https://www.npmjs.com/package/xlsx</a>.

- html-pdf - Esta biblioteca foi usada para a criação de arquivos PDF por meio de códigos HTML. Esta biblioteca foi usada especificamente na impressão dos códigos QR de máquinas. <a href="https://www.npmjs.com/package/html-pdf" target="_blank" rel="external">https://www.npmjs.com/package/html-pdf</a>

- ejs - A biblioteca ejs foi usada para utilizar a view engine ejs. Esta linguagem foi utilizada no front-end da aplicação, tanto para a componentização deste, quanto para o envio de variáveis da própria API. <a href="https://www.npmjs.com/package/ejs" target="_blank" rel="external">https://www.npmjs.com/package/ejs</a>.

- instascan - Esta biblioteca foi utilizada para o controle do escaneamento das máquinas por meio dos códigos QR. Esta identifica o código QR e faz a leitura deste, redirecionando o usuário para a tela de atualização da máquina. <a href="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js" target="_blank" rel="external">https://rawgit.com/schmich/instascan-builds/master/instascan.min.js</a>.

- googleapis - Esta foi uma biblioteca usada para mudar a fonte da interface gráfica para a fonte roboto do google. <a href="https://fonts.googleapis.com" target="_blank" rel="external">https://fonts.googleapis.com</a>.