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
    eyeYOffset,
    headRadius,
    noseRadius,
    noseYOffset,
    quadraColor,
    tertiaryColor
} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {useTick} from "@pixi/react";

export enum HeadAnimations {
    Base = "base",
    Look = "look"
}

export const SquirrelHead : FC<IDevSquirrel> = (props) => {
    const [devSquirrel, setDevSquirrel] = useState({...props})
    const [thisAnimation] = useState(HeadAnimations.Base)
    const [headYOffset, setHeadYOffset] = useState(0)

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

    const drawSquirrelHeadForward = (g: Graphics) => {
        g.fillStyle = tertiaryColor;
        // Left Ear
        g.beginPath();
        g.rect(-earWidth - earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Right Ear
        g.beginPath();
        g.rect( earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Head
        g.fillStyle = baseColor;
        g.beginPath();
        g.arc(0, 0, headRadius, 0, Math.PI * 2);
        g.fill();

        // Mouth
        const mouthRadius = 8
        const mouthYOffset = 16
        g.fillStyle = quadraColor;
        g.beginPath();
        g.arc(0, mouthYOffset, mouthRadius, 0, Math.PI * 2);
        g.fill();

        // Jaw
        g.fillStyle = tertiaryColor;
        const jawWidth = 2
        const jawHeight = 12
        g.rect(-jawWidth / 2,mouthRadius, jawWidth, jawHeight);
        g.fill()

        //Nose
        const noseRadius = 4
        const noseYOffset = 8
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.arc(0, noseYOffset, noseRadius, 0, Math.PI * 2);
        g.fill();


        g.fillStyle = tertiaryColor;

        // Left Eye
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius, -eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();

        // Right Eye
        g.beginPath();
        g.arc(eyeOffset + eyeRadius,-eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();
    }

    const drawSquirrelHeadLookLeft = (g: Graphics) => {
        g.fillStyle = tertiaryColor;
        // Left Ear
        g.beginPath();
        g.rect(-earWidth - earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Left Eye
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius, -eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();

        // Head
        g.fillStyle = baseColor;
        g.beginPath();
        g.arc(0, 0, headRadius, 0, Math.PI * 2);
        g.fill();

        g.fillStyle = tertiaryColor;

        // Right Ear
        g.beginPath();
        g.rect(earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Mouth
        const mouthRadius = 8
        const mouthYOffset = 16
        g.fillStyle = quadraColor;
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius - noseYOffset - 4, mouthYOffset, mouthRadius, 0, Math.PI * 2);
        g.fill();

        // Jaw
        g.fillStyle = tertiaryColor;
        const jawWidth = 2
        const jawHeight = 12
        g.rect(-eyeOffset - eyeRadius - noseYOffset - jawWidth / 2 - 6, mouthRadius, jawWidth, jawHeight);
        g.fill()

        //Nose
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius - noseYOffset - 6, noseYOffset, noseRadius, 0, Math.PI * 2);
        g.fill();


        g.fillStyle = tertiaryColor;

        // Right Eye
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius, -eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();
    }

    const drawSquirrelHeadLookRight = (g: Graphics) => {
        g.fillStyle = tertiaryColor;

        // Right Ear
        g.beginPath();
        g.rect(earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Left Eye
        g.beginPath();
        g.arc(-eyeOffset - eyeRadius, -eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();

        // Head
        g.fillStyle = baseColor;
        g.beginPath();
        g.arc(0, 0, headRadius, 0, Math.PI * 2);
        g.fill();

        g.fillStyle = tertiaryColor;

        // Left Ear
        g.beginPath();
        g.rect(-earWidth - earOffset, -(2 * earHeight), earWidth, earHeight);
        g.fill();

        // Mouth
        const mouthRadius = 8
        const mouthYOffset = 16
        g.fillStyle = quadraColor;
        g.beginPath();
        g.arc(eyeOffset + eyeRadius + noseYOffset + 4, mouthYOffset, mouthRadius, 0, Math.PI * 2);
        g.fill();

        // Jaw
        g.fillStyle = tertiaryColor;
        const jawWidth = 2
        const jawHeight = 12
        g.rect(eyeOffset + eyeRadius + noseYOffset + jawWidth / 2 + 6, mouthRadius, jawWidth, jawHeight);
        g.fill()

        //Nose
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.arc(eyeOffset + eyeRadius + noseYOffset + 6, noseYOffset, noseRadius, 0, Math.PI * 2);
        g.fill();


        g.fillStyle = tertiaryColor;

        // Right Eye
        g.beginPath();
        g.arc(eyeOffset + eyeRadius,  -eyeYOffset, eyeRadius, 0, Math.PI * 2);
        g.fill();
    }

    const drawSquirrelHead = (g: Graphics, s: IDevSquirrel) => {
        g.clear()
        switch (s.direction) {
            case "forward":
                drawSquirrelHeadForward(g);
                break;
            case "left":
                drawSquirrelHeadLookLeft(g);
                break;
            case "right":
                drawSquirrelHeadLookRight(g);
                break;
            default:
                drawSquirrelHeadForward(g);
                break;
        }
    }

    return <pixiGraphics x={props.x} y={props.y + headYOffset} draw={(g) => drawSquirrelHead(g, devSquirrel)} scale={props.scale}>

    </pixiGraphics>
}