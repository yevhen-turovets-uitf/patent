import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment";
import MomentUtils from '@date-io/moment';

import "moment/locale/ru";
moment.locale("ru");

export default React.memo( CustomDatePicker );

function CustomDatePicker (props) {
  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      locale="ru"
    >
      <KeyboardDatePicker {...props} />
    </MuiPickersUtilsProvider>
  );
};