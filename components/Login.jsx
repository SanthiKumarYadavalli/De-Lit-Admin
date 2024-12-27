'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    login();
    router.replace('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-64 relative">
        <Input
          type="password"
          placeholder="Enter password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-xl py-7 pr-12"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </form>
    </div>
  )
}

