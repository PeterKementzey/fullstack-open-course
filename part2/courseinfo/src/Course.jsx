const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.name} {...part} />)

const Course = ({ course }) => {
    return <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>
}

export default Course
