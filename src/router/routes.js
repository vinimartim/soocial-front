import { routes as home } from '../pages/home'
import { routes as auth } from '../modules/auth'
import { routes as perfil } from '../pages/usuario/perfil'
import { routes as mensagens } from '../pages/mensagens'
import { routes as signup } from '../pages/usuario'
import { routes as grupos } from '../pages/grupo'

export default [
  ...auth,
  ...home,
  ...perfil,
  ...mensagens,
  ...signup,
  ...grupos
]
