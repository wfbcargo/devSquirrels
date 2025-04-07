import {IDevSquirrel} from "./DevSquirrel.tsx";
import {FC} from "react";
import {Graphics} from "pixi.js";
import {
    baseColor, bellyBodyOffset, bellyHeight, bellyWidth, bodyHeadOffset, bodyHeight, bodyWidth,
    headRadius, secondaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelBody : FC<IDevSquirrel> = (props) => {
    const drawySquirrelBody = (g: Graphics, s: IDevSquirrel) => {
        g.clear()
        const bodyBaseY = s.y + (headRadius) + bodyHeadOffset
        // Body
        g.fillStyle = baseColor;
        g.beginPath();
        g.rect(s.x - (bodyWidth / 2), bodyBaseY, bodyWidth, bodyHeight);
        g.fill()

        //Belly
        g.fillStyle = secondaryColor; // brown
        g.beginPath();
        g.rect(s.x - (bellyWidth / 2), bodyBaseY + bellyBodyOffset, bellyWidth, bellyHeight);
        g.fill()
    }

    return <pixiGraphics draw={(g) => drawySquirrelBody(g, props)} scale={props.scale}>

    </pixiGraphics>
}