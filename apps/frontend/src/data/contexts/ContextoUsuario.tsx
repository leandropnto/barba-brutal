'use client'

import { Usuario } from "@barba/core"
import { createContext, useCallback, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useRouter } from "next/navigation"

export interface ContextoUsuarioProps {
  carregando: boolean
  usuario: Usuario | null
  entrar: (usuario: Usuario) => void
  sair: () => void
}

const ContextoUsuario = createContext<ContextoUsuarioProps>({} as ContextoUsuarioProps)

export function ProvedorUsuario({ children }: any) {
  const { get, set } = useLocalStorage()

  const router = useRouter()
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const carregarUsuario = useCallback(
    function () {
      try {
        const usuarioLocal = get('usuario')
        if (usuarioLocal) {
          setUsuario(usuarioLocal)
        }
      } finally {
        setCarregando(false)
      }
    },
    [get]
  )

  async function entrar(usuario: Usuario) {
    setUsuario(usuario)
    set("usuario", usuario)
    //router.push(redirecionamento ?? '/')
  }

  function sair() {
    setUsuario(null)
    set("usuario", null)
    router.push("/")
  }

  useEffect(() => carregarUsuario(), [carregarUsuario])

  return (
    <ContextoUsuario.Provider
      value={{
        carregando,
        usuario,
        entrar,
        sair,
      }}
    >
      {children}
    </ContextoUsuario.Provider>
  )
}

export default ContextoUsuario