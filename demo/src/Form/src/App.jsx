import React, { Component } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import './index.scss';
import '../../../style/style.scss';
// <div className='zzc-demo-body'>
//                     <h5>普通使用</h5>
//                     <Form1 />
//                 </div>

export default class App extends Component {
    render () {
        return (
            <div className='zzc-demo'>
                <div className='zzc-demo-header'>
                    <h1 className='zzc-demo-title'>Form</h1>
                    <h2>Form表单，组合Input和各种输入组件使用</h2>
                </div>
                
                <div className='zzc-demo-body'>
                    <h5>多种input</h5>
                    <Form3 />
                </div>
                <div className='zzc-demo-body'>
                    <h5>托管到form进行管理</h5>
                    <Form2 />
                </div>
            </div>
        );
    }
}