import React, { PureComponent } from 'react';
import classNames from 'classnames';
import config from '../../_util/config';
import Popup from '../../Popup';
import { CalendarProps } from '../propsType';
import CalendarCloseBox from './CalendarCloseBox';
import CalendarResult from './CalendarResult';
import CalendarWeek from './CalendarWeek';
import CalendarListBox from './CalendarListBox';
import CalendarFooter from './CalendarFooter';
import createCalendarMap from '../util/createCalendarMap';
import calendar_i18n from '../util/i18n';
import updateCalendarMap from '../util/updateCalendarMap';
import { isFunction } from '../../_util/typeof';

export default class Calendar extends PureComponent<CalendarProps, any> {
    constructor(props) {
        super(props);
        const _startTime = props.startTime ? this.conversionSelectTime(props.startTime) : null;
        const _endTime = props.endTime ? this.conversionSelectTime(props.endTime) : null;
        const i18n = calendar_i18n(props.lang);
        let { startIndexInfo, endIndexInfo, calendarMap } = createCalendarMap(props.lang, _startTime, _endTime, props.yesterday);

        if (startIndexInfo && endIndexInfo) {
            const { newMap } = updateCalendarMap({
                type: 'end',
                _startIndexInfo: startIndexInfo,
                _startTime,
                _endTime,
                map: calendarMap,
                i18n,
                calendarMode: props.calendarMode,
                ...endIndexInfo
            });
            calendarMap = newMap;
        }
        this.state = {
            i18n,
            calendarMap,
            _startTime: _startTime,
            _startIndexInfo: startIndexInfo,
            _endTime: _endTime,
            _endIndexInfo: endIndexInfo,
            _default_calendar_tips: props.defaultCalendarTips,
            _calendar_tips: '',
            _listBoxPaddingBottom: 30
        };
        this.selectItem = this.selectItem.bind(this);
        this.resetSelectDay = this.resetSelectDay.bind(this);
        this.selectTimePicker = this.selectTimePicker.bind(this);
        this.submit = this.submit.bind(this);
        this.footerRenderCallback = this.footerRenderCallback.bind(this);
    }
    static defaultProps = {
        prefixCls: `${config.cls}-calendar`,
        className: '',
        style: {},
        lang: 'cn',
        calendarMode: 'default',
        mode: 'day',
        timeRange: [0, 23],
        minutesInterval: 30,
        defaultStartTime: '9:00',
        defaultEndTime: '9:00',
        // startTime: new Date('2020/12/2 10:00:00'),
        // endTime: new Date('2020/12/17 10:00:00'),
        dayChange: null,
        timeChange: null,
        defaultCalendarTips: '',
        yesterday: false
    };

    conversionSelectTime(time) {
        if (!time) return null;
        let newTime = new Date(time);
        if (newTime.toString() == 'Invalid Date') return null;
        return {
            Y: newTime.getFullYear(),
            M: newTime.getMonth(),
            D: newTime.getDate(),
            h: newTime.getHours(),
            m: newTime.getMinutes(),
            w: newTime.getDay(),
            t: newTime.getTime()
        }
    }

    // 因为react设计大量循环计算，所以点击选择的规则通过操作DOM来渲染
    selectItem(monthKey, rowKey, itemKey, dayInfo) {
        const { _startTime, _endTime } = this.state;
        if ((!_startTime && !_endTime) || (_startTime && _endTime)) {
            this.updateStartTime(_startTime, _endTime, monthKey, rowKey, itemKey);
        } else if (_startTime && !_endTime) {
            // 需要对end时间做判断，如果小于start时间，那么将这次操作进行更新start
            const start_timestamp = new Date(`${_startTime.Y}/${_startTime.M + 1}/${_startTime.D}`);
            const end_timestamp = new Date(`${dayInfo.y}/${dayInfo.m + 1}/${dayInfo.d}`);
            if (end_timestamp < start_timestamp) {
                this.updateStartTime(_startTime, _endTime, monthKey, rowKey, itemKey);
            } else {
                this.updateEndTime(_startTime, _endTime, monthKey, rowKey, itemKey);
            }
        }
    }

    updateStartTime(_startTime, _endTime, monthKey, rowKey, itemKey) {
        const { defaultStartTime } = this.props;
        const { newMap, select } = updateCalendarMap({
            type: 'start',
            _startTime,
            _endTime,
            _startIndexInfo: this.state._startIndexInfo,
            _endIndexInfo: this.state._endIndexInfo,
            map: this.state.calendarMap,
            monthKey, rowKey, itemKey,
            i18n: this.state.i18n,
            calendarMode: this.props.calendarMode
        });
        this.setState({
            _startIndexInfo: { monthKey, rowKey, itemKey },
            _endIndexInfo: null,
            _endTime: null,
            _startTime: this.conversionSelectTime(new Date(`${select.y}/${select.m + 1}/${select.d} ${defaultStartTime}`)),
            calendarMap: newMap,
            _listBoxPaddingBottom: 30
        }, () => {
            this.onChangeEvent('day', 'start');
        });
    }

    updateEndTime(_startTime, _endTime, monthKey, rowKey, itemKey) {
        const { defaultEndTime } = this.props;
        const { newMap, select } = updateCalendarMap({
            type: 'end',
            _startIndexInfo: this.state._startIndexInfo,
            _startTime,
            _endTime,
            map: this.state.calendarMap,
            monthKey, rowKey, itemKey,
            i18n: this.state.i18n,
            calendarMode: this.props.calendarMode
        });
        this.setState({
            _endIndexInfo: { monthKey, rowKey, itemKey },
            _endTime: this.conversionSelectTime(new Date(`${select.y}/${select.m + 1}/${select.d} ${defaultEndTime}`)),
            calendarMap: newMap
        }, () => {
            this.onChangeEvent('day', 'end');
        });
    }

    resetSelectDay() {
        const { newMap } = updateCalendarMap({
            type: 'reset',
            _startIndexInfo: this.state._startIndexInfo,
            _endIndexInfo: this.state._endIndexInfo,
            map: this.state.calendarMap,
            i18n: this.state.i18n
        });
        this.setState({
            _startIndexInfo: null,
            _endIndexInfo: null,
            _startTime: null,
            _endTime: null,
            calendarMap: newMap
        });
    }

    selectTimePicker(type, selectItem) {
        const { dataKey } = selectItem;
        const { _startTime, _endTime } = this.state;
        if (type == 'start-time') {
            this.setState({
                _startTime: this.conversionSelectTime(new Date(`${_startTime.Y}/${_startTime.M + 1}/${_startTime.D} ${dataKey}`)),
            }, () => {
                this.onChangeEvent('time', 'start');
            });
        } else {
            this.setState({
                _endTime: this.conversionSelectTime(new Date(`${_endTime.Y}/${_endTime.M + 1}/${_endTime.D} ${dataKey}`)),
            }, () => {
                this.onChangeEvent('time', 'end');
            });
        }
    }

    onChangeEvent(eventType, type) {
        const { timeChange, dayChange } = this.props;
        let tips = '';
        if (eventType == 'day' && dayChange && isFunction(dayChange)) {
            tips = dayChange(this.echoSelectData(type, this.state._startTime, this.state._endTime));
        } else if (eventType == 'time' && timeChange && isFunction(timeChange)) {
            tips = timeChange(this.echoSelectData(type, this.state._startTime, this.state._endTime));
        }
        if (this.state._calendar_tips != tips) {
            this.setState({
                _calendar_tips: tips || ''
            });
        }

    }

    echoSelectData(type, start, end) {
        // 输出日期格式
        if (this.props.mode == 'day') {
            delete start.h;
            delete start.m;
            return {
                type,
                start,
                end
            };
        } else if (this.props.mode == 'day*time') {
            return {
                type,
                start,
                end
            };
        }
    }

    submit() {
        const { _startTime, _endTime } = this.state;
        console.log(_startTime);
        console.log(_endTime);
    }

    footerRenderCallback(footerHeight) {
        this.setState({
            _listBoxPaddingBottom: footerHeight + 30
        });
    }

    render() {
        const { style, prefixCls, className, lang, mode, timeRange, minutesInterval, defaultStartTime, defaultEndTime } = this.props;
        const { calendarMap, i18n, _startTime, _endTime, _default_calendar_tips, _calendar_tips, _listBoxPaddingBottom } = this.state;
        const cardClassName: string = classNames(
            prefixCls,
            className
        );
        return (
            <div style={style} className={cardClassName}>
                <CalendarCloseBox />
                <CalendarResult lang={lang} i18n={i18n} mode={mode} startTime={_startTime} endTime={_endTime} />
                <CalendarWeek weekList={i18n.weekList} />
                <CalendarListBox
                    paddingBottom={_listBoxPaddingBottom}
                    selectItem={this.selectItem}
                    list={calendarMap}
                    startTime={_startTime}
                    endTime={_endTime}
                />
                <Popup
                    style={{ bottom: 0, top: 'unset', height: 'auto' }}
                    transparent={true}
                    visible={_startTime && _endTime}
                >
                    <CalendarFooter
                        renderCallback={this.footerRenderCallback}
                        timeRange={timeRange}
                        minutesInterval={minutesInterval}
                        i18n={i18n}
                        reset={this.resetSelectDay}
                        submit={this.submit}
                        mode={mode}
                        currStartTime={_startTime}
                        currEndTime={_endTime}
                        defaultStartTime={defaultStartTime}
                        defaultEndTime={defaultEndTime}
                        selectTimePicker={this.selectTimePicker}
                        defaultCalendarTips={_default_calendar_tips}
                        calendarTips={_calendar_tips}
                    />
                </Popup>
                {false && _startTime && _endTime &&
                    <CalendarFooter
                        renderCallback={this.footerRenderCallback}
                        timeRange={timeRange}
                        minutesInterval={minutesInterval}
                        i18n={i18n}
                        reset={this.resetSelectDay}
                        submit={this.submit}
                        mode={mode}
                        currStartTime={_startTime}
                        currEndTime={_endTime}
                        defaultStartTime={defaultStartTime}
                        defaultEndTime={defaultEndTime}
                        selectTimePicker={this.selectTimePicker}
                        defaultCalendarTips={_default_calendar_tips}
                        calendarTips={_calendar_tips}
                    />
                }
            </div>
        );
    }
}