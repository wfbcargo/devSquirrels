import {FC} from "react";
import {IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {
    eyeRadius, tertiaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelEye: FC<IDevSquirrel> = (props) => {
    const drawSquirrelEar = (g: Graphics) => {
        g.clear()
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.arc(0, 0, eyeRadius, 0, Math.PI * 2);
        g.fill();
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawSquirrelEar(g)} scale={props.scale}
                         rotation={props.rotation}>

    </pixiGraphics>
}