import {Graphics} from "pixi.js";
import {Animation, IDevSquirrel} from "./DevSquirrel.tsx";
import {footMidOffset, footWidth,} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {FC, useEffect, useRef, useState} from "react";
import {useTick} from "@pixi/react";
import {SquirrelLeg} from "./SquirrelLeg.tsx";

export const SquirrelLegs: FC<IDevSquirrel> = (props) => {
    const walkAnimationTickSpeed = useRef(60)
    const walkAnimationLastTime = useRef(0)

    const [rotation, setRotation] = useState(0)
    const [leadFoot, setLeadFoot] = useState(false)

    const maxRotation = useRef(.4)

    useEffect(() => {
        if(props.animation === Animation.Idle)
        {
            setRotation(0)
        }
    }, [props.animation])

    // idle animation
    useTick(delta => {
        if (props.animation !== Animation.Idle) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS
        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        walkAnimationLastTime.current = 0
    })

    // walk animation
    useTick(delta => {
        if (props.animation !== Animation.Walk) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS
        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        if(leadFoot) {
            setRotation(r => r + delta.deltaMS * .01)
        }
        else {
            setRotation(r => r - delta.deltaMS * .01)
        }

        // increment look stage by 1 every tick up to  and then reset to 0
        if (leadFoot && rotation >= maxRotation.current) {
            setLeadFoot(false)
        } else if (!leadFoot && rotation <= -1 * maxRotation.current) {
            setLeadFoot(true)
        }

        walkAnimationLastTime.current = 0
    })

    const drawSquirrelLegs = (g: Graphics) => {
        g.clear()
    }

    return <pixiGraphics draw={(g) => drawSquirrelLegs(g)} scale={props.scale}>
        <SquirrelLeg x={props.x - footMidOffset - footWidth} y={props.y} scale={props.scale} rotation={rotation}/>
        <SquirrelLeg x={props.x + footMidOffset} y={props.y} scale={props.scale} rotation={-1 * rotation}/>
    </pixiGraphics>
}