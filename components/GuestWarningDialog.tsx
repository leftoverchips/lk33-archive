'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface GuestWarningDialogProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

export function GuestWarningDialog({ isOpen, onClose, isDarkMode }: GuestWarningDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-black"}`}>
        <DialogHeader>
          <DialogTitle className={`${isDarkMode ? "text-white" : "text-black"}`}>
            Access Restricted
          </DialogTitle>
        </DialogHeader>
        
        <Alert className={`mb-4 ${isDarkMode ? "bg-red-900/20 border-red-800 text-red-200" : "bg-red-50 border-red-200 text-red-800"}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Only authenticated admin users can add videos. Please login to continue.
          </AlertDescription>
        </Alert>

        <Button
          onClick={onClose}
          className={`w-full ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}
