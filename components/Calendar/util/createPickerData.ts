export default function createPickerData(timeRange, minutesInterval, currStartTime, currEndTime, defaultStartTime, defaultEndTime) {

    const [start, end] = timeRange;
    const pickerIime: Array<any> = [];

    let startIndex = 0;
    let endIndex = 0;

    let selectStartTime = currStartTime ? `${currStartTime.h}:${currStartTime.m}` : defaultStartTime;
    let selectEndTime = currEndTime ? `${currEndTime.h}:${currEndTime.m}` : defaultStartTime;


    for (let i = start; i <= end; i++) {
        let step;
        if (60 % minutesInterval == 0) {
            step = 60 / minutesInterval;
        } else {
            step = 0;
        }
        for (let n = 0; n < step; n++) {
            const h = i < 10 ? `0${i}` : i;
            const m = n * minutesInterval;
            const minutes = m < 10 ? `0${m}`: m;

            const c_t = `${i}:${m}`;

            const time = `${h}:${minutes}`;
            if ( c_t == selectStartTime) {
                startIndex = pickerIime.length;
            }
            if ( c_t == selectEndTime) {
                endIndex = pickerIime.length;
            }
            pickerIime.push({
                text: time,
                dataKey: time
            });
        }
    }

    const pickerInfo = [
        {
            className: 'zds-calendar-t-p-s',
            itemClassName: 'zds-calendar-t-p-s-i',
            scrollType: 'start-time',
            selectIndex: startIndex,
            listData: pickerIime
        },
        {
            className: 'zds-calendar-t-r-s',
            itemClassName: 'zds-calendar-t-r-s-i',
            scrollType: 'end-time',
            selectIndex: endIndex,
            listData: pickerIime
        },
    ];
    return pickerInfo;
}