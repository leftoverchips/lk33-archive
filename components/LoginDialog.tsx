'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LogIn, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginDialogProps {
  isDarkMode: boolean
}

export function LoginDialog({ isDarkMode }: LoginDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setIsOpen(false)
      setEmail('')
      setPassword('')
    }
    
    setLoading(false)
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-black"}`}
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-black"}`}>
        <DialogHeader>
          <DialogTitle className={`${isDarkMode ? "text-white" : "text-black"}`}>
            Admin Login
          </DialogTitle>
        </DialogHeader>
        
        <Alert className={`mb-4 ${isDarkMode ? "bg-yellow-900/20 border-yellow-800 text-yellow-200" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Only lk33 can login
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className={`${isDarkMode ? "text-white" : "text-black"}`}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className={`${isDarkMode ? "text-white" : "text-black"}`}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
              required
            />
          </div>

          {error && (
            <Alert className={`${isDarkMode ? "bg-red-900/20 border-red-800 text-red-200" : "bg-red-50 border-red-200 text-red-800"}`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={`w-full ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
