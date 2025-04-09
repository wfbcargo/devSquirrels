import './App.css'
import {useRef} from "react";
import {
    Application,
    extend,
} from '@pixi/react';
import {Container, Graphics, Sprite} from 'pixi.js';
import {AnimationFrame} from "./components/animationFrame.tsx";

extend({Container, Graphics, Sprite});

function App() {
    const parentRef = useRef<any>(null)
    return (
        <div style={{width: '100%', height: '100%'}} ref={parentRef}>
            <Application resizeTo={parentRef}>
                <AnimationFrame/>
            </Application>
        </div>
    )
}

export default App
