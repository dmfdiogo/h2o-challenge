'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: any
  className?: string
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const getVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return "w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primaryLit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in"
        break
      case 'secondary':
        return 'rounded-sm border-offwhite2 border-2 p-2 text-offwhite'
      default:
        return "w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primaryLit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in"
        break
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className || getVariant(variant)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
