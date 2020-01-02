import React, { Component } from 'react';
import { Input, Form, List, Card2 } from 'zzc-design-mobile';
import './index.scss';
import '../../../style/style.scss';

const { ListItem } = List;

export default class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            name: '',
            age: ''
        };
    }

    onChange ( type, value ) {
        if ( type == 'name' ) {
            this.setState( {
                name: value
            } );
        } else {
            this.setState( {
                age: value
            } );
        }
    }

    render () {
        const { name, age } = this.state;

        return (
            <div className='zzc-demo'>
                <div className='zzc-demo-header'>
                    <h1 className='zzc-demo-title'>Input</h1>
                    <h2>基础的Input组件</h2>
                </div>
                <div className='zzc-demo-body'>
                    <Card2 style={{ padding: 0 }}>
                        <Card2.Header style={{ paddingLeft: '15px', paddingRight: '15px' }} title='非受控Input' />
                        <Form>
                            <Form.Item
                                label='姓名'
                                htmlFor='label1'
                            >
                                <Input placeholder='请输入姓名' id='label1' />
                            </Form.Item>
                            <Form.Item
                                label='年龄'
                            >
                                <Input placeholder='请输入年龄' id='label2' />
                            </Form.Item>
                            <Form.Item
                                label='手机号'
                            >
                                <Input inputType='phone' showPhonePrefix placeholder='请输入手机号' id='phone' onChange={(value) => {console.log(value)}}/>
                            </Form.Item>
                        </Form>
                    </Card2>
                </div>
                <div className='zzc-demo-body'>
                    <Card2 style={{ padding: 0 }}>
                        <Card2.Header style={{ paddingLeft: '15px', paddingRight: '15px' }} title='受控Input' />
                        <Form>
                            <Form.Item
                                label='姓名'
                                htmlFor='label3'
                            >
                                <Input placeholder='请输入姓名' id='label3' value={name} onChange={( value ) => { this.onChange( 'name', value ); }} />
                            </Form.Item>
                            <Form.Item
                                label='年龄'
                                htmlFor='label4'
                            >
                                <Input placeholder='请输入年龄' id='label4' value={age} onChange={( value ) => { this.onChange( 'age', value ); }} />
                            </Form.Item>
                        </Form>
                    </Card2>
                </div>
                <div className='zzc-demo-body'>
                    <Card2 style={{ padding: 0 }}>
                        <Card2.Header style={{ paddingLeft: '15px', paddingRight: '15px' }} title='其他设置' />
                        <Form>
                            <Form.Item
                                label='姓名'
                                htmlFor='label5'
                            >
                                <Input placeholder='请输入姓名' id='label5' disabled />
                            </Form.Item>
                            <Form.Item
                                label='年龄'
                                htmlFor='label6'
                            >
                                <Input placeholder='请输入年龄' id='label6' maxLength={20} />
                            </Form.Item>
                        </Form>
                    </Card2>
                </div>
            </div>
        );
    }
}