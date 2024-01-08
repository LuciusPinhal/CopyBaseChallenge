# [← Voltar para o README](./README.md) <br> <br> Documentação do Projeto

## Introdução

Este documento fornece informações sobre a aplicação web full-stack desenvolvida para o desafio proposto:
Desenvolver uma aplicação web full-stack que permita aos usuários carregar uma planilha de dados de assinantes e visualizar métricas chave de negócios: Monthly Recurring Revenue (MRR) e Churn Rate, em gráficos interativos.

## Estrutura do Projeto

### Front-End

A interface do usuário foi desenvolvida usando Vue.js. Inclui as seguintes funcionalidades:

1. **Upload de Planilhas:** Permite aos usuários carregar planilhas nos formatos .xlsx ou .csv.
2. **Visualização de Gráficos:** Após o processamento do Back-End, exibe gráficos interativos mês a mês para MRR e Churn Rate.

### Back-End

A API RESTful foi implementada usando Node.js. As principais funcionalidades incluem:

1. **Processamento de Dados:** A API recebe a planilha do Front-End e realiza o processamento necessário para calcular MRR e Churn Rate.
2. **Lógica de Cálculo:** Implementação da lógica para calcular as métricas com base nos dados fornecidos na planilha.

## Visualização dos Dados

Para criar gráficos dinâmicos e informativos, foram utilizadas bibliotecas como Chart.js ou D3.js. Os gráficos são exibidos de forma clara, oferecendo uma representação visual das métricas mês a mês.

## Extras e Boas Práticas

A aplicação inclui os seguintes elementos adicionais:

1. **Tratamento de Dados:** Mecanismos para tratar dados inconsistentes ou inválidos, garantindo a integridade das métricas.
2. **Validações:** Incorporação de validações no Front-End e Back-End para garantir a integridade e segurança dos dados.
3. **Documentação:** Documentação clara e completa, abrangendo o código-fonte, APIs e instruções para execução local.
4. **Testes Unitários:** Desenvolvimento e execução de testes unitários para verificar a robustez e confiabilidade da aplicação.

## Instruções de Execução

1. Clone o repositório.
2. Instale as dependências.
3. Execute o servidor Front-End.
4. Execute o servidor Back-End.
   <br> <br>
   
[Consultar instruções para instalação e execução](./README.md)

Certifique-se de fornecer instruções claras sobre como configurar e executar a aplicação localmente, se necessário.

## Considerações Finais

Este desafio visa avaliar não apenas a implementação das funcionalidades solicitadas, mas também a qualidade do código, boas práticas de desenvolvimento e a capacidade de criar uma aplicação web full-stack funcional e eficiente.

[Futuro Link organograma](./README.md)
