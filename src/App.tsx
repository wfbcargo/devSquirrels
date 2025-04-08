import './App.css'
import {useRef} from "react";
import {
    Application,
    extend,
} from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

extend({ Container, Graphics });
import {DevSquirrel} from "./components/animation/DevSquirrel.tsx";

function App() {
    const parentRef = useRef<any>(null)
    return (
        <div style={{width:'100%', height:'100%'}} ref={parentRef}>
            <Application resizeTo={parentRef}>
                <DevSquirrel x={50} y={50} scale={1}/>
            </Application>
        </div>
    )
}

export default App
