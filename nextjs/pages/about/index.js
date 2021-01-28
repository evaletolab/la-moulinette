
import React from 'react';
import Link from 'next/link';

import { singleton } from '../../src/SingletonTest';

export default class About extends React.Component
{

    render(){
        console.log(singleton.foo);
        return (
            <div>
                <h1>about</h1>
                <Link href="/"><a>home</a></Link>
            </div>
        );
    }
}