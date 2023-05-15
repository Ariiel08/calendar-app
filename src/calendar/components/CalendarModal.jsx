import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import 'sweetalert2/dist/sweetalert2.min.css';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useCalendarStore, useUIStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal  } = useUIStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [ formSubmitted, setformSubmitted ] = useState(false);

    const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';
        
    }, [ formValues.title, formSubmitted ]);

    useEffect(() => {
      if ( activeEvent !== null ){
        setFormValues({ ...activeEvent });
      }
    
      return () => {
        
      }
    }, [ activeEvent ])
    

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    } 
    
    const onDateChange = ( event, input ) => {
        setFormValues({
            ...formValues,
            [input]: event
        });
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setformSubmitted(true);

        const dateDiff = differenceInSeconds( formValues.end, formValues.start );
        
        if (isNaN(dateDiff) || dateDiff <= 0) {
            Swal.fire('Invalid dates', 'Check the dates submitted', 'error');
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent( formValues );
        closeDateModal();
        setformSubmitted(false);
    }

    return (
        <Modal 
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-bg"
            closeTimeoutMS={ 200 }
        >

            <h1> New event </h1>
            <hr />

            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Start datetime</label>
                    <DatePicker 
                        selected={ formValues.start }
                        className="form-control"
                        onChange={ (e) => onDateChange(e, 'start') }
                        dateFormat="Pp"
                        showTimeSelect
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End datetime</label>
                    <DatePicker 
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        className="form-control"
                        onChange={ (e) => onDateChange(e, 'end') }
                        dateFormat="Pp"
                        showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Details</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Title"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">A brief description.</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Info.</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
            
        </Modal>
    )
}
