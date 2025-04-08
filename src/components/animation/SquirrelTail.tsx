import {Animation, Direction, IDevSquirrel} from "./DevSquirrel.tsx";
import {FC, useEffect, useRef, useState} from "react";
import {Graphics} from "pixi.js";
import {
    bodyHeadOffset,
    bodyHeight,
    bodyWidth,
    headRadius,
    secondaryColor,
    tailHeight, tailTopOffsetX, tailTopRadius,
    tailWidth,
} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {useTick} from "@pixi/react";

export const SquirrelTail : FC<IDevSquirrel> = (props) => {
    const [tailOffsetX, setTailOffsetX] = useState(0)
    const [tailOffsetY, setTailOffsetY] = useState(0)

    const walkAnimationTickSpeed = useRef(100)
    const walkAnimationLastTime = useRef(0)
    const [tailMovingDown, setTailMovingDown] = useState(false)
    const maxTailOffset = useRef(.5)
    const [tailRotation, setTailRotation] = useState(0)
    const maxTailRotation = useRef(.1)
    const [tailForwardRotate, setTailForwardRotate] = useState(false)

    useEffect(() => {
        if(props.animation === Animation.Idle) {
            setTailOffsetX(0)
            setTailOffsetY(0)
            setTailRotation(0)
        }
        else if (props.animation === Animation.Walk) {
            if (props.direction === Direction.Left) {
                setTailOffsetX(0)
            } else {
                setTailOffsetX(0)
            }
        }
    }, [props.animation, props.direction])

    // walk animation
    useTick(delta => {
        if (props.animation !== Animation.Walk) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS
        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        if (tailMovingDown) {
            setTailOffsetY(h => h + 8 * delta.deltaMS * .01)
        } else {
            setTailOffsetY(h => h - 8 * delta.deltaMS * .01)
        }

        if(tailMovingDown && tailOffsetY >= maxTailOffset.current) {
            setTailMovingDown(false)
        } else if(!tailMovingDown && tailOffsetY <= -1 * maxTailOffset.current) {
            setTailMovingDown(true)
        }

        if(tailForwardRotate && tailRotation >= maxTailRotation.current) {
            setTailForwardRotate(false)
        }
        else if(!tailForwardRotate && tailRotation <= -1 * maxTailRotation.current) {
            setTailForwardRotate(true)
        }

        if(tailForwardRotate) {
            setTailRotation(r => r + .5 * delta.deltaMS * .01)
        }
        else {
            setTailRotation(r => r - .5 * delta.deltaMS * .01)
        }

        walkAnimationLastTime.current = 0
    })

    const drawSquirrelTailRight = (g: Graphics) => {
        g.fillStyle = secondaryColor;
        g.rect((bodyWidth / 2) - (tailWidth / 2), (bodyHeight - tailHeight), tailWidth, tailHeight);
        g.fill();

        // Tail Top
        const tailTopBaseX = (bodyWidth / 2) + (tailWidth / 2)
        const tailTopBaseY = (bodyHeight - tailHeight)
        g.fillStyle = secondaryColor;
        g.beginPath();
        g.arc(tailTopBaseX + tailTopOffsetX, tailTopBaseY, tailTopRadius, 0, Math.PI * 2);
        g.fill();
    }

    const drawSquirrelTailLeft = (g: Graphics) => {
        g.fillStyle = secondaryColor;
        g.rect(-(bodyWidth / 2) - (tailWidth / 2), bodyHeight - tailHeight, tailWidth, tailHeight);
        g.fill();

        // Tail Top
        const tailTopBaseX = -(bodyWidth / 2) - (tailWidth / 2)
        const tailTopBaseY = bodyHeight - tailHeight
        g.fillStyle = secondaryColor;
        g.beginPath();
        g.arc(tailTopBaseX + tailTopOffsetX, tailTopBaseY, tailTopRadius, 0, Math.PI * 2);
        g.fill();
    }

    const drawSquirrelTail = (g: Graphics, s: IDevSquirrel) => {
        g.clear()
        if (s.direction === Direction.Left) {
            drawSquirrelTailRight(g)
        } else {
            drawSquirrelTailLeft(g)
        }
    }
    const bodyBaseY = props.y + (headRadius) + bodyHeadOffset - 8

    return <pixiGraphics x={props.x + tailOffsetX} y={bodyBaseY + tailOffsetY} draw={(g) => drawSquirrelTail(g, props)} scale={props.scale} rotation={tailRotation}>

    </pixiGraphics>
}