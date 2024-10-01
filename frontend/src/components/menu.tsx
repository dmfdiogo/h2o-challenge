'use client'
import React from 'react'
import Button from './layout/button'

import { useRouter, usePathname } from 'next/navigation'

interface ILink {
  label: string
  page: string
}

const Menu = () => {
  const router = useRouter()
  const pathname = usePathname()

  const getCurrentPageTextColor = (page: string) => {
    if (pathname === `/${page}`) {
      return 'text-white'
    }
  }

  const links: ILink[] = [
    {
      label: 'Dashboard',
      page: 'dashboard',
    },
    {
      label: 'Accounts',
      page: 'accounts',
    },
    {
      label: 'Customers',
      page: 'customers',
    },
    {
      label: 'Transactions',
      page: 'transactions',
    },
    {
      label: 'Transaction History',
      page: 'transaction-history',
    }
  ]

  return (
    <div className="flex min-h-screen min-w-[200px] flex-col gap-4 border-r-2 border-lightGreen bg-primary text-gray-400 p-4">
      <p className="text-white mb-4 font-bold">H2O Bank</p>
      {links.map((link: ILink) => {
        return (
          <Button
            key={link.page}
            className={`flex relative text-base transition-all hover:text-lg ease-in duration-100 ${getCurrentPageTextColor(link.page)}`}
            onClick={() => {
              router.push(`/${link.page}`)
            }}
          >
            {link.label}
          </Button>
        )
      })}
    </div>
  )
}

export default Menu
