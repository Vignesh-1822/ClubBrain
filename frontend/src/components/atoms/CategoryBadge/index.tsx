import { getCategoryIcon, getCategoryMeta } from '../../../lib/category'
import type { Category } from '../../../types'

export default function CategoryBadge({ category }: { category: Category }) {
  const meta = getCategoryMeta(category)
  const Icon = getCategoryIcon(category)
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10.5px] font-medium ring-1 ring-inset ${meta.tile}`}>
      <Icon size={10} strokeWidth={2.4} />
      {meta.label}
    </span>
  )
}
