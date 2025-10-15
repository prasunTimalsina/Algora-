import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFormContext, Controller } from 'react-hook-form'
import { CodeEditor } from '@/components/code-editor'

const SolutionCode = () => {
  const { control } = useFormContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-display)]">
          Reference Solutions
        </CardTitle>
        <CardDescription className="text-subtext-light">
          Provide working solutions for each language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>

          <TabsContent value="javascript" className="mt-4">
            <Controller
              control={control}
              name="referenceSolutions.JAVASCRIPT"
              render={({ field }) => (
                <CodeEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  language="javascript"
                  height="400px"
                />
              )}
            />
          </TabsContent>

          <TabsContent value="python" className="mt-4">
            <Controller
              control={control}
              name="referenceSolutions.PYTHON"
              render={({ field }) => (
                <CodeEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  language="python"
                  height="400px"
                />
              )}
            />
          </TabsContent>

          <TabsContent value="java" className="mt-4">
            <Controller
              control={control}
              name="referenceSolutions.JAVA"
              render={({ field }) => (
                <CodeEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  language="cpp"
                  height="400px"
                />
              )}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SolutionCode
