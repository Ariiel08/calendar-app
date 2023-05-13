import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesEN, localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal, AddNewBtn, DeleteBtn } from '../';
import { useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';

export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore();
    const { openDateModal } = useUIStore();
    const [defaultView] = useState(localStorage.getItem('defaultView') || 'month');

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#347CF7',
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
