import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getHealth, getMemories, getMessages, postChat, seedMemories } from '../services/api'
import type { Category, Message } from '../types'

export const useHealth = () => useQuery({ queryKey: ['health'], queryFn: getHealth, retry: false })

export const useMessages = () => useQuery({ queryKey: ['messages'], queryFn: getMessages })

export const useMemories = (q: string, category: Category | 'all', refetchMs?: number) =>
  useQuery({
    queryKey: ['memories', q, category],
    queryFn: () => getMemories(q, category),
    refetchInterval: refetchMs,
  })

export const useSendChat = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: postChat,
    onSuccess: (data) => {
      qc.setQueryData<Message[]>(['messages'], (old) => [...(old ?? []), ...data.messages])
      qc.invalidateQueries({ queryKey: ['memories'] })
    },
  })
}

export const useSeed = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: seedMemories,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['memories'] }),
  })
}

export const useDebounced = <T,>(value: T, delay: number): T => {
  const [state, setState] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setState(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return state
}
