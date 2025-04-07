import {Graphics} from "pixi.js";
import {Animation, Direction, IDevSquirrel} from "./DevSquirrel.tsx";
import {armWidth, bodyHeadOffset, bodyWidth, headRadius,} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {FC, useEffect, useRef, useState} from "react";
import {SquirrelArm} from "./SquirrelArm.tsx";
import {useTick} from "@pixi/react";

export const SquirrelArms: FC<IDevSquirrel> = (props) => {
    const walkAnimationTickSpeed = useRef(50)
    const walkAnimationLastTime = useRef(0)

    const [rotation, setRotation] = useState(0)
    const [leadArm, setLeadArm] = useState(false)
    const [leftArmOffsetY, setLeftArmOffsetY] = useState(0)
    const [rightArmOffsetY, setRightArmOffsetY] = useState(0)
    const [leftArmOffsetX, setLeftArmOffsetX] = useState(0)
    const [rightArmOffsetX, setRightArmOffsetX] = useState(0)

    const maxOffset = useRef(1)

    useEffect(() => {
        if(props.animation === Animation.Idle)
        {
            setRotation(0)
            setLeftArmOffsetY(0)
            setRightArmOffsetY(0)
            setLeftArmOffsetX(0)
            setRightArmOffsetX(0)
        }

        if(props.animation === Animation.Walk)
        {
            if(props.direction === Direction.Left)
            {
                setRotation(Math.PI / 6)
                setLeftArmOffsetX(-armWidth + 5)
                setRightArmOffsetX(armWidth - 5)
            }

            if(props.direction === Direction.Right)
            {
                setRotation(-Math.PI / 6)
                setLeftArmOffsetX(armWidth - 5)
                setRightArmOffsetX(-armWidth + 5)
            }

            if(props.direction === Direction.Forward)
            {
                setRotation(0)
                setLeftArmOffsetY(0)
                setRightArmOffsetY(0)
                setLeftArmOffsetX(0)
                setRightArmOffsetX(0)
            }
        }
    }, [props.direction])
    // walk animation
    useTick(delta => {
        if (props.animation !== Animation.Walk) {
            return
        }
        walkAnimationLastTime.current += delta.deltaMS
        if (walkAnimationLastTime.current < walkAnimationTickSpeed.current) {
            return
        }

        if(leadArm) {
            setLeftArmOffsetY(a => a - 50 * delta.deltaMS / 1000 )
            setRightArmOffsetY(a => a + 50 * delta.deltaMS / 1000 )
        }
        else {
            setLeftArmOffsetY(a => a + 50 * delta.deltaMS / 1000)
            setRightArmOffsetY(a => a - 50 * delta.deltaMS / 1000)
        }

        // increment look stage by 1 every tick up to  and then reset to 0
        if (leadArm && rightArmOffsetY >= maxOffset.current) {
            setLeadArm(false)
        } else if (!leadArm && rightArmOffsetY <= -1 * maxOffset.current) {
            setLeadArm(true)
        }

        walkAnimationLastTime.current = 0
    })

    const drawSquirrelArm = (g: Graphics) => {
        g.clear()
    }

    const bodyBaseY = props.y + (headRadius) + bodyHeadOffset
    const armBaseY = bodyBaseY;

    const leftArmBaseX = props.x - bodyWidth / 2 - armWidth

    const rightArmBaseX = props.x + bodyWidth / 2

    return <pixiGraphics draw={(g) => drawSquirrelArm(g)} scale={props.scale}>
        <SquirrelArm x={leftArmBaseX + leftArmOffsetX} y={armBaseY + leftArmOffsetY} rotation={rotation} scale={props.scale} />
        <SquirrelArm x={rightArmBaseX + rightArmOffsetX} y={armBaseY + rightArmOffsetY} rotation={rotation} scale={props.scale}/>
    </pixiGraphics>
}