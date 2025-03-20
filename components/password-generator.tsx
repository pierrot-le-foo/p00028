"use client"

import { useState } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { generatePassword } from "@/lib/password-utils"

interface PasswordGeneratorProps {
  onSelectPassword?: (password: string) => void
}

export function PasswordGenerator({ onSelectPassword }: PasswordGeneratorProps) {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleGeneratePassword = () => {
    const newPassword = generatePassword({
      length,
      uppercase: includeUppercase,
      lowercase: includeLowercase,
      numbers: includeNumbers,
      symbols: includeSymbols,
    })
    setPassword(newPassword)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate a password on initial render
  if (!password) {
    handleGeneratePassword()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>Create strong, secure passwords for your accounts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="bg-muted p-3 rounded-md flex-1 font-mono text-sm overflow-x-auto">
            {password || "Click generate to create a password"}
          </div>
          <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length">Length: {length}</Label>
            </div>
            <Slider
              id="length"
              min={8}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
                disabled={!includeLowercase && !includeNumbers && !includeSymbols}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
                disabled={!includeUppercase && !includeNumbers && !includeSymbols}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">Numbers (0-9)</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
                disabled={!includeUppercase && !includeLowercase && !includeSymbols}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
                disabled={!includeUppercase && !includeLowercase && !includeNumbers}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleGeneratePassword}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New
        </Button>

        {onSelectPassword && <Button onClick={() => onSelectPassword(password)}>Use This Password</Button>}
      </CardFooter>
    </Card>
  )
}

