import z from 'zod'

/**
 * Schema for user auth input validation
 */
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

/**
 * Schema for problem input validation
 */

export const problemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  constraints: z.string().min(1, 'Constraints are required'),
  hints: z.string().optional(),
  followUpQuestion: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, 'Input is required'),
        output: z.string().min(1, 'Output is required'),
      })
    )
    .min(1, 'At least one test case is required'),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, 'JavaScript code snippet is required'),
    PYTHON: z.string().min(1, 'Python code snippet is required'),
    JAVA: z.string().min(1, 'Java solution is required'),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, 'JavaScript solution is required'),
    PYTHON: z.string().min(1, 'Python solution is required'),
    JAVA: z.string().min(1, 'Java solution is required'),
  }),
})
export type TProblem = z.infer<typeof problemSchema>
