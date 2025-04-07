import {Graphics} from "pixi.js";
import {IDevSquirrel} from "./DevSquirrel.tsx";
import {
    bodyHeadOffset,
    bodyHeight,
    footHeight,
    footWidth,
    headRadius,
    tertiaryColor
} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {FC} from "react";

export const SquirrelLeg: FC<IDevSquirrel> = (props) => {
    const drawSquirrelLeg = (g: Graphics) => {
        g.clear()
        g.fillStyle = tertiaryColor;
        g.rect(0, 0, footWidth, footHeight);
        g.fill()
    }

    return <pixiGraphics x={props.x} y={props.y + headRadius + bodyHeadOffset + bodyHeight - 2} draw={(g) => drawSquirrelLeg(g)} scale={props.scale} rotation={props.rotation}>

    </pixiGraphics>
}