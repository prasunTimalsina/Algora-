import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useFormContext } from 'react-hook-form'

const AdditionalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-display)]">
          Additional Information
        </CardTitle>
        <CardDescription className="text-subtext-light">
          Add any additional constraints, hints, or follow-up questions for the
          problem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="constraints">Constraints</Label>
          <Textarea
            id="constraints"
            placeholder="Enter problem constraints..."
            {...register('constraints')}
            rows={4}
            className={errors?.constraints ? 'border-red-500' : ''}
          />
          {errors?.constraints && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.constraints.message || 'Constraints are required')}
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="hints">Hints (Optional)</Label>
          <Textarea
            id="hints"
            placeholder="Provide helpful hints for solving the problem..."
            {...register('hints')}
            rows={3}
          />
          <p className="text-xs text-gray-500">
            You can provide multiple hints separated by new lines
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="followUpQuestion">
            Follow-up Question (Optional)
          </Label>
          <Textarea
            id="followUpQuestion"
            placeholder="Add a follow-up question to extend the problem..."
            {...register('followUpQuestion')}
            rows={3}
          />
          <p className="text-xs text-gray-500">
            Suggest improvements or variations to challenge advanced users
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalInformation
