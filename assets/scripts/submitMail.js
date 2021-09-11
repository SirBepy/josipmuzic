// TODO: Add logic from smth like "simple javascript spredsheet form submission"
// e.g. https://dev.to/omerlahav/submit-a-form-to-a-google-spreadsheet-1bia


const SPREADSHEET_ID = '12FRjg3LepFIrx41fOwaFputQxDnp_HXm5_OZbA5HrBg';
const CLIENT_ID = '798815957955-t5jaib26pksjmlbdrvh6esqu9aa7qgdi.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAK-ihaYiUpQ4QtWwBhqJWFCS8QsQ7qwEY';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

onFormSubmit(valuesForSheet) {
    const params = {
        spreadSheetId: SPREADSHEET_ID,
        range: 'Sheet1',
        valueInputOption: 'RAW',
        insertDataOptions: 'INSERT_ROWS',
    };

    const valueRangeBody = {
        'majorDimension': 'ROWS',
        'values': [valuesForSheet]
    };

    let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
        //TODO: insert response behaviour on submission
        console.log(response.result);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}