import Part from './Part'
import { CoursePart } from '../types'

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <div className="padding" key={course.name}>
          <Part course={course} />
        </div>
      ))}
    </div>
  )
}

export default Content
