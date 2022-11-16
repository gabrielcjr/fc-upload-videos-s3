const questions = [{
  type: 'list',
  name: 'repos',
  message: 'Selecione o repositório da lista abaixo:',
  choices: ['TYPESCRIPT', 'DOTNET', 'REACT',
    'JAVA', 'PHP', 'PYTHON', 'DEPLOY_CLOUDS',
    'GOLANG'
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
  TYPESCRIPT: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-typescript/',
  DOTNET: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-dotnet/',
  REACT: 'code/fullcycle/fc3/microsservico-administracao-do-catalogo-de-videos-com-React/',
  JAVA: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-java-new/',
  PHP: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-php/',
  PYTHON: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-python/',
  DEPLOY_CLOUDS: 'code/fullcycle/Deploy-das-Cloud-Providers/',
  GOLANG: 'code/go/'
}

export { questions, REPOS }
