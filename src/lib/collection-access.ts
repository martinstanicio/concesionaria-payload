import type { Access } from 'payload'

export const nobody: Access = () => false

export const anybody: Access = () => true

export const currentUser: Access = ({ req: { user }, id }) => {
  if (!user) return false

  return user.id === id
}

export const currentUserOrSeller: Access = ({ req: { user }, id }) => {
  if (!user) return false

  return user.id === id || user.role === 'seller'
}

export const currentUserOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false

  return user.id === id || user.role === 'admin'
}

export const seller: Access = ({ req: { user } }) => {
  if (!user) return false

  return user.role === 'seller'
}

export const sellerOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  return user.role === 'seller' || user.role === 'admin'
}

export const admin: Access = ({ req: { user } }) => {
  if (!user) return false

  return user.role === 'admin'
}
