import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours  } from 'date-fns';
import { getMessagesEN, localizer } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal } from '../';
import { useState } from 'react';


const events = [{
    title: `John's Birthday`,
    notes: 'Buy the cake',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Ariel'
    }
}];

export const CalendarPage = () => {

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
        console.log({ doubleClick: e });
    }

    const onSelect = (e) => {
        console.log({ click: e });
    }

    const onViewChanged = (e) => {
        localStorage.setItem('defaultView', e);
    }

    return (
        <>
            <Navbar />

            <Calendar
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

        </>
    )
}
