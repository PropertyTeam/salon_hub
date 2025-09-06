'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Store } from '@/types'

interface StoreCardProps {
  store: Store
  onClick?: () => void
}

const serviceIcons = {
  hair: '✂️',
  nail: '💅',
  eyelash: '👁️',
  massage: '🌿',
  esthetic: '🧴',
}

export function StoreCard({ store, onClick }: StoreCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={onClick}
    >
      <div className="h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white relative overflow-hidden">
        <div className="text-center">
          <div className="text-5xl mb-2">{serviceIcons.hair}</div>
          <span className="text-lg font-semibold">美容室・ヘアサロン</span>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          <Badge variant="info" className="text-xs">
            美容室・ヘアサロン
          </Badge>

          <h3 className="text-lg font-semibold text-gray-800">
            {store.name}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3">
            {store.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm text-gray-600">
                4.8 (124件)
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-800">
              ¥5,000〜
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}