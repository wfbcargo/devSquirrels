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
            {/*<canvas ref={canvasRef} width="800" height="800"/>*/}
            <Application resizeTo={parentRef}>
                <DevSquirrel x={100} y={100} scale={1}/>
                <DevSquirrel x={200} y={200} scale={2}/>
                <DevSquirrel x={150} y={300} scale={1.4}/>
                <DevSquirrel x={800} y={60} scale={.2}/>
                <DevSquirrel x={300} y={460} scale={.5}/>
            </Application>
        </div>
    )
}

export default App
