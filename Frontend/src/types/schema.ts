import z from 'zod'

export const registerUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email({
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address',
  }),
  password: z
    .string('Password is required')
    .refine(
      val => {
        const hasMinLength = val.length >= 6
        const hasLower = /[a-z]/.test(val)
        const hasUpper = /[A-Z]/.test(val)
        const hasNumber = /\d/.test(val)
        const hasSymbol = /[^A-Za-z0-9]/.test(val)
        return hasMinLength && hasLower && hasUpper && hasNumber && hasSymbol
      },
      {
        message:
          'Password must be at least 6 characters long   and include uppercase, lowercase, number, and symbol.',
      }
    )
    .max(64, 'Password should not exceed 64 characters'),
})
export type RegisterUserInput = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
  email: z.email({
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address',
  }),
  password: z
    .string('Password is required')
    .refine(
      val => {
        const hasMinLength = val.length >= 6
        const hasLower = /[a-z]/.test(val)
        const hasUpper = /[A-Z]/.test(val)
        const hasNumber = /\d/.test(val)
        const hasSymbol = /[^A-Za-z0-9]/.test(val)
        return hasMinLength && hasLower && hasUpper && hasNumber && hasSymbol
      },
      {
        message:
          'Password must be at least 6 characters long   and include uppercase, lowercase, number, and symbol.',
      }
    )
    .max(64, 'Password should not exceed 64 characters'),
})
export type LoginUserInput = z.infer<typeof loginUserSchema>
