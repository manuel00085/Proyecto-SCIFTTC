import {Calendar, dayjsLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs';
import "dayjs/locale/es"

dayjs.locale("es")




const Calendario = () => {

    const localizer = dayjsLocalizer(dayjs)

    return (
       <Calendar 
       localizer={localizer}
       style={{
        height:"70vh ",
        width:"150vh",
       }
       }
       messages={{
        next: "Siguiente",
        previous: "Anterior",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
      }}
       
       />
       
    );
  };
  
  export default Calendario;