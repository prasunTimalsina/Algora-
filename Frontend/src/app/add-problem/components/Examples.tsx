import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFormContext } from 'react-hook-form'

const Examples = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  // Helper function to safely get field errors
  const getFieldError = (
    language: 'JAVASCRIPT' | 'PYTHON' | 'JAVA',
    field: 'input' | 'output' | 'explanation'
  ) => {
    const exampleErrors = errors?.examples
    if (
      exampleErrors &&
      typeof exampleErrors === 'object' &&
      language in exampleErrors
    ) {
      const langErrors = (
        exampleErrors as Record<string, Record<string, { message?: string }>>
      )[language]
      return langErrors?.[field]
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-display)]">
          Examples
        </CardTitle>
        <CardDescription className="text-subtext-light">
          Provide examples to help users understand the problem for each
          language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>

          {/* JavaScript Examples */}
          <TabsContent value="javascript" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="examples.JAVASCRIPT.input">Input</Label>
                  <Textarea
                    id="examples.JAVASCRIPT.input"
                    placeholder="Enter input..."
                    {...register('examples.JAVASCRIPT.input')}
                    rows={3}
                    className={
                      getFieldError('JAVASCRIPT', 'input')
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {getFieldError('JAVASCRIPT', 'input') && (
                    <p className="text-red-500 text-xs mt-1">
                      Input is required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examples.JAVASCRIPT.output">Output</Label>
                  <Textarea
                    id="examples.JAVASCRIPT.output"
                    placeholder="Enter output..."
                    {...register('examples.JAVASCRIPT.output')}
                    rows={3}
                    className={
                      getFieldError('JAVASCRIPT', 'output')
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {getFieldError('JAVASCRIPT', 'output') && (
                    <p className="text-red-500 text-xs mt-1">
                      Output is required
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examples.JAVASCRIPT.explanation">
                  Explanation
                </Label>
                <Textarea
                  id="examples.JAVASCRIPT.explanation"
                  placeholder="Explain the example..."
                  {...register('examples.JAVASCRIPT.explanation')}
                  rows={3}
                  className={
                    getFieldError('JAVASCRIPT', 'explanation')
                      ? 'border-red-500'
                      : ''
                  }
                />
                {getFieldError('JAVASCRIPT', 'explanation') && (
                  <p className="text-red-500 text-xs mt-1">
                    Explanation is required
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Python Examples */}
          <TabsContent value="python" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="examples.PYTHON.input">Input</Label>
                  <Textarea
                    id="examples.PYTHON.input"
                    placeholder="Enter input..."
                    {...register('examples.PYTHON.input')}
                    rows={3}
                    className={
                      getFieldError('PYTHON', 'input') ? 'border-red-500' : ''
                    }
                  />
                  {getFieldError('PYTHON', 'input') && (
                    <p className="text-red-500 text-xs mt-1">
                      Input is required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examples.PYTHON.output">Output</Label>
                  <Textarea
                    id="examples.PYTHON.output"
                    placeholder="Enter output..."
                    {...register('examples.PYTHON.output')}
                    rows={3}
                    className={
                      getFieldError('PYTHON', 'output') ? 'border-red-500' : ''
                    }
                  />
                  {getFieldError('PYTHON', 'output') && (
                    <p className="text-red-500 text-xs mt-1">
                      Output is required
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examples.PYTHON.explanation">Explanation</Label>
                <Textarea
                  id="examples.PYTHON.explanation"
                  placeholder="Explain the example..."
                  {...register('examples.PYTHON.explanation')}
                  rows={3}
                  className={
                    getFieldError('PYTHON', 'explanation')
                      ? 'border-red-500'
                      : ''
                  }
                />
                {getFieldError('PYTHON', 'explanation') && (
                  <p className="text-red-500 text-xs mt-1">
                    Explanation is required
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Java Examples */}
          <TabsContent value="java" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="examples.JAVA.input">Input</Label>
                  <Textarea
                    id="examples.JAVA.input"
                    placeholder="Enter input..."
                    {...register('examples.JAVA.input')}
                    rows={3}
                    className={
                      getFieldError('JAVA', 'input') ? 'border-red-500' : ''
                    }
                  />
                  {getFieldError('JAVA', 'input') && (
                    <p className="text-red-500 text-xs mt-1">
                      Input is required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examples.JAVA.output">Output</Label>
                  <Textarea
                    id="examples.JAVA.output"
                    placeholder="Enter output..."
                    {...register('examples.JAVA.output')}
                    rows={3}
                    className={
                      getFieldError('JAVA', 'output') ? 'border-red-500' : ''
                    }
                  />
                  {getFieldError('JAVA', 'output') && (
                    <p className="text-red-500 text-xs mt-1">
                      Output is required
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examples.JAVA.explanation">Explanation</Label>
                <Textarea
                  id="examples.JAVA.explanation"
                  placeholder="Explain the example..."
                  {...register('examples.JAVA.explanation')}
                  rows={3}
                  className={
                    getFieldError('JAVA', 'explanation') ? 'border-red-500' : ''
                  }
                />
                {getFieldError('JAVA', 'explanation') && (
                  <p className="text-red-500 text-xs mt-1">
                    Explanation is required
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default Examples
