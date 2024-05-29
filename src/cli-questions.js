const questions = [{
  type: 'list',
  name: 'repos',
  message: 'Selecione o repositório da lista abaixo:',
  choices: [
    'DevOpsPro',
    'DevOpsProBonus',
    'DevOpsProBonusWorkshops',
    'MBA_marketing_pessoal',
    'TYPESCRIPT',
    'DOTNET',
    'REACT',
    'JAVA',
    'JAVA_subscription_service',
    'PHP',
    'PHP_subscription_service',
    'PYTHON',
    'DEPLOY_CLOUDS',
    'KEYCLOAK',
    'MBA_microsservicos',
    'MBA_clean_hex_arch',
    'MBA_domain_driven_design',
    'MBA_fund_arquitetura_de_software',
    'MBA_solid_design_pattern',
    'MBA_solution_architecture',
    'MBA_system_design_and_design_docs',
    'MBA_lideranca',
    'MBA_apache_kafka',
    'MBA_banco_de_dados',
    'MBA_cloud',
    'GOEXPERT',
    'GOEXPERT_labs',
    'LIDERANCA_TECNICA_gestao_de_conflito'
  ]
},
{
  type: 'input',
  name: 'chapter',
  message: 'Agora digite o número do capítulo'
},
{
  type: 'confirm',
  name: 'upload',
  message: 'Deseja fazer o upload agora?',
  default: false
},
{
  type: 'confirm',
  name: 'permission',
  message: 'Deseja alterar as permissões no S3 agora?',
  default: false
}
]

const REPOS = {
  DevOpsPro: 'devopspro/19-github-github_actions/',
  DevOpsProBonus: 'devopspro/bonus/encontros_ao_vivo/',
  DevOpsProBonusWorkshops: 'devopspro/bonus/workshops/',
  MBA_marketing_pessoal: 'code/mba/marketing_pessoal/',
  TYPESCRIPT: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-typescript-v2/',
  DOTNET: 'code/fullcycle/fc3/microsservico-api-do-catalogo-com-dotnet/',
  REACT: 'code/fullcycle/fc3/projeto-pratico-codeflix-react/',
  JAVA: 'code/fullcycle/fc3/microsservico-api-do-catalogo-com-java/',
  JAVA_subscription_service: 'code/fullcycle/fc3/microsservico-assinatura-com-java/',
  PHP: 'code/fullcycle/fc3/microsservico-api-do-catalogo-com-php/',
  PHP_subscription_service: 'code/fullcycle/fc3/microsservico-assinatura-com-php/',
  PYTHON: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-python-v2/',
  DEPLOY_CLOUDS: 'code/fullcycle/Deploy-das-Cloud-Providers/',
  KEYCLOAK: 'code/fullcycle/autenticacao-com-keycloack-new/',
  MBA_microsservicos: 'code/mba/microsservicos/',
  MBA_clean_hex_arch: 'code/mba/clean-hex-arch/',
  MBA_domain_driven_design: 'code/mba/domain-driven-design/',
  MBA_fund_arquitetura_de_software: 'code/mba/fund-arquitetura-de-software/',
  MBA_solid_design_pattern: 'code/mba/solid-design-pattern/',
  MBA_solution_architecture: 'code/mba/solution-architecture/',
  MBA_system_design_and_design_docs: 'code/mba/system-design-and-design-docs/',
  MBA_lideranca: 'code/mba/lideranca/',
  MBA_apache_kafka: 'code/mba/apache_kafka/',
  MBA_banco_de_dados: 'code/mba/banco_de_dados/',
  MBA_cloud: 'code/mba/cloud/',
  GOEXPERT: 'code/go/',
  GOEXPERT_labs: 'code/go/labs/',
  LIDERANCA_TECNICA_gestao_de_conflito: 'code/mba/lideranca_tecnica/gestao_de_conflito'
}

export { questions, REPOS }
