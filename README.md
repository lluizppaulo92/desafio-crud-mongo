# Desafio-crud-mongodb

<div align="justify">
Desafio proposto: Implementar CRUD para cadastrar empresas, unidades, ativos e usuários.</br>
Critérios:</br>
•	Cada ativo deve ter uma imagem, nome, descrição, modelo, proprietário, status e nível de integridade;</br>
•	Cada ativo faz parte de uma unidade;</br>
•	Cada unidade faz parte de uma empresa;</br>
•	Cada usuário faz parte de uma empresa;</br>
•	Existem três tipos de status: Em execução, Alerta, Parado;</br>
•	O nível de saúde precisa estar entre 0% e 100%.</br>
Para consumir a API faz-se necessário informar no header da requisição um token de forma a assegurar o acesso à apenas quem possuir um token válido.</br>
</div>
  
	Nome : token 
	Valor : a473bf6226c4c6b6d45fc0f5926816e3
	Tipo: Header

<div align="justify">
   Foi implementado uma rota para cada item  levantado na proposta onde as rotas possuem um prefixo (URL_Base/api/...) e nome do item, todas as rotas utilizam os seguintes métodos [GET,POST,PUT, DELETE], para cada item quando utilizado o método GET pode ser informado no header da requisição qual parâmetro será considerado para fazer a consulta, tendo algumas regras na utilização de alguns parâmetros que será permitido a utilização de apenas um parâmetro por vez na consulta, caso seja informado mais de um que seja bloqueado pela api, será retornado a mensagem que apenas um parâmetro poderá ser utilizado para fazer o filtro ( entende-se parâmetros únicos na consulta os que forem marcados com *, caso o campo não tenha o * poderá ser utilizando juntamente como filtro adicional ),  segue abaixo as rotas e exemplos de usa utilização:
  </div>
</br>
<strong>URL_BASE: http://localhost:3000/api</strong>

<div>
<strong>Rota para Empresa : URL_BASE/empresa</strong>
</br>
 
 <div>
GET: 
		<div>Header: [cnpj * , nome_fantasia *, rasao_social *]</div>
</div>
	
POST:</br>
<pre>
body: { "nome_fantasia": "EMPRESA MODELO",
    		"rasao_social": "EMPRESA MODELO",
        "cnpj": "00.000.000/0001-00",</br>
  	 } 
</pre>
PUT: 

<pre>
body: {
	  "_id":"(id gerado pelo mongodb) ",
  			   "nome_fantasia": "EMPRESA MODELO",
  			   "rasao_social": "EMPRESA MODELO",
  			   "cnpj": "00.000.000/0001-00",
           }
           </pre>

DELETE: 
<pre>
body: {
	"_id" : " (id gerado pelo mongodb) ",
  			   "nome_fantasia": "EMPRESA MODELO",
  			   "rasao_social": "EMPRESA MODELO",
  			   "cnpj": "00.000.000/0001-00",
  			}
        </pre>


</div>
</br>
<div>
<strong>Rota para Usuário: URL_BASE/usuario</strong>
	
GET: </br>
		Header : [ nome *, login * , empresa ]</br>
		Obs: o parâmetro empresa poderá ser passado tanto o objeto quanto apenas o seu id;</br>
	
POST:</br>
		<pre>body: {
            			"nome": "Luiz Paulo",
              "login": "lluizppaulo",
  	 "senha": "123456",
               "empresa": (Objeto da empresa / id)
 }
 </pre>

PUT: </br>
<pre>
body:  {
	"_id": " (id gerado pelo mongodb) ",
            			"nome": "Luiz Paulo",
              "login": "lluizppaulo",
  	 "senha": "123456",</br>
               "empresa": (Objeto da empresa / id)
 }
 </pre>
 </br>


DELETE:</br>
<pre>
body:  {
	"_id": " (id gerado pelo mongodb) ",
            			"nome": "Luiz Paulo",
              "login": "lluizppaulo",
  	 "senha": "123456",
               "empresa": (Objeto da empresa / id)
 }
 </pre>
 </br>
</div>

<div>
  
  
<strong>Rota para Unidade: URL_BASE/unidade</strong></br>
	
GET: </br>
		Header : [descricao*, endereço*, bairro*, ponto_referencia*, empresa]	</br>
	Obs: o parâmetro empresa poderá ser passado tanto o objeto quanto apenas o seu id;</br>
	</br>
POST:</br>
<pre>
		body: { 
"descricao": "UNIDADE TESTE",
			"endereco": "RUA GONÇALVES DIAS",
			"bairro":"CENTRO",
			"ponto_referencia": "AO LADO DO COLEGIO DON PRADA",
			"empresa": "(objeto da empresa / id )"
			}
      </pre></br>
PUT: </br>
<pre>
body: { 
	"_id": " (id gerado pelo mongodb) ",
"descricao": "UNIDADE TESTE",
			"endereco": "RUA GONÇALVES DIAS",
			"bairro":"CENTRO",
			"ponto_referencia": "AO LADO DO COLEGIO DON PRADA",
			"empresa": "(objeto da empresa / id )"
			}
</pre>      </br>

DELETE: </br>
<pre>
body: { 
	"_id": " (id gerado pelo mongodb) ",
"descricao": "UNIDADE TESTE",
			"endereco": "RUA GONÇALVES DIAS",
			"bairro":"CENTRO",
			"ponto_referencia": "AO LADO DO COLEGIO DON PRADA",
			"empresa": "(objeto da empresa / id )"
			}
      </pre>
</div>

<div>
<strong>Rota para Unidade: URL_BASE/ativo</strong></br>
	
GET: </br>
		Header : [ nome, modelo, proprietario, status, nivel_integridade, unidade]	</br>
	Obs: o parâmetro proprietário e unidade poderá ser passado tanto o objeto quanto apenas o seu id, é importante ressaltar que todos os campos mencionados para filtro poderão ser utilizados em conjunto, ficando desta forma 
	
POST:</br>
<pre>
		body: {"imagem": "(Imagem em base64)",
			"nome":"ATIVO TESTE",
			"modelo":"TESTE",
			"proprietario": "(objeto ou id do usuário )",
			"status": "Parado",
			"nivel_integridade":100,
			"unidade": "(objeto ou id da unidade)"
		}
</pre></br>

PUT: </br>
<pre>
body: {
	"_id":(id gerado pelo mongodb),
"imagem": "(Imagem em base64)",
			"nome":"ATIVO TESTE",
			"modelo":"TESTE",
			"proprietario": "(objeto ou id do usuário )",
			"status": "Parado",
			"nivel_integridade":100,
			"unidade": "(objeto ou id da unidade)" ,
			"alterou_imagem": (true/false),
			"link_imagem_anterior": (link para deletar a imagem antiga)}
</pre>      </br>

DELETE: </br>
<pre>
body: {</br>
	"_id":(id gerado pelo mongodb),
"imagem": "(Imagem em base64)",
			"nome":"ATIVO TESTE",
			"modelo":"TESTE",
			"proprietario": "(objeto ou id do usuário )",
			"status": "Parado",
			"nivel_integridade":100,
			"unidade": "(objeto ou id da unidade)" ,
			"alterou_imagem": (true/false),
			"link_imagem_anterior": (link para deletar a imagem antiga)}
	}
  </pre>
</div>

<div>
<strong>Rota para Histórico do Ativo : URL_BASE/ativo/historico</strong>
	<div align="justify">Esta rota é composta apenas pelo método GET e possui como parâmetro de consulta o campo id_ativo, será retornado um log contendo todas as alterações já realizadas no ativo como por exemplo a troca de status mudança de nome, modelo e nível de integridade, apenas o campo de imagem não será registrado a sua alteração uma vez que ao ser alteado a imagem do ativo ela é deletada do repositório não podendo mais ser consultada.</div>
	GET:</br>
		Header: [id_ativo]</br>
  	Exemplo de retorno:</br>
<pre>[
      {
      "_id": "625ce5b60c769d1664da5f9c",
      "id_ativo": "62586b508cec50273492b74a",
      "nome_new": "ATIVO TESTE HEROKU1",
      "nome_old": "ATIVO TESTE HEROKU",
      "data_alteracao": "18/04/2022 01:14:46"
   },
      {
      "_id": "625ce5c00c769d1664da5f9d",
      "id_ativo": "62586b508cec50273492b74a",
      "modelo_new": "TESTE",
      "modelo_old": "TESTE 23",
      "data_alteracao": "18/04/2022 01:14:56"
   },
      {
      "_id": "625ce5cf0c769d1664da5f9e",
      "id_ativo": "62586b508cec50273492b74a",
      "nome_new": "ATIVO TESTE HEROKU5",
      "nome_old": "ATIVO TESTE HEROKU1",
      "nivel_integridade_new": 90,
      "nivel_integridade_old": 100,
      "data_alteracao": "18/04/2022 01:15:11"
   }
]</pre></br>



