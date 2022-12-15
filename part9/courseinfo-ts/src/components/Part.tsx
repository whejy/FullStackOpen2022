import { CoursePart } from '../types'

// Exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ course }: { course: CoursePart }) => {
  function getCourseDetails() {
    switch (course.type) {
      case 'normal':
        return (
          <div>
            <i>{course.description}</i>
          </div>
        )
      case 'groupProject':
        return <div>Projects: {course.groupProjectCount}</div>
      case 'submission':
        return (
          <div>
            <i>{course.description}</i>
            <div>Submission: {course.exerciseSubmissionLink}</div>
          </div>
        )
      case 'special':
        return <div>Skill required: {course.requirements.join(', ')}</div>
      default:
        return assertNever(course)
    }
  }

  return (
    <div>
      <b>
        {course.name} {course.exerciseCount}
      </b>{' '}
      {getCourseDetails()}
    </div>
  )
}

export default Part
