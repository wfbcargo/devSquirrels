import {FC, useEffect, useRef, useState} from "react";
import {useTick} from "@pixi/react";
import {SquirrelHead} from "./SquirrelHead.tsx";
import {SquirrelBody} from "./SquirrelBody.tsx";
import {SquirrelArms} from "./SquirrelArms.tsx";
import {SquirrelLegs} from "./SquirrelLegs.tsx";
import {SquirrelTail} from "./SquirrelTail.tsx";
import { useApplication } from '@pixi/react';

export interface IDevSquirrel {
    x: number;
    y: number;
    scale: number;
    direction?: Direction;
    animation?: Animation;
    rotation?: number;
}

export enum Direction {
    Forward = "forward",
    Backward = "backward",
    Left = "left",
    Right = "right",
}

export enum Animation {
    Idle = "idle",
    Walk = "walk"
}

export const DevSquirrel: FC<IDevSquirrel> = (props) => {
    const [devSquirrel, setDevSquirrel] = useState<IDevSquirrel>({
        x: props.x,
        y: props.y,
        scale: props.scale,
        direction: Direction.Forward,
        animation: Animation.Walk
    })

    const application = useApplication();

    const controlTickSpeed = useRef(Math.floor(Math.random() * (15000 - 12000 + 1)) + 12000)
    const controlLastTime = useRef(0)

    const idleAnimationTickSpeed = useRef(Math.floor(Math.random() * (1200 - 600 + 1)) + 600)
    const idleAnimationLastTime = useRef(0)

    const walkAnimationTickSpeed = useRef(1)
    const walkAnimationLastTime = useRef(0)

    useEffect(() => {
        setDevSquirrel(s => ({
            x: props.x,
            y: props.y,
            scale: props.scale,
            direction: props.direction ?? s.direction,
            animation: props.animation ?? s.animation
        }))
    }, [props.x, props.y, props.scale, props.direction, props.animation])

    // control tick
    useTick(delta => {
        controlLastTime.current += delta.deltaMS
        if (controlLastTime.current < controlTickSpeed.current) {
            return
        }
        // 50% chance to change animation
        if (Math.random() < 0.5) {
            return
        }

        // set animation to random animation
        const animations = Object.values(Animation)
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
        setDevSquirrel(s => ({
            ...s,
            animation: randomAnimation
        }))

        controlLastTime.current = 0
    })

    // Idle animation
    useTick(delta => {
        if (devSquirrel.animation !== Animation.Idle) {
            return
        }
        idleAnimationLastTime.current += delta.deltaMS

        if (idleAnimationLastTime.current < idleAnimationTickSpeed.current) {
            return
        }

        // get random Direction from Direction enum
        const randomDirection = Object.values(Direction)[Math.floor(Math.random() * Object.values(Direction).length)]

        setDevSquirrel({
            ...devSquirrel,
            direction: randomDirection
        })

        idleAnimationLastTime.current = 0
    })
    
    // Walk animation
    useTick(delta => {
        if (devSquirrel.animation !== Animation.Walk) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS

        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        let newDirection = devSquirrel.direction
        // if facing forward 50% chance left or right
        if (newDirection === Direction.Forward) {
            if (Math.random() < 0.5) {
                newDirection = Direction.Left
            } else {
                newDirection = Direction.Right
            }
        }

        if(newDirection === Direction.Left) {
            if (devSquirrel.x < 0) {
                newDirection = Direction.Right
            }
        }
        else {
            //check screen edge
            if (devSquirrel.x > application.app.renderer.width) {
                newDirection = Direction.Left
            }
        }

        // move x cord in direction facing by 5 delta
        if (newDirection === Direction.Left) {
            setDevSquirrel(s => ({
                ...s,
                direction : newDirection,
                x: s.x - 20 * delta.deltaMS / 1000
            }))
        } else if (newDirection === Direction.Right) {
            setDevSquirrel(s => ({
                ...s,
                direction : newDirection,
                x: s.x + 20 * delta.deltaMS / 1000
            }))
        }
        walkAnimationLastTime.current = 0
    })

    return <pixiGraphics draw={() => {}} scale={props.scale}>
        <SquirrelTail { ...{...devSquirrel, scale: 1} } />
        <SquirrelLegs { ...{...devSquirrel, scale: 1} } />
        <SquirrelBody { ...{...devSquirrel, scale: 1} } />
        <SquirrelArms { ...{...devSquirrel, scale: 1} } />
        <SquirrelHead { ...{...devSquirrel, scale: 1} } />
    </pixiGraphics>
}