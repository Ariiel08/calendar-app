import { useCalendarStore } from "../../hooks"

export const DeleteBtn = () => {

    const { startDeletingEvent, isEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{
                display: isEventSelected ? '': 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
