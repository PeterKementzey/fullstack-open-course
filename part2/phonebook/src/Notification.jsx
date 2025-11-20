const Notification = ({ message, isError }) => {
    const style = {
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return <div style={style}>{message}</div>
}

const Notifications = ({ notifications }) => notifications.map((n) => <Notification key={n.id} {...n} />)

export default Notifications
