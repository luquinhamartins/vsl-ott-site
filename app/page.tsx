"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Users, Tv, Smartphone, Monitor, CheckCircle, Star, Lock, Unlock, Usb, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ErrorBoundary from "@/components/error-boundary"

export default function SophisticatedOTTVSL() {
  const [viewersCount, setViewersCount] = useState(1247)
  const [contentUnlocked, setContentUnlocked] = useState(false)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const TOTAL_UNLOCK_TIME_MS = 170 * 1000 // 170 segundos em milissegundos
  const [remainingTime, setRemainingTime] = useState(TOTAL_UNLOCK_TIME_MS)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null) // Para armazenar o timestamp de início do timer
  const viewerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Inicializa o startTime quando o componente monta
    startTimeRef.current = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - (startTimeRef.current || Date.now())
      const newRemainingTime = TOTAL_UNLOCK_TIME_MS - elapsedTime

      // Log para depuração
      console.log(`Elapsed: ${elapsedTime}ms, Remaining: ${newRemainingTime}ms, Unlocked: ${contentUnlocked}`)

      if (newRemainingTime <= 0) {
        clearInterval(intervalRef.current!)
        setContentUnlocked(true)
        setShowUnlockAnimation(true)
        setTimeout(() => setShowUnlockAnimation(false), 4000)
        console.log("CONTEÚDO DESBLOQUEADO! (Timer finalizado)")
        setRemainingTime(0) // Garante que o tempo não fique negativo
      } else {
        setRemainingTime(newRemainingTime)
      }
    }, 100) // Aumentei o intervalo para 100ms para maior robustez contra throttling

    viewerIntervalRef.current = setInterval(() => {
      setViewersCount((prevCount) => {
        const change = Math.floor(Math.random() * 5) - 2
        const newCount = prevCount + change
        return Math.max(1000, newCount)
      })
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (viewerIntervalRef.current) clearInterval(viewerIntervalRef.current)
    }
  }, [contentUnlocked]) // contentUnlocked como dependência para o log, mas o timer não é reiniciado

  // Calcula minutos, segundos e milissegundos para exibição
  const displayMinutes = Math.floor(remainingTime / 60000)
  const displaySeconds = Math.floor((remainingTime % 60000) / 1000)
  const displayMilliseconds = Math.floor((remainingTime % 1000) / 10)

  // Formata o tempo para exibição (se você quiser mostrar o timer na tela)
  const formattedTimer = `${displayMinutes.toString().padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}.${displayMilliseconds.toString().padStart(2, "0")}`

  const platforms = [
    { name: "Netflix", price: 39.9 },
    { name: "Amazon Prime Video", price: 14.9 },
    { name: "Disney+", price: 28.9 },
    { name: "HBO Max", price: 34.9 },
    { name: "Globoplay", price: 19.9 },
    { name: "Star+", price: 32.9 },
    { name: "Paramount+", price: 19.9 },
    { name: "Apple TV+", price: 14.9 },
    { name: "Lionsgate+", price: 14.9 },
    { name: "Premiere", price: 89.9 },
    { name: "DAZN", price: 19.9 },
    { name: "TNT Sports", price: 29.9 },
    { name: "Estádio TNT Sports", price: 19.9 },
    { name: "Nordeste FC", price: 29.9 },
    { name: "Brasileirão Play", price: 59.9 },
    { name: "ESPN App", price: 29.9 },
    { name: "SKY (básico)", price: 129.9 },
    { name: "Claro TV (básico)", price: 119.9 },
    { name: "Oi TV (básico)", price: 109.9 },
    { name: "Vivo Play", price: 99.9 },
    { name: "YouTube Premium", price: 20.9 },
    { name: "Deezer Premium", price: 16.9 },
    { name: "Spotify Premium", price: 19.9 },
    { name: "PlayPlus (Record)", price: 15.9 },
  ]

  const streamingLogos = [
    { name: "Netflix", src: "/logos/netflix.jpeg" },
    { name: "Prime Video", src: "/logos/amazon-prime.png" },
    { name: "Disney+", src: "/logos/disney-plus.png" },
    { name: "Globoplay", src: "/logos/globoplay.jpeg" },
    { name: "Star+", src: "/logos/star-plus.webp" },
    { name: "Paramount+", src: "/logos/paramount-plus.png" },
    { name: "Apple TV+", src: "/logos/apple-tv.png" },
    { name: "Lionsgate+", src: "/logos/lionsgate-plus.webp" },
    { name: "DAZN", src: "/logos/dazn.jpeg" },
    { name: "TNT Sports", src: "/logos/tnt-sports.png" },
    { name: "Premiere", src: "/logos/premiere.png" },
  ]

  const totalPrice = platforms.reduce((sum, platform) => sum + platform.price, 0)

  const handleWhatsAppClick = () => {
    const params = new URLSearchParams(window.location.search)
    const utms = {
      utm_source: params.get("utm_source") || "desconhecido",
      utm_medium: params.get("utm_medium") || "desconhecido",
      utm_campaign: params.get("utm_campaign") || "desconhecido",
      utm_content: params.get("utm_content") || "desconhecido",
    }

    const message = `Olá, vim pelo site, gostaria de realizar um teste.

🔍 Fonte: ${utms.utm_source}
💰 Meio: ${utms.utm_medium}
🎯 Campanha: ${utms.utm_campaign}
📢 Anúncio: ${utms.utm_content}`

    const encodedMessage = encodeURIComponent(message.trim())
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511989796945&text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-4 text-center shadow-2xl">
          <div className="animate-pulse">
            <span className="text-lg font-bold">🔥 NOVA TECNOLOGIA OTT - ACESSO LIBERADO POR TEMPO LIMITADO! 🔥</span>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Título Principal Animado */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight animate-fade-in-up">
              <span className="inline-block animate-bounce-slow bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                DESCUBRA COMO LIBERAR
              </span>
              <br />
              <span className="inline-block animate-pulse bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent glow-text">
                TODAS AS PLATAFORMAS
              </span>
              <br />
              <span className="inline-block animate-bounce-slow bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                COM A NOVA TECNOLOGIA
              </span>
              <br />
              <span className="inline-block animate-pulse bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent glow-text-yellow text-7xl">
                OTT
              </span>
            </h1>
          </div>

          {/* VSL - Player de Vídeo */}
          <div className="mb-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-500 animate-glow-border">
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    id="panda-24e32f4e-4307-4334-8b03-3ef5488bf103"
                    src="https://player-vz-e16bd649-1af.tv.pandavideo.com.br/embed/?v=24e32f4e-4307-4334-8b03-3ef5488bf103"
                    style={{
                      border: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                    allowFullScreen={true}
                    muted
                    playsInline
                    fetchPriority="high"
                    title="Vídeo de Apresentação da Tecnologia OTT"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contador de Pessoas Assistindo Animado */}
          <div className="text-center mb-8">
            <div className="inline-block relative animate-bounce-gentle">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-pink-500 to-red-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-red-400">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <Users className="w-5 h-5 animate-bounce" />
                  <span className="font-black text-lg bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-number-glow">
                    {viewersCount.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold animate-pulse">pessoas assistindo agora</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Bloqueado (Formato de Botão) - ABAIXO DO CONTADOR DE PESSOAS */}
          {!contentUnlocked ? (
            <div className="text-center mb-16">
              <div className="bg-slate-800/50 border-slate-700/50 rounded-full shadow-lg flex items-center justify-center px-6 py-3 mx-auto max-w-xs animate-fade-in-up">
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse-slow">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs font-semibold whitespace-nowrap">
                    O TESTE SERÁ DESBLOQUEADO EM BREVE
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Call to Action */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
              📺 ASSISTA O VÍDEO PARA LIBERAR O <span className="text-green-400 animate-pulse">TESTE GRÁTIS</span>
            </h2>
            <p className="text-xl text-gray-300 font-medium animate-fade-in-delay">
              DESCUBRA COMO TER ACESSO A TODAS AS PLATAFORMAS POR UMA FRAÇÃO DO PREÇO
            </p>
          </div>

          {/* Carrossel de Logos das Plataformas com Logos Oficiais */}
          <div className="mb-16 overflow-hidden">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              🎬 Todas essas plataformas em um só lugar:
            </h3>
            <div className="relative">
              <div className="flex animate-scroll-infinite items-center">
                {/* Primeira sequência */}
                {streamingLogos.map((platform, index) => (
                  <div
                    key={`first-${index}`}
                    className={`flex-shrink-0 mx-4 w-48 h-32 flex items-center justify-center`}
                  >
                    <img
                      src={platform.src || "/placeholder.svg"}
                      alt={platform.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg" // Fallback to a generic placeholder
                        e.currentTarget.onerror = null // Prevent infinite loop if placeholder also fails
                        console.error(
                          `Failed to load image: ${platform.name} (${platform.src}). Falling back to placeholder.`,
                        )
                      }}
                    />
                  </div>
                ))}
                {/* Segunda sequência para loop infinito */}
                {streamingLogos.map((platform, index) => (
                  <div
                    key={`second-${index}`}
                    className={`flex-shrink-0 mx-4 w-48 h-32 flex items-center justify-center`}
                  >
                    <img
                      src={platform.src || "/placeholder.svg"}
                      alt={platform.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg" // Fallback to a generic placeholder
                        e.currentTarget.onerror = null // Prevent infinite loop if placeholder also fails
                        console.error(
                          `Failed to load image: ${platform.name} (${platform.src}). Falling back to placeholder.`,
                        )
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animation de Desbloqueio */}
          {showUnlockAnimation && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-pulse mb-8">
                  <Unlock className="w-16 h-16 text-white animate-bounce" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">🎉 CONTEÚDO DESBLOQUEADO!</h2>
                <p className="text-xl text-gray-300 mb-6">Agora você pode ver todas as informações exclusivas.</p>
                <p className="text-xl text-yellow-300 font-bold animate-pulse">
                  Role para baixo e clique no botão "TESTE GRÁTIS" para começar!
                </p>
              </div>
            </div>
          )}

          {/* Conteúdo Desbloqueado (o que aparece depois do timer) */}
          {contentUnlocked ? (
            <div className="space-y-12">
              {/* Dispositivos Compatíveis */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-center text-white mb-10 animate-fade-in-up">
                  📱 Funciona em todos os dispositivos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Smartphone, name: "Celular (iOS e Android)" },
                    { icon: Monitor, name: "Computador (Windows, macOS e Linux)" },
                    { icon: Tv, name: "Smart TV" },
                    { icon: Monitor, name: "Tablet (iOS e Android)" },
                    { icon: Usb, name: "Amazon Fire Stick" },
                    { icon: Box, name: "TV BOX" },
                  ].map((device, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all hover:scale-105 animate-fade-in-up"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                          <device.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white font-semibold text-lg">{device.name}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Depoimentos */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-white mb-10 text-center">
                  ⭐ O que nossos clientes estão dizendo
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      name: "Carlos M.",
                      location: "São Paulo, SP",
                      text: "Incrível! Agora tenho acesso a tudo que quero assistir por um preço que cabe no meu bolso. Recomendo!",
                      initial: "C",
                    },
                    {
                      name: "Ana L.",
                      location: "Rio de Janeiro, RJ",
                      text: "Estava gastando quase R$ 1000 por mês com streaming. Agora pago apenas R$ 30 e tenho tudo!",
                      initial: "A",
                    },
                  ].map((testimonial, index) => (
                    <Card key={index} className="bg-slate-800 border-slate-700 hover:scale-105 transition-transform">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-300 mb-6 text-lg">"{testimonial.text}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.initial}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                            <div className="text-gray-400">{testimonial.location}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Seção de Preços */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-center text-white mb-8 animate-fade-in">
                    💸 IMAGINA TER QUE PAGAR POR:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {platforms.map((platform, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-slate-700 p-3 rounded-xl animate-fade-in-up hover:scale-105 transition-transform"
                        style={
                          {
                            animationDelay: `${0.1 * index}s`,
                            "--item-delay": `${0.1 * index}s`,
                          } as React.CSSProperties
                        }
                      >
                        <span className="text-white font-medium text-sm">{platform.name}:</span>
                        <span
                          className="text-red-400 font-bold text-base relative animated-price-strikethrough"
                          style={
                            {
                              "--strikethrough-delay": `calc(var(--item-delay) + 0.5s)`,
                            } as React.CSSProperties
                          }
                        >
                          R$ {platform.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-2xl animate-pulse">
                    <h4 className="text-2xl font-bold text-white mb-3">
                      Ter acesso a todas essas plataformas custaria:
                    </h4>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-300 mb-2 animate-number-glow">
                      R$ {totalPrice.toFixed(2)}
                    </div>
                    <div className="text-lg md:text-xl text-red-100 font-semibold">MENSAL</div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparação de Preços */}
              <Card className="bg-gradient-to-br from-green-600 to-emerald-600">
                <CardContent className="p-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    🎯 Com o OTT você tem tudo isso por apenas:
                  </h3>

                  <div className="bg-white/10 p-8 rounded-2xl mb-8">
                    <div className="text-5xl md:text-6xl lg:text-7xl font-black text-yellow-300 mb-4">R$ 30,00</div>
                    <div className="text-xl md:text-2xl text-green-100 font-bold">MENSAL</div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {["Todas as plataformas", "Qualidade HD/4K", "Suporte 24/7"].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-white bg-white/10 p-4 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-yellow-300" />
                        <span className="font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all"
                  >
                    🚀 TESTE GRÁTIS
                  </Button>
                </CardContent>
              </Card>

              {/* CTA Final */}
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600">
                <CardContent className="p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">🎬 COMECE SEU TESTE GRÁTIS AGORA!</h2>
                  <p className="text-purple-100 mb-8 text-base md:text-lg">
                    Não perca tempo pagando caro por cada plataforma separadamente
                  </p>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black text-xl md:text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all animate-bounce"
                  >
                    🚀 TESTE GRÁTIS
                  </Button>
                  <p className="text-purple-100 text-sm md:text-base mt-6">
                    ✅ Sem compromisso • ✅ Cancelamento fácil • ✅ Suporte incluído
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm mt-16 pt-8 border-t border-slate-800">
            <p>© 2024 - Tecnologia OTT - Todos os direitos reservados</p>
            <p className="mt-2">Este serviço oferece acesso a conteúdo através de tecnologia OTT (Over-The-Top).</p>
          </footer>
        </div>

        <style jsx>{`
          @keyframes bounce-slow {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fade-in-delay {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes glow-border {
            0%, 100% { border-color: #a855f7; box-shadow: 0 0 20px #a855f7; }
            50% { border-color: #ec4899; box-shadow: 0 0 30px #ec4899; }
          }
          
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @keyframes number-glow {
            0%, 100% { text-shadow: 0 0 10px #fbbf24; }
            50% { text-shadow: 0 0 20px #f59e0b, 0 0 30px #f59e0b; }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes pulse-bar {
            0%, 100% { box-shadow: 0 0 5px rgba(68, 220, 150, 0.5); }
            50% { box-shadow: 0 0 15px rgba(68, 220, 150, 0.8); }
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 2s infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
          
          .animate-fade-in {
            animation: fade-in 1.5s ease-out;
          }
          
          .animate-fade-in-delay {
            animation: fade-in-delay 2s ease-out;
          }
          
          .animate-glow-border {
            animation: glow-border 2s infinite;
          }
          
          .animate-scroll-infinite {
            animation: scroll-infinite 20s linear infinite;
            white-space: nowrap;
            width: max-content;
          }
          
          .animate-number-glow {
            animation: number-glow 2s infinite;
          }
          
          .glow-text {
            text-shadow: 0 0 20px #10b981, 0 0 40px #10b981, 0 0 60px #10b981;
          }
          
          .glow-text-yellow {
            text-shadow: 0 0 20px #f59e0b, 0 0 40px #f59e0b, 0 0 60px #f59e0b;
          }

          /* Novas animações para o traço nos preços */
          @keyframes draw-strikethrough {
            0% { transform: scaleX(0) translateY(-50%); opacity: 0; }
            100% { transform: scaleX(1) translateY(-50%); opacity: 1; }
          }

          .animated-price-strikethrough {
            position: relative;
            display: inline-block;
          }

          .animated-price-strikethrough::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(to right, #ff0000, #ff7f00);
            transform: scaleX(0) translateY(-50%);
            transform-origin: left center;
            animation: draw-strikethrough 0.4s ease-out forwards;
            animation-delay: var(--strikethrough-delay);
            opacity: 0;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  )
}
