# Comercial Sagarana

Landing page institucional e painel administrativo desenvolvidos para o Comercial Sagarana.

O projeto permite divulgar promoções, facilitar o contato com clientes e realizar o controle interno de ofertas e vendas diárias através de um dashboard administrativo.

## Funcionalidades

### Landing Page

* Apresentação do estabelecimento
* Seção de ofertas dinâmicas
* Exibição automática apenas quando existirem ofertas ativas
* Localização integrada ao Google Maps
* Contato rápido via WhatsApp, telefone e Instagram
* Design responsivo para desktop, tablet e mobile
* SEO otimizado

### Painel Administrativo

#### Resumo Geral

* Último fechamento
* Faturamento do mês
* Faturamento do ano
* Resumo financeiro

#### Gestão de Ofertas

* Cadastro de ofertas
* Upload de imagens
* Edição de ofertas
* Ativação e desativação
* Exclusão de ofertas
* Exibição automática na landing page

#### Gestão de Vendas

* Registro de vendas diárias
* Edição de vendas
* Exclusão de registros
* Organização por:

  * Ano
  * Mês
  * Dia
* Totais anuais
* Totais mensais
* Valores diários

## Tecnologias Utilizadas

### Front-end

* React
* Vite
* React Router DOM
* CSS Modules (estrutura organizada por páginas e componentes)
* Lucide React

### Back-end

* Supabase

### Banco de Dados

* PostgreSQL (Supabase)

### Armazenamento

* Supabase Storage

## Configuração

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/comercial-sagarana.git
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Execute o projeto:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

## Responsividade

O projeto foi desenvolvido para:

* Desktop
* Notebook
* Tablet
* Smartphones

## Autor

Desenvolvido por Claiverty Rodrigues.
