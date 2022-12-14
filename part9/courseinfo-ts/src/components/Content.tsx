import { CourseParts } from '../types'

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
