import {FC} from "react";
import {IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {
    earHeight, earWidth, tertiaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelEar: FC<IDevSquirrel> = (props) => {
    const drawSquirrelEar = (g: Graphics) => {
        g.clear()
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.rect(0, 0, earWidth, earHeight);
        g.fill();
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawSquirrelEar(g)} scale={props.scale}
                         rotation={props.rotation}>

    </pixiGraphics>
}