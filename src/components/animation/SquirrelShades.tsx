import {FC} from "react";
import {Direction, IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {eyeOffset, headRadius} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelShades: FC<IDevSquirrel> = (props) => {
    const glassesOffset = 4
    const glassWidth = 16
    const glassHeight = 12
    const frameHeight = 4

    const drawSquirrelShades = (g: Graphics) => {
        g.clear()
        if (props.direction === Direction.Left) {
            g.fillStyle = "#262424";
            g.rect(-glassesOffset-glassWidth, -glassHeight / 2 - eyeOffset, glassWidth, glassHeight);
            g.fill()
            // brown
            g.fillStyle = "#7b5c4a";
            g.rect(-headRadius, -frameHeight / 2 - eyeOffset, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()

            g.fillStyle = "#262424";
            g.rect(-headRadius - 1, -glassHeight / 2 - eyeOffset, glassesOffset, glassHeight);
            g.fill()

            g.fillStyle = "#7b5c4a";
            g.rect(-glassesOffset, -glassHeight / 2 - eyeOffset + 1, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()
        }
        else if(props.direction === Direction.Right) {
            g.fillStyle = "#262424";
            g.rect(glassesOffset, -glassHeight / 2 - eyeOffset, glassWidth, glassHeight);
            g.fill()
            // brown
            g.fillStyle = "#7b5c4a";
            g.rect(glassesOffset + glassWidth, -frameHeight / 2 - eyeOffset, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()

            g.fillStyle = "#262424";
            g.rect(headRadius - 1, -glassHeight / 2 - eyeOffset, glassesOffset, glassHeight);
            g.fill()

            g.fillStyle = "#7b5c4a";
            g.rect(-headRadius + glassWidth + glassesOffset * 2, -glassHeight / 2 - eyeOffset + 1, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()
        }
        else if(props.direction === Direction.Forward) {
            g.fillStyle = "#262424";
            g.rect(-glassesOffset-glassWidth, -glassHeight / 2 - eyeOffset, glassWidth, glassHeight);
            g.fill()
            g.rect(glassesOffset, -glassHeight / 2  - eyeOffset, glassWidth, glassHeight);
            g.fill()
            // brown
            g.fillStyle = "#7b5c4a";
            g.rect(-glassesOffset, -frameHeight / 2  - eyeOffset, glassesOffset * 2, frameHeight);
            g.fill()

            g.fillStyle = "#7b5c4a";
            g.rect(-headRadius, -glassHeight / 2 - eyeOffset + 1, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()

            g.fillStyle = "#7b5c4a";
            g.rect(glassWidth + glassesOffset, -glassHeight / 2 - eyeOffset + 1, headRadius - glassWidth - glassesOffset, frameHeight);
            g.fill()
        }
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawSquirrelShades(g)} scale={props.scale}
    rotation={props.rotation}>

        </pixiGraphics>
}