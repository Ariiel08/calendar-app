import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventDate } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { activeEvent, events } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if ( !calendarEvent.id ) {

                const { data } = await calendarApi.post('/events', calendarEvent);
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
    
                return;
            }
    
            await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
            dispatch( onUpdateEvent({ ...calendarEvent, user }) );
        } catch (error) {
            console.log(error);
            Swal.fire('Saving error', error.response.data.msg, 'error');
        }

        
    }

    const startDeletingEvent = async() => {
        try {
            
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Deleting error', error.response.data.msg, 'error');
        }

    }

    const startLoadingEvents = async() => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventDate( data.events );
            dispatch( onLoadEvents(events) );
            console.log(events);
            
        } catch (error) {
            console.log('Error loading events.');
            console.log(error);
        }
    }

    return {
        events,
        activeEvent,
        isEventSelected: !!activeEvent,
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
