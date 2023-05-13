import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks"

export const AddNewBtn = () => {

    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();


    const handleClickModal = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Ariel'
            }
        });

        openDateModal();
    }

    return (
        <button 
            className="btn btn-primary fab"
            onClick={ handleClickModal }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
