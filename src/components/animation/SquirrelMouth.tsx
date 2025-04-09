import {FC} from "react";
import {Direction, IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {
    headRadius,
    jawHeight,
    jawWidth,
    mouthRadius,
    noseRadius,
    noseYOffset,
    quadraColor,
    tertiaryColor,
} from "../../definitions/DevSquirrelBaseDimensions.ts";

export const SquirrelMouth: FC<IDevSquirrel> = (props) => {
    const drawSquirrelMouth = (g: Graphics) => {
        g.clear()
        if(props.direction === Direction.Forward) {
            // Mouth
            g.fillStyle = quadraColor;
            g.beginPath();
            g.arc(0, 0, mouthRadius, 0, Math.PI * 2);
            g.fill();

            // Jaw
            g.fillStyle = tertiaryColor;
            g.rect(-jawWidth / 2, -4, jawWidth, jawHeight);
            g.fill()

            //Nose
            g.fillStyle = tertiaryColor;
            g.beginPath();
            g.arc(0, noseYOffset, noseRadius, 0, Math.PI * 2);
            g.fill();
        }
        else if (props.direction === Direction.Left) {
            const leftOffset = -headRadius + 8;
            // Mouth
            g.fillStyle = quadraColor;
            g.beginPath();
            g.arc(leftOffset, 0, mouthRadius, 0, Math.PI * 2);
            g.fill();

            // Jaw
            g.fillStyle = tertiaryColor;
            g.rect(-5 + leftOffset -jawWidth / 2, -4, jawWidth, jawHeight);
            g.fill()

            //Nose
            g.fillStyle = tertiaryColor;
            g.beginPath();
            g.arc(-4 + leftOffset, noseYOffset, noseRadius, 0, Math.PI * 2);
            g.fill();
        }
        else if (props.direction === Direction.Right) {
            const rightOffset = headRadius - 8;
            // Mouth
            g.fillStyle = quadraColor;
            g.beginPath();
            g.arc(rightOffset, 0, mouthRadius, 0, Math.PI * 2);
            g.fill();

            // Jaw
            g.fillStyle = tertiaryColor;
            g.rect(5 + rightOffset -jawWidth / 2, -4, jawWidth, jawHeight);
            g.fill()

            //Nose
            g.fillStyle = tertiaryColor;
            g.beginPath();
            g.arc(4 + rightOffset, noseYOffset, noseRadius, 0, Math.PI * 2);
            g.fill();
        }
        else {
            console.log(props.direction)
        }
    }

    return <pixiGraphics x={props.x} y={props.y} draw={(g) => drawSquirrelMouth(g)} scale={props.scale}
                         rotation={props.rotation}>

    </pixiGraphics>
}