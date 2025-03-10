"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Heart, Camera } from "lucide-react"
import confetti from "canvas-confetti"

export default function ProposalPage() {
  const [response, setResponse] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  const handleProposal = () => {
    setResponse("Yes!")
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      })

      myConfetti({
        particleCount: 150,
        spread: 160,
        origin: { y: 0.6 },
        colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#f9bec7"],
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const Bubbles = () => {
    return (
      <div className="bubbles-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={
              {
                "--size": `${Math.random() * 60 + 20}px`,
                "--left": `${Math.random() * 100}%`,
                "--time": `${Math.random() * 8 + 4}s`,
                "--delay": `-${Math.random() * 2}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <Bubbles />

      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">Para Luísa ❤️</h1>

        <div className="mb-6">
          {imageUrl ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-2">
              <Image src={imageUrl || "/placeholder.svg"} alt="Us together" fill className="object-cover" />
            </div>
          ) : (
            <div
              onClick={triggerFileInput}
              className="w-full h-64 border-2 border-dashed border-pink-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors"
            >
              <Camera className="w-12 h-12 text-pink-400 mb-2" />
              <p className="text-pink-500">Click to add our photo</p>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-700">
            Desde o momento que nos conhecemos, voce me encheu de amor e de felicidades!
          </p>
          <p className="text-lg text-gray-700">
            Todos os dias com você são um presente, eu quero passar todos os meus dias com voce ao meu lado. Eu te amo demais meu amor!
          </p>
          <div className="flex justify-center">
            <Heart className="text-pink-500 w-8 h-8" />
          </div>
        </div>

        {!response ? (
          <button
            onClick={handleProposal}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            Você me ama?
          </button>
        ) : (
          <div className="animate-bounce">
            <div className="bg-pink-100 border border-pink-500 text-pink-700 px-6 py-4 rounded-lg text-2xl font-bold">
              {response} Eu te amo muito ❤️
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

