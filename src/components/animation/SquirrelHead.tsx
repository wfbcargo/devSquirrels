import {FC, useEffect, useRef, useState} from "react";
import {Animation, Direction, IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {
    baseColor,
    earHeight,
    earOffset,
    earWidth,
    eyeOffset,
    eyeRadius,
    headRadius, mouthYOffset,
} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {useTick} from "@pixi/react";
import {SquirrelEar} from "./SquirrelEar.tsx";
import {SquirrelEye} from "./SquirrelEye.tsx";
import {SquirrelMouth} from "./SquirrelMouth.tsx";
import {SquirrelShades} from "./SquirrelShades.tsx";

export enum HeadAnimations {
    Base = "base",
    Look = "look"
}

export const SquirrelHead : FC<IDevSquirrel> = (props) => {
    const [devSquirrel, setDevSquirrel] = useState({...props})
    const [thisAnimation] = useState(HeadAnimations.Base)
    const [headYOffset, setHeadYOffset] = useState(0)
    const [hasShades] = useState(Math.random() > .7)

    useEffect(() => {
        setDevSquirrel({
            x: props.x,
            y: props.y,
            scale: props.scale,
            direction: props.direction || Direction.Forward,
            animation: props.animation || Animation.Idle
        })
    }, [props.x, props.y, props.scale, props.direction, props.animation])

    const [lookStage, setLookStage] = useState(0)
    const lookAnimationDelay = useRef(600)
    const lookAnimationLastTime = useRef(0)

    // walk animation
    const walkAnimationTickSpeed = useRef(100)
    const walkAnimationLastTime = useRef(0)
    const [headMovingDown, setHeadMovingDown] = useState(false)
    const maxHeadYOffset = useRef(.5)
    useTick(delta => {
        if (props.animation !== Animation.Walk) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS
        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        if (headMovingDown) {
            setHeadYOffset(h => h + 10 * delta.deltaMS * .01)
        } else {
            setHeadYOffset(h => h - 10 * delta.deltaMS * .01)
        }

        if(headMovingDown && headYOffset >= maxHeadYOffset.current) {
            setHeadMovingDown(false)
        } else if(!headMovingDown && headYOffset <= -1 * maxHeadYOffset.current) {
            setHeadMovingDown(true)
        }

        walkAnimationLastTime.current = 0
    })


    // look animation
    useTick(delta => {
        if(thisAnimation === HeadAnimations.Look) {
            lookAnimationLastTime.current += delta.deltaMS

            if (lookAnimationLastTime.current < lookAnimationDelay.current) {
                return
            }
            // increment look stage by 1 every tick up to  and then reset to 0
            if (lookStage >= 3) {
                setLookStage(0)
            } else {
                setLookStage(lookStage + 1)
            }

            if (lookStage === 0) {
                setDevSquirrel(s => {
                    return {...s, direction: Direction.Forward}
                })
            } else if (lookStage === 1) {
                setDevSquirrel(s => {
                    return {...s, direction: Direction.Left}
                })
            } else if (lookStage === 2) {
                setDevSquirrel(s => {
                    return {...s, direction: Direction.Forward}
                })
            } else if (lookStage === 3) {
                setDevSquirrel(s => {
                    return {...s, direction: Direction.Right}
                })
            }

            lookAnimationLastTime.current = 0
        }
    })

    const drawSquirrelHead = (g: Graphics) => {
        g.clear()
        g.fillStyle = baseColor;
        g.beginPath();
        g.arc(0, 0, headRadius, 0, Math.PI * 2);
        g.fill();
    }

    if(props.direction === Direction.Left) {
        return <pixiGraphics x={props.x} y={props.y + headYOffset} draw={() => {}}>
            <SquirrelEar {...props} x={-earOffset - earWidth} y={-(2 * earHeight)} scale={1}/>
            <pixiGraphics x={0} y={0} draw={(g) => drawSquirrelHead(g)} scale={props.scale}>
                <SquirrelEar {...props} x={earOffset} y={-(2 * earHeight)} scale={1} />
                <SquirrelEye {...props} x={-eyeOffset - eyeRadius} y={-eyeOffset} scale={1} />
                <SquirrelMouth {...props} x={0} y={mouthYOffset} scale={1} />
                {hasShades && <SquirrelShades {...props} x={0} y={0} scale={1}/>}
            </pixiGraphics>
        </pixiGraphics>
    }

    if(props.direction === Direction.Right) {
        return <pixiGraphics x={props.x} y={props.y + headYOffset} draw={() => {}}>
            <SquirrelEar {...props} x={earOffset} y={-(2 * earHeight)} scale={1} />
            <pixiGraphics x={0} y={0} draw={(g) => drawSquirrelHead(g)} scale={props.scale}>
                <SquirrelEar {...props} x={-earOffset - earWidth} y={-(2 * earHeight)} scale={1}/>
                <SquirrelEye {...props} x={eyeOffset + eyeRadius} y={-eyeOffset} scale={1} />
                <SquirrelMouth {...props} x={0} y={mouthYOffset} scale={1} />
                {hasShades && <SquirrelShades {...props} x={0} y={0} scale={1}/>}
            </pixiGraphics>
        </pixiGraphics>
    }

    return <pixiGraphics x={props.x} y={props.y + headYOffset} draw={() => {}}>
        <SquirrelEar {...props} x={earOffset} y={-(2 * earHeight)} scale={1} />
        <SquirrelEar {...props} x={-earOffset - earWidth} y={-(2 * earHeight)} scale={1}/>
        <pixiGraphics x={0} y={0} draw={(g) => drawSquirrelHead(g)} scale={props.scale}>
            <SquirrelEye {...props} x={-eyeOffset - eyeRadius} y={-eyeOffset} scale={1} />
            <SquirrelEye {...props} x={eyeOffset + eyeRadius} y={-eyeOffset} scale={1} />
            <SquirrelMouth {...props} x={0} y={mouthYOffset} scale={1} />
            {hasShades && <SquirrelShades {...props} x={0} y={0} scale={1}/>}
        </pixiGraphics>
    </pixiGraphics>
}