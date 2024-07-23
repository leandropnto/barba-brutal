'use client'

import TituloSlogan from "@/components/landing/TituloSlogan"
import NossosServicos from "@/components/servico/NossosServicos"
import ContainerComBackground from "@/components/shared/ContainerComBackground"

export default function Landing() {
  return (
    <div>
      <TituloSlogan />
      <ContainerComBackground imagem="/banners/servicos.webp">
        <NossosServicos />
      </ContainerComBackground>
    </div>
  )
}