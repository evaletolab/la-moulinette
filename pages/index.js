import React from 'react';
import Link from 'next/link';

import { singleton } from '../src/SingletonTest';

export default class HomePage extends React.Component
{
    render(){
        console.log("single", singleton.foo);
        singleton.foo++;
        return (
            <div>
                <h1>the moulinette</h1>
                <Link href="/about"><a>about</a></Link>
            </div>
        );
    }
}