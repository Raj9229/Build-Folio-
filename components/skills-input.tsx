"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface SkillsInputProps {
  skills: string[]
  onSkillsChange: (skills: string[]) => void
}

export function SkillsInput({ skills, onSkillsChange }: SkillsInputProps) {
  const [currentSkill, setCurrentSkill] = useState("")

  const addSkill = useCallback(() => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      onSkillsChange([...skills, currentSkill.trim()])
      setCurrentSkill("")
    }
  }, [currentSkill, skills, onSkillsChange])

  const removeSkill = useCallback(
    (skillToRemove: string) => {
      onSkillsChange(skills.filter((skill) => skill !== skillToRemove))
    },
    [skills, onSkillsChange],
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addSkill()
      }
    },
    [addSkill],
  )

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Add a skill"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-600">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
