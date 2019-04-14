import random from './random';

export default function (startDate, endDate) {
    var data = {};
    var dataKey = 'date';
    var fields = [
        'Потерянный',
        'Отвеченный',
        'Пропущенный, сотрудник перезвонил',
        'Пропущенный, клиент перезвонил'
    ];
    var commonField = 'Всего';
    var sourceData = [];

    let days = 1;

    try {
        days = Math.ceil((endDate.getTime() - startDate.getTime()) / (3600 * 1000 * 24));

        if (days < 1) days = 1;
    } catch (error) {
        console.error(error);
    }

    let step = days <= 30 ? 1 : Math.ceil(days / 30);

    for (let i = 0; i < days / step; i++) {
        const call = {};
        let common = 0;
        let thisDay = i === 0
            ? startDate
            : i === (days - 1)
                ? endDate
                : new Date(startDate.getTime() + (3600 * 1000 * 24 * i * step));
        let dd = thisDay.getDate();
        let mm = monathName(thisDay.getMonth());
        let yy = thisDay.getFullYear();

        call[dataKey] = `${dd} ${mm} ${yy}`;

        for (let j = 0; j < fields.length; j++) {
            const f = fields[j];
            const v = random();

            common += v;

            call[f] = v;
        }

        call[commonField] = common;

        sourceData.push(call);
    }

    fields.push(commonField);

    data = {
        sourceData,
        dataKey,
        fields
    };

    return data;
}


function monathName (index) {
    var monath;

    switch (index) {
        case 0:
            monath = "Jan";
            break;

        case 1:
            monath = "Feb";
            break;

        case 2:
            monath = "Mar";
            break;

        case 3:
            monath = "Apr";
            break;

        case 4:
            monath = "May";
            break;

        case 5:
            monath = "Jun";
            break;

        case 6:
            monath = "Jul";
            break;

        case 7:
            monath = "Aug";
            break;

        case 8:
            monath = "Sep";
            break;

        case 9:
            monath = "Oct";
            break;

        case 10:
            monath = "Nov";
            break;

        case 11:
            monath = "Dec";
            break;

        default:
            monath = "";
            break;
    }

    return monath;
}
