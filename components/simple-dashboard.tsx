"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, LogOut, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function SimpleDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for success message
    const successMessage = sessionStorage.getItem("auth_success")
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
      })
      sessionStorage.removeItem("auth_success")
    }
  }, [toast])

  const handleLogout = () => {
    // Clear auth token cookie
    document.cookie = "auth_token=; path=/; max-age=0"
    // Clear master password from session storage
    sessionStorage.removeItem("master_password")
    // Show logout toast
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
    // Reload the page to show login form
    window.location.reload()
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Shield className="mr-2 h-8 w-8 text-primary" />
          Password Vault
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Authentication Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Key className="h-16 w-16 text-primary mb-4" />
            <p className="text-xl font-medium mb-2">You've successfully unlocked your password vault</p>
            <p className="text-muted-foreground">
              This is a simplified dashboard to confirm that authentication is working properly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

