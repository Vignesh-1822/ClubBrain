import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getHealth, getMemories, getMessages, postChat, postResetChat, postWelcome, seedMemories } from '../services/api'
import type { ChatResponse, MemoryFilter, Message } from '../types'

export const useHealth = () => useQuery({ queryKey: ['health'], queryFn: getHealth, retry: false })

export const useMessages = () => useQuery({ queryKey: ['messages'], queryFn: getMessages })

export const useMemories = (q: string, category: MemoryFilter, refetchMs?: number) =>
  useQuery({
    queryKey: ['memories', q, category],
    queryFn: () => getMemories(q, category),
    refetchInterval: refetchMs,
  })

/** Appends server-returned messages to the cached thread. */
const useAppendMessages = () => {
  const qc = useQueryClient()
  return (data: ChatResponse) => {
    qc.setQueryData<Message[]>(['messages'], (old) => [...(old ?? []), ...data.messages])
    qc.invalidateQueries({ queryKey: ['memories'] })
  }
}

export const useSendChat = () => {
  const append = useAppendMessages()
  return useMutation({ mutationKey: ['chat'], mutationFn: postChat, onSuccess: append })
}

export const useWelcome = () => {
  const append = useAppendMessages()
  return useMutation({ mutationKey: ['welcome'], mutationFn: postWelcome, onSuccess: append })
}

export const useResetChat = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: postResetChat,
    onSettled: async () => {
      await qc.refetchQueries({ queryKey: ['messages'] })
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
