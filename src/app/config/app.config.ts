export let DATEPICKER_CONFIG: any = {
    clear: 'Limpiar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    monthsFull: ['Enero', 'Febebrero',
        'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    weekdaysFull: ['Domingo', 'Lúnes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysLetter: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15,    // Creates a dropdown of 10 years to control year,
    container: undefined,
    min: undefined,
    max: undefined
};
export let TIMEPICKER_CONFIG: Pickadate.TimeOptions  = {

    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Limpiar', // text for clear-button
    canceltext: 'Cancelar', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    container: undefined,
    min: undefined,
    max: undefined,
    format: 'h:i a',
    onClose : undefined

};

export const NGU_CAROUSEL_POINT = {
    visible: true,
    pointStyles: `
    .ngucarouselPoint {
      list-style-type: none;
      text-align: center;
      margin: 0;
      white-space: nowrap;
      overflow: auto;
      width: 100%;
      padding: 26px 0;
      box-sizing: border-box;
    }
    .ngucarouselPoint li {
      display: inline-block;
      border-radius: 8px;
      width:8px;
      height:8px;
      border:1px solid #fff;
      background: transparent;
      padding: 0px;
      margin: 0 4px;
      transition: .4s ease all;
    }
    .ngucarouselPoint li.active {
        background: #fff;
    }
    .ngucarouselPoint li:hover{
        opacity:0.5;
        cursor:pointer;
    }
    `
};

export const CONF_FILES = {
    imageExtensions: ['tiff', 'jpg', 'jpeg', 'png', 'svg'],
    videoExtensions: ['webm', 'ogg', 'mp4'],
    documentExtensions: ['doc', 'docx', 'odt', 'pdf'],
    maxFileSizeImage: 50,
    maxFileSizeVideo: 500,
    maxFileSizeDocument: 500
};

