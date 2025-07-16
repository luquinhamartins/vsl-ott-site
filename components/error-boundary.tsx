"use client"

import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erros
    // console.error("Erro capturado pelo Error Boundary:", error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback personalizada
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ops! Algo deu errado.</h2>
          <p className="text-lg mb-6">
            Pedimos desculpas pelo inconveniente. Por favor, tente recarregar a página ou entre em contato com o
            suporte.
          </p>
          <p className="text-sm text-gray-400">
            Se o problema persistir, por favor, nos informe o que você estava fazendo.
          </p>
          {/* Opcional: Mostrar detalhes do erro para depuração (remover em produção) */}
          {/* <details className="mt-4 text-left bg-slate-800 p-4 rounded-lg max-w-lg overflow-auto">
            <summary className="font-semibold cursor-pointer">Detalhes do Erro</summary>
            <pre className="whitespace-pre-wrap break-words text-red-300 text-xs mt-2">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details> */}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
