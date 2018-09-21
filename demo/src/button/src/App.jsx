import React, { PureComponent } from 'react';
import './index.scss';
import '../../../style/style.scss';
import { Button, Icon } from 'zzc-design-mobile';

let isClose = false;

export default class App extends PureComponent {
    state = {
        title: 'Button 按钮',
        disabled: true
    }
    render() {
        return (
            <div className='zzc-demo'>
                <div className='zzc-demo-header'>
                    <h1 className='zzc-demo-title'>{this.state.title}</h1>
                    <h2>租租车主流程主要分为两个颜色按钮，一个是main，蓝色，一个是sub，红色，附带2个颜色的高亮和加深的颜色。</h2>
                </div>
                <div className='zzc-demo-body'>
                    <h5>颜色、类型</h5>
                    <Button style={{background: 'red'}}><div className='icon-button'><Icon style={{fill:'green'}} size='ms' className='aaa' type='success'/>default</div></Button>
                    <Button type='main'>main</Button>
                    <Button type='main-lh'>main-lh</Button>
                    <Button type='main-dk'>main-dk</Button>
                    <Button type='sub'>sub</Button>
                    <Button type='sub-lh'>sub-lh</Button>
                    <Button type='sub-dk'>sub-dk</Button>
                    <Button ghost type='main'>空心main</Button>
                    <Button ghost type='sub'>空心sub</Button>
                    <Button disabled>disabled</Button>
                    <Button type='main' noRadius>没有圆角按钮</Button>
                    <Button ghost type='sub' noRadius>没有圆角按钮</Button>
                </div>
                <div className='zzc-demo-body'>
                    <h5>尺寸、大小</h5>
                    <Button type='main'>default main</Button>
                    <Button size='lg' type='main'>lg main</Button>
                    <Button size='ms' type='main'>ms main</Button>
                    <Button size='xs' type='main'>xs main</Button>
                </div>
                <div className='zzc-demo-body'>
                    <h5>inline</h5>
                    <Button inline size='ms'>inline1</Button>
                    <Button inline size='ms' type='main'>inline2</Button>
                    <Button inline size='ms' type='sub'>inline3</Button>
                    <Button ghost inline size='xs' type='main'>inline2</Button>
                    <Button ghost inline size='xs' type='sub'>inline3</Button>
                </div>
                <div className='zzc-demo-body full'>
                    <h5>占满</h5>
                    <Button full size='lg' type='main'>full log</Button>
                    <Button full type='main'>full default</Button>
                    <Button full size='ms' type='main'>full ms</Button>
                    <Button full size='xs' type='main'>full xs</Button>
                </div>
                <div className='zzc-demo-body'>
                    <h5>自定义样式</h5>
                    <Button activeStyle={{ background: 'blue' }} style={{ background: 'green', color: '#fff' }}>自定义样式</Button>
                    <Button activeClassName='custom'>自定义active</Button>
                </div>
            </div>

        );
    }
}