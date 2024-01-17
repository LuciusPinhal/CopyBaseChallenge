# [← Voltar para o README](./README.md) <br> <br> Documentação do Projeto

## Introdução

Este documento fornece informações sobre a aplicação web full-stack desenvolvida para o desafio proposto:
Desenvolver uma aplicação web full-stack que capacita os usuários a importar uma planilha de dados de assinantes e explorar métricas cruciais de negócios, como Receita Recorrente Mensal (MRR), Taxa de Churn, entre outras, por meio de gráficos interativos

## Estrutura do Projeto

### Front-End

A interface do usuário foi desenvolvida usando Vue.js. Inclui as seguintes funcionalidades:

1. **Upload de Planilhas:** Permite aos usuários carregar planilhas nos formatos .xlsx ou .csv.
2. **Visualização de Gráficos:** Após o processamento do Back-End, exibe gráficos interativos mês a mês para MRR, Churn Rate, entre outros.

### Back-End

A API RESTful foi implementada usando Node.js. As principais funcionalidades incluem:

1. **Processamento de Dados:** A API recebe a planilha do Front-End e realiza o processamento necessário para calcular MRR, Churn Rate e outras.
2. **Lógica de Cálculo:** Implementação da lógica para calcular as métricas com base nos dados fornecidos na planilha.

## Visualização dos Dados

Para proporcionar visualizações dinâmicas e informativas, integrei bibliotecas como o Chart.js para criar os gráficos. Os resultados são apresentados de maneira clara, oferecendo uma representação visual compreensível das métricas ao longo de cada mês e ano.

## Extras e Boas Práticas

A aplicação inclui os seguintes elementos adicionais:

1. **Tratamento de Dados:** Mecanismos para tratar dados inconsistentes ou inválidos, garantindo a integridade das métricas.
2. **Validações:** Incorporação de validações no Front-End e Back-End para garantir a integridade e segurança dos dados.
3. **Documentação:** Documentação clara e completa, abrangendo o código-fonte, APIs e instruções para execução local.
4. **Testes Unitários:** Desenvolvimento e execução de testes unitários para verificar a robustez e confiabilidade da aplicação.

## Padrões de Projeto

A aplicação inclui os seguintes padrões de projeto:

1. **Mediator:** O padrão Mediator foi empregado para facilitar a comunicação entre componentes da aplicação, promovendo um acoplamento mais fraco. A centralização da lógica de comunicação em um mediador facilita a expansão e manutenção do sistema, garantindo uma interação mais organizada e eficiente entre os módulos.
2. **SOLID:** Os princípios SOLID, fundamentais para o desenvolvimento orientado a objetos, foram rigorosamente aplicados para promover um código claro, flexível e facilmente compreensível. Cada princípio - Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation e Dependency Inversion - foi considerado durante o desenvolvimento, garantindo uma estrutura robusta e extensível.
3. **Clean Code:** A filosofia do Clean Code foi adotada para garantir que o código seja legível, modular e fácil de manter. A aplicação das boas práticas recomendadas pelo Clean Code resultou em um código mais compreensível, reduzindo a probabilidade de erros e facilitando a colaboração entre desenvolvedores.
4. **Separação de Responsabilidades** A separação de responsabilidades foi uma prioridade ao projetar a arquitetura da aplicação. Cada componente possui responsabilidades específicas, seguindo o princípio de design de ter uma única razão para mudar. Isso promove um código mais modular, facilitando a manutenção e a evolução do sistema.
5. **Componentização de Itens** A estratégia de componentização foi aplicada para isolar e reutilizar partes específicas da aplicação. Isso não apenas simplifica o desenvolvimento, mas também facilita a atualização e manutenção de componentes individuais sem afetar a funcionalidade global da aplicação.
## Instruções de Execução

1. Clone o repositório.
2. Instale as dependências.
3. Execute o servidor Front-End.
4. Execute o servidor Back-End.
   <br> <br>
   
[Consultar instruções para instalação e execução](./README.md)


## Considerações Finais

Este desafio visa avaliar não apenas a implementação das funcionalidades solicitadas, mas também a qualidade do código, boas práticas de desenvolvimento e a capacidade de criar uma aplicação web full-stack funcional e eficiente.

<!-- [Futuro Link organograma](./README.md) -->
