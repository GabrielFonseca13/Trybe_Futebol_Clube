O avaliador verificará se fazer o login sem um email, haverá o retorno de status bad request.
Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http 400:
{ "message": "All fields must be filled" }
O avaliador verificará se fazer login sem senha, o retorno será status bad request.
Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http 400:
{ "message": "All fields must be filled" }

As senhas que existem no banco de dados estão encriptadas.Veja a seção de Criptografia de Senhas para mais detalhes de como comparar a senha do banco com a senha do corpo da requisição.

verificar se é possível fazer login com os dados corretos
retornar Token
direcionar para tela de jogos.

criar rota do tipo Post 'login'

controller
verificar se tem o campo email preenchido
se nao status http 400 { "message": "All fields must be filled" }

Verificar se o email é valido
verificar se tem o campo senha preenchido
se nao status http 400 { "message": "All fields must be filled" }

service
criar serviço de login
verificar se o email informado é igual ao email cadastrado.
find by email
descriptografar o campo senha e verificar se é o mesmo cadastrado.

criar Service User e controller para getall e getbyID
