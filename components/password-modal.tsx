"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff, Shield, Info } from "lucide-react"

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (passwordConfig: PasswordConfig) => void
  isGenerating: boolean
}

export interface PasswordConfig {
  enabled: boolean
  userPassword?: string
  ownerPassword?: string
  permissions: {
    printing: boolean
    modifying: boolean
    copying: boolean
    annotating: boolean
  }
}

export function PasswordModal({ isOpen, onClose, onConfirm, isGenerating }: PasswordModalProps) {
  const [passwordConfig, setPasswordConfig] = useState<PasswordConfig>({
    enabled: false,
    userPassword: "",
    ownerPassword: "",
    permissions: {
      printing: true,
      modifying: false,
      copying: true,
      annotating: false,
    },
  })

  const [showUserPassword, setShowUserPassword] = useState(false)
  const [showOwnerPassword, setShowOwnerPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validatePasswords = (): boolean => {
    const newErrors: string[] = []

    if (passwordConfig.enabled) {
      if (!passwordConfig.userPassword || passwordConfig.userPassword.length < 4) {
        newErrors.push("User password must be at least 4 characters long")
      }

      if (!passwordConfig.ownerPassword || passwordConfig.ownerPassword.length < 4) {
        newErrors.push("Owner password must be at least 4 characters long")
      }

      if (
        passwordConfig.userPassword &&
        passwordConfig.ownerPassword &&
        passwordConfig.userPassword === passwordConfig.ownerPassword
      ) {
        newErrors.push("User and owner passwords must be different")
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleConfirm = () => {
    if (validatePasswords()) {
      onConfirm(passwordConfig)
    }
  }

  const handlePasswordToggle = (enabled: boolean) => {
    setPasswordConfig((prev) => ({
      ...prev,
      enabled,
      userPassword: enabled ? prev.userPassword : "",
      ownerPassword: enabled ? prev.ownerPassword : "",
    }))
    setErrors([])
  }

  const handlePermissionChange = (permission: keyof PasswordConfig["permissions"], checked: boolean) => {
    setPasswordConfig((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            PDF Security Settings
          </DialogTitle>
          <DialogDescription>Protect your PDF with password encryption and set document permissions.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enable Password Protection */}
          <div className="flex items-center space-x-2">
            <Checkbox id="enable-password" checked={passwordConfig.enabled} onCheckedChange={handlePasswordToggle} />
            <Label htmlFor="enable-password" className="text-sm font-medium">
              Enable password protection
            </Label>
          </div>

          {passwordConfig.enabled && (
            <>
              {/* User Password */}
              <div className="space-y-2">
                <Label htmlFor="user-password" className="text-sm font-medium">
                  User Password
                </Label>
                <div className="relative">
                  <Input
                    id="user-password"
                    type={showUserPassword ? "text" : "password"}
                    placeholder="Enter password to open PDF"
                    value={passwordConfig.userPassword}
                    onChange={(e) => setPasswordConfig((prev) => ({ ...prev, userPassword: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowUserPassword(!showUserPassword)}
                  >
                    {showUserPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Required to open and view the PDF</p>
              </div>

              {/* Owner Password */}
              <div className="space-y-2">
                <Label htmlFor="owner-password" className="text-sm font-medium">
                  Owner Password
                </Label>
                <div className="relative">
                  <Input
                    id="owner-password"
                    type={showOwnerPassword ? "text" : "password"}
                    placeholder="Enter password for full access"
                    value={passwordConfig.ownerPassword}
                    onChange={(e) => setPasswordConfig((prev) => ({ ...prev, ownerPassword: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                  >
                    {showOwnerPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Required to modify permissions and settings</p>
              </div>

              {/* Permissions */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Document Permissions</Label>
                <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allow-printing"
                      checked={passwordConfig.permissions.printing}
                      onCheckedChange={(checked) => handlePermissionChange("printing", checked as boolean)}
                    />
                    <Label htmlFor="allow-printing" className="text-sm">
                      Allow printing
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allow-copying"
                      checked={passwordConfig.permissions.copying}
                      onCheckedChange={(checked) => handlePermissionChange("copying", checked as boolean)}
                    />
                    <Label htmlFor="allow-copying" className="text-sm">
                      Allow copying text and images
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allow-modifying"
                      checked={passwordConfig.permissions.modifying}
                      onCheckedChange={(checked) => handlePermissionChange("modifying", checked as boolean)}
                    />
                    <Label htmlFor="allow-modifying" className="text-sm">
                      Allow document modification
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allow-annotating"
                      checked={passwordConfig.permissions.annotating}
                      onCheckedChange={(checked) => handlePermissionChange("annotating", checked as boolean)}
                    />
                    <Label htmlFor="allow-annotating" className="text-sm">
                      Allow adding comments and annotations
                    </Label>
                  </div>
                </div>
              </div>

              {/* Info Alert */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>User Password:</strong> Required to open the PDF.
                  <br />
                  <strong>Owner Password:</strong> Allows full access and permission changes.
                  <br />
                  Both passwords must be at least 4 characters and different from each other.
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-xs">
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isGenerating} className="min-w-[120px]">
            {isGenerating ? (
              <>
                <Lock className="w-4 h-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Generate PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
