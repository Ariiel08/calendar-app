import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesEN, localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal, AddNewBtn, DeleteBtn } from '../';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';

export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUIStore();
    const [defaultView] = useState(localStorage.getItem('defaultView') || 'month');

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor: isMyEvent ? '#2ed866' : '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        openDateModal();
    }

    const onSelect = (e) => {
        setActiveEvent(e);
    }

    const onViewChanged = (e) => {
        localStorage.setItem('defaultView', e);
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);
    

    return (
        <>
            <Navbar />

            <Calendar
                className="calendar"
                defaultView={defaultView}
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesEN() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
            <AddNewBtn />
            <DeleteBtn />

        </>
    )
}
