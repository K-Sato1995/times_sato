import styled from 'styled-components'

const CalendarWrapper = styled.div`
  .fc {
    box-sizing: border-box;
    max-height: 600px;

    th {
      background-color: #f7f8fc;
    }
    .fc-daygrid-event-dot {
      border-color: ${(props) => props.theme.primaryColor};
    }
    .fc-list-day-cushion {
      background-color: #f7f8fc;
    }

    .fc-toolbar.fc-header-toolbar {
      margin-bottom: 0.8rem;
    }

    .fc-toolbar.fc-footer-toolbar {
      margin-top: 0.8rem;
    }

    .fc-toolbar-title {
      font-size: 1.7rem;
    }

    .fc-button-primary {
      background-color: #fff;
      border: none;
      box-shadow: none;
      outline: none;
      color: #212329;

      :focus,
      :not(:disabled):active:focus,
      :not(:disabled):active,
      :hover,
      :not(:disabled).fc-button-active,
      :not(:disabled).fc-button-active:focus {
        background-color: #fff;
        color: #212329;
        box-shadow: none;
        outline: none;
        border-radius: 0;
      }

      :not(:disabled).fc-button-active {
        border-bottom: solid 2px #212329;
      }
    }
  }
`

export default CalendarWrapper
