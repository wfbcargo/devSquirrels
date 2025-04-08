import {IDevSquirrel} from "./DevSquirrel.tsx";
import {FC} from "react";
import {Graphics} from "pixi.js";
import {
    baseColor, bellyBodyOffset, bellyHeight, bellyWidth, bodyHeadOffset, bodyHeight, bodyWidth,
    headRadius, secondaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelBody : FC<IDevSquirrel> = (props) => {
    const drawySquirrelBody = (g: Graphics) => {
        g.clear()
        const bodyBaseY = (headRadius) + bodyHeadOffset
        // Body
        g.fillStyle = baseColor;
        g.beginPath();
        g.rect(-(bodyWidth / 2), bodyBaseY, bodyWidth, bodyHeight);
        g.fill()

        //Belly
        g.fillStyle = secondaryColor; // brown
        g.beginPath();
        g.rect(-(bellyWidth / 2), bodyBaseY + bellyBodyOffset, bellyWidth, bellyHeight);
        g.fill()
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawySquirrelBody(g)} scale={props.scale}>

    </pixiGraphics>
}