import { currentUserOrAdmin, admin } from '@/lib/collection-access'
import config from '@/payload.config'
import { getPayload } from 'payload'
import type { CollectionConfig, Where } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', es: 'Usuario' },
    plural: { en: 'Users', es: 'Usuarios' },
  },
  admin: {
    defaultColumns: ['name', 'role', 'email'],
    description: {
      en: 'This collection contains the users of the system.',
      es: 'Esta colección contiene los usuarios del sistema.',
    },
    hideAPIURL: true,
    useAsTitle: 'name',
  },
  auth: { loginWithUsername: false },
  fields: [
    {
      label: { en: 'Name', es: 'Nombre' },
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: { en: 'Role', es: 'Rol' },
      name: 'role',
      type: 'select',
      options: [
        {
          label: { en: 'Admin', es: 'Administrador' },
          value: 'admin',
        },
        {
          label: { en: 'Seller', es: 'Vendedor' },
          value: 'seller',
        },
      ],
      defaultValue: 'seller',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      hooks: {
        beforeChange: [
          async ({ value, operation, originalDoc }) => {
            // If the user being created or updated has already been assigned
            // the admin role, there's no need to check for other admins
            if (value === 'admin') return value

            let where: Where = { role: { equals: 'admin' } }
            if (operation === 'update' && originalDoc && originalDoc.id) {
              where = { ...where, id: { not_equals: originalDoc.id } }
            }

            // UPDATE: If the current user is an admin, it will be excluded from the count
            const payload = await getPayload({ config })
            const admins = await payload.count({ collection: 'users', where })

            // CREATE: If there are no admins in the system, set the role to admin
            // UPDATE: If there are no other admins in the system, keep the role as admin
            if (admins.totalDocs === 0) return 'admin'

            return value
          },
        ],
      },
    },
  ],
  access: {
    create: admin,
    read: currentUserOrAdmin,
    update: currentUserOrAdmin,
    delete: admin,
    unlock: admin,
  },
}
