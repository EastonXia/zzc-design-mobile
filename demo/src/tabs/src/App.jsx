import React, {Component} from 'react';
import {Tabs} from 'zzc-design-mobile';
import './index.scss';
import '../../../style/style.scss';

export default class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            tabs1: [
                { title: 'tab 1' },
                { title: 'tab 2' },
                { title: 'tab 3' }
            ],
            tabs2: [
                { title: 'tab 1' },
                { title: 'tab 2' },
                { title: 'tab 3' },
                { title: 'tab 4' },
                { title: 'tab 5' },
                { title: 'tab 6' },
                { title: 'tab 7' }
            ],
            tabs: [
                <div>自定义1</div>,
                <div>自定义2</div>,
                <div>自定义3</div>,
                <div>自定义4</div>,
                <div>自定义5</div>
            ],
            tabsContent: [
                <div className='item-content'>自定义内容1</div>,
                <div className='item-content'>自定义内容2</div>,
                <div className='item-content'>自定义内容3</div>,
                <div className='item-content'>自定义内容4</div>,
                <div className='item-content'>自定义内容5</div>
            ],
            tabsIndex: 0,
            tabsIndex1: 0,
            tabsIndex2: 0,
            tabsIndex3: 0,
            tabsIndex4: 0,
            tabsIndex5: 0,
            tabsIndex6: 0,
            tabsIndex7: 0
        };
    }

    renderContent(tabs) {
        return tabs.map( ( item, key ) => (
            <div className='item-content' key={key}>
                <p>this is {item.title} content</p>
            </div> ) );
    }

    render() {
        return (
            <div className='zzc-demo'>
                <div className='zzc-demo-header'>
                    <h1 className='zzc-demo-title'>Tabs 标签页</h1>
                    <h2>提供多个标签页面切换功能</h2>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>基本用法</h1>
                    <Tabs
                        maxTabLength={3}    
                        index={this.state.tabsIndex}
                        tabs={this.state.tabs}
                        onChange={( key ) => {
                            this.setState( {
                                tabsIndex: key
                            } );
                        }}
                    >
                        {this.state.tabsContent}
                    </Tabs>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>基本用法</h1>
                    <Tabs
                        maxTabLength={3}    
                        index={this.state.tabsIndex1}
                        tabs={this.state.tabs1}
                        onChange={( key ) => {
                            this.setState( {
                                tabsIndex1: key
                            } );
                        }}
                    >
                        {this.renderContent( this.state.tabs1 )}
                    </Tabs>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>tabbar的不同方向</h1>
                    <Tabs
                        maxTabLength={3}
                        tabBarPosition='bottom'
                        index={this.state.tabsIndex5}
                        tabs={this.state.tabs2}
                        onChange={( key ) => {
                            this.setState( {
                                tabsIndex5: key
                            } );
                        }}
                    >
                        {this.renderContent( this.state.tabs2 )}
                    </Tabs>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>垂直布局(左边)</h1>
                    <div style={{ height: '200px' }}>
                        <Tabs
                            swipeDirection='vertical'
                            isOpenTabBarScroll={false}
                            isOpenTabContentScroll={false}
                            maxTabLength={3}
                            tabBarPosition='left'
                            index={this.state.tabsIndex6}
                            tabs={this.state.tabs2}
                            onChange={( key ) => {
                                this.setState( {
                                    tabsIndex6: key
                                } );
                            }}
                        >
                            {this.renderContent( this.state.tabs2 )}
                        </Tabs>
                    </div>
                    <h1 className='zzc-component-title'>垂直布局(右边)</h1>
                    <div style={{ height: '200px' }}>
                        <Tabs
                            swipeDirection='vertical'
                            isOpenTabBarScroll={false}
                            isOpenTabContentScroll={false}
                            maxTabLength={3}
                            tabBarPosition='right'
                            index={this.state.tabsIndex7}
                            tabs={this.state.tabs2}
                            onChange={( key ) => {
                                this.setState( {
                                    tabsIndex7: key
                                } );
                            }}
                        >
                            {this.renderContent( this.state.tabs2 )}
                        </Tabs>
                    </div>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>禁用动画</h1>
                    <Tabs
                        animated={false}
                        maxTabLength={3}
                        index={this.state.tabsIndex2}
                        tabs={this.state.tabs2}
                        onChange={( key ) => {
                            this.setState( {
                                tabsIndex2: key
                            } );
                        }}
                    >
                        {this.renderContent( this.state.tabs2 )}
                    </Tabs>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>自定义显示数量，超出滑动，受控的tabs</h1>
                    <Tabs
                        maxTabLength={3}    
                        index={this.state.tabsIndex3}
                        tabs={this.state.tabs2}
                        onChange={( key ) => {
                            this.setState( {
                                tabsIndex3: key
                            } );
                        }}
                    >
                        {this.renderContent( this.state.tabs2 )}
                    </Tabs>
                </div>
                <div className='zzc-demo-body full'>
                    <h1 className='zzc-component-title'>自定义显示数量，超出滑动，非受控的tabs</h1>
                    <Tabs
                        maxTabLength={3}    
                        defaultIndex={this.state.tabsIndex4}
                        tabs={this.state.tabs2}
                        onChange={( key ) => {
                            // console.log( 123 );
                        }}
                    >
                        {this.renderContent( this.state.tabs2 )}
                    </Tabs>
                </div>
            </div>
        );
    }
}