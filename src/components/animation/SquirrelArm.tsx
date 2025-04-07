import {FC} from "react";
import {IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {
    armHeight,
    armWidth, tertiaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelArm: FC<IDevSquirrel> = (props) => {
    const drawSquirrelArm = (g: Graphics) => {
        g.clear()
        g.fillStyle = tertiaryColor;
        g.rect(0, 0, armWidth, armHeight);
        g.fill()
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawSquirrelArm(g)} scale={props.scale} rotation={props.rotation}>

    </pixiGraphics>
}