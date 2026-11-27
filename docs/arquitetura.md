# Arquitetura do BizuQuiz

## Escopo
Aplicação web estática, sem framework, autenticação, ranking ou banco de dados.
A refatoração preserva a interface e a mecânica eliminatória. Não modifica o
conteúdo das questões, gabaritos, recursos multimídia ou textos dos créditos.

## Organização
- `Pasta-html/`, `Questoes/`, `creditos/`, `parabens/`: documentos HTML e rotas públicas históricas. Os nomes dos diretórios foram mantidos para evitar quebra de links publicados.
- `assets/css/`: estilos compartilhados e por página; a ordem original de carregamento é preservada.
- `assets/js/quiz.js`: motor das seis disciplinas.
- `assets/data/questoes/`: dados de cada disciplina em JavaScript declarativo, carregados antes do motor. Não há fetch assíncrono nem dependências novas.
- `assets/js/`: multimídia, créditos e navegação das telas de resultado.
- `songs/` e arquivos de imagem/vídeo históricos: mídias preservadas nos caminhos originais para evitar alteração de URLs e da reprodução.
- `tests/`: testes automatizados do motor, utilizando apenas Node.js.
- Arquivos históricos/protótipos não referenciados pelo menu são mantidos, inclusive CSS e scripts legados, para preservar acesso direto e autoria. Alguns já possuem referências ausentes; não fazem parte da refatoração funcional.

## Convenções
Novos arquivos: nomes em minúsculas, kebab-case, sem acentos/espaços.
HTML define estrutura e vínculos de eventos existentes; CSS controla apresentação;
JavaScript controla comportamento; dados ficam separados da lógica.
Manter ordem dos scripts clássicos e usar caminhos relativos. Para alterar questões,
editar somente o arquivo da matéria em `assets/data/questoes/`. A chave `correta`
continua sendo um índice de 0 a 3. Não reordenar alternativas sem atualizar a chave.

## Testes e publicação
- `node tests/quiz.test.cjs`: exercício de todas as questões, alternativas incorretas e conclusão.
- `python -m http.server 8000`: teste local via HTTP.
- Verificar menu, tutorial, seis disciplinas, derrota, vitória, créditos, Easter egg, áudio e layout mobile/desktop em navegador antes de mesclar.
- Cloudflare Pages: manter raiz do projeto como diretório de saída, branch de produção `main` e configuração existente. Não é necessário compilar.
- Preferir branches de alteração, commits pequenos e Pull Requests; não publicar uma refatoração sem revisão de regressão.

## Limites
A validação automatizada do motor utiliza DOM simulado e não certifica equivalência visual,
comportamento de reprodução de mídia ou conformidade integral com WCAG. Não corrige bugs
preexistentes de conteúdo nem revisa direitos autorais. Manter as atribuições originais.
