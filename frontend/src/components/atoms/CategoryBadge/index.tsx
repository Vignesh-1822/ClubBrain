import { CATEGORY_META } from '../../../lib/category'
import type { Category } from '../../../types'

export default function CategoryBadge({ category }: { category: Category }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.lesson
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.classes}`}>
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  )
}
