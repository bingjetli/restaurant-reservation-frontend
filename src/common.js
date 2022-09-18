export const appColors = {
    text:'#444648',
    text2:'#5e6062',
    text3:'#828384',
    text4:'#a6a6a8',
    text5:'#c9caca',
    text6:'#ededee',

    content:'#fffdfa',
    content2:'#e6e4e1',
    content3:'#cccac8',
    content4:'#b2b1af',
    content5:'#999896',
    content6:'#807e7d',

    hexadic:'#8d1eff',
    hexadic2:'#ff1e90',
    hexadic3:'#ff8d1e',
    hexadic4:'#90ff1e',
    hexadic5:'#1eff8d',

    presentActive:'#1eff8d',
    absentActive:'#ff8d1e',

    //deprecated
    main:'#1e90ff',
    mainComplementary1:'#80C0FF',
    mainComplementary2:'#4DA7FF',
    mainComplementary3:'#FF9D1E',
    mainComplementary4:'#FFB24D',
    mainTetrad1:'#FF8B1E',
    mainTetrad2:'#FF1E92',
    mainTetrad3:'#75BBFF',
    mainTetrad4:'#92FF1E',

    mainText:'#2F4F4F',
    secondaryText:'#808080',
    secondaryText2:'#aaaaaa',
    mainTextInvert:'#F8F8FF',

    iosSystemWhite:{
        light:'#fafaff',
        dark:'#101012',
    },
    iosSystemBlack:{
        light:'#101012',
        dark:'#fafaff',
    },
    iosSystemGray0:{
        light:'#636366',
        dark:'#aeaeb2',
    },
    iosSystemGray:{
        light:'#8e8e93',
        dark:'#8e8e93',
    },
    iosSystemGray2:{
        light:'#aeaeb2',
        dark:'#636366',
    },
    iosSystemGray3:{
        light:'#c7c7cc',
        dark:'#48484a',
    },
    iosSystemGray4:{
        light:'#d1d1d6',
        dark:'#3a3a3c',
    },
    iosSystemGray5:{
        light:'#e5e5ea',
        dark:'#2c2c2e',
    },
    iosSystemGray6:{
        light:'#f2f2f7',
        dark:'#1c1c1e',
    },

    iosSystemRed:{
        light:'#ff3b30',
        dark:'#ff453a',
    },
    iosSystemOrange:{
        light:'#ff9500',
        dark:'#ff9f0a',
    },
    iosSystemYellow:{
        light:'#ffcc00',
        dark:'#ffd60a',
    },
    iosSystemGreen:{
        light:'#34c759',
        dark:'#30d158',
    },
    iosSystemMint:{
        light:'#00c7be',
        dark:'#66d4cf',
    },
    iosSystemTeal:{
        light:'#30b0c7',
        dark:'#40c8e0',
    },
    iosSystemCyan:{
        light:'#32ade6',
        dark:'#64d2ff',
    },
    iosSystemBlue:{
        light:'#007aff',
        dark:'#0a84ff',
    },
    iosSystemIndigo:{
        light:'#5856d6',
        dark:'#5e5ce6',
    },
    iosSystemPurple:{
        light:'#af52de',
        dark:'#bf5af2',
    },
    iosSystemPink:{
        light:'#ff2d55',
        dark:'#ff375f',
    },
    iosSystemBrown:{
        light:'#a2845e',
        dark:'#ac8e68',
    },
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