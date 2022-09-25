export const appColors = {
    text:'#595959',
    text2:'#808080',
    text3:'#a6a6a6',
    text4:'#cccccc',

    content:'#f2f2f2',
    content2:'#e6e6e6',
    content3:'#d9d9d9',
    content4:'#cccccc',
    content5:'#bfbfbf',

    main:'#538AA6',
    main2:'#66AACC',

    success:'#53A665',
    warning:'#A68E53',
    danger:'#A65353',

    inactive:'#D9D9D9',
};

export const appSizes = {
    xsmall:{
        largeTitle:31,
        title1:25,
        title2:19,
        title3:17,
        headline:14,
        body:14,
        callout:13,
        subhead:12,
        footnote:12,
        caption1:11,
        caption2:11
    },
    small:{
        largeTitle:32,
        title1:26,
        title2:20,
        title3:18,
        headline:15,
        body:15,
        callout:14,
        subhead:13,
        footnote:12,
        caption1:11,
        caption2:11
    },
    medium:{
        largeTitle:33,
        title1:27,
        title2:21,
        title3:19,
        headline:16,
        body:16,
        callout:15,
        subhead:14,
        footnote:12,
        caption1:11,
        caption2:11
    },
    large:{
        largeTitle:34,
        title1:28,
        title2:22,
        title3:20,
        headline:17,
        body:17,
        callout:16,
        subhead:15,
        footnote:13,
        caption1:12,
        caption2:11
    },
    xlarge:{
        largeTitle:36,
        title1:30,
        title2:24,
        title3:22,
        headline:19,
        body:19,
        callout:18,
        subhead:17,
        footnote:15,
        caption1:14,
        caption2:13
    },
    xxlarge:{
        largeTitle:38,
        title1:32,
        title2:26,
        title3:24,
        headline:21,
        body:21,
        callout:20,
        subhead:19,
        footnote:17,
        caption1:16,
        caption2:15
    },
    xxxlarge:{
        largeTitle:40,
        title1:34,
        title2:28,
        title3:26,
        headline:23,
        body:23,
        callout:22,
        subhead:21,
        footnote:19,
        caption1:18,
        caption2:17
    },
};

export function parse24HourTimeString(time_string){
    const time_array = time_string.split(':');
    return {
        hour:Number(time_array[0]),
        minute:Number(time_array[1]),
    };
}

export function getTimeString(time, to_12_hour){
    if(to_12_hour){
        //format as 12 hour 
        if(time.hour === 12){
            //post-meridian, 12:00
            return `12:${time.minute < 10 ? '0' + time.minute : time.minute} PM`;
        }
        else if(time.hour > 12 && time.hour < 24){
            //post-meridian, 13:00 to 23:59
            const hour = time.hour - 12;
            return `${hour < 10 ? '0' + hour : hour}:${time.minute < 10 ? '0' + time.minute : time.minute} PM`;
        }
        else if(time.hour === 24 ){
            //ante-meridian 24:00 case
            return `12:${time.minute < 10 ? '0' + time.minute : time.minute} AM`;
        }
        else if(time.hour === 0){
            //ante-meridian, 00:00 case
            return `12:${time.minute < 10 ? '0' + time.minute : time.minute} AM`;
        }
        else {
            //ante-meridian, 01:00 to 11:59
            return `${time.hour < 10 ? '0' + time.hour : time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute} AM`;
        }
    }
    else {
        //format as 24 hour 
        return `${time.hour < 10 ? '0' + time.hour : time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute}`;
    }
}