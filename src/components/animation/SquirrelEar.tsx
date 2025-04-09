import {FC, useEffect, useRef, useState} from "react";
import {Animation, IDevSquirrel} from "./DevSquirrel.tsx";
import {Graphics} from "pixi.js";
import {earHeight, earWidth, tertiaryColor,} from "../../definitions/DevSquirrelBaseDimensions.ts";
import {useTick} from "@pixi/react";

enum EarAnimations {
    Base = "base",
    Twitch = "twitch"
}

export const SquirrelEar: FC<IDevSquirrel> = (props) => {
    const [earAnimation, setEarAnimation] = useState(EarAnimations.Base)

    const [earOffsetX, setEarOffsetX] = useState(0)
    const [earOffsetY, setEarOffsetY] = useState(0)
    const [earRotation, setEarRotation] = useState(0)

    const twitchMaxRotation = useRef(.2)
    const twitchDuration = useRef(1000)
    const twitchLastTime = useRef(0)
    const [rotatingForward, setRotatingForward] = useState(true)

    const drawSquirrelEar = (g: Graphics) => {
        g.clear()
        g.fillStyle = tertiaryColor;
        g.beginPath();
        g.rect(0, 0, earWidth, earHeight);
        g.fill();
    }

    const controlTickSpeed = useRef(Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000)
    const controlLastTime = useRef(0)

    const earAnimationTickSpeed = useRef(100)
    const earAnimationLastTime = useRef(0)

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
        const animations = Object.values(EarAnimations)
        const randomAnimation : EarAnimations = animations[Math.floor(Math.random() * animations.length)]

        setEarAnimation(randomAnimation)
        controlLastTime.current = 0
    })

    useEffect(() => {
        setEarOffsetX(0)
        setEarOffsetY(0)
        setEarRotation(0)
    }, [props.animation])

    // walk animation
    useTick(delta => {
        if (props.animation !== Animation.Walk) {
            return
        }

        earAnimationLastTime.current += delta.deltaMS
        if (earAnimationLastTime.current < earAnimationTickSpeed.current) {
            return
        }

        earAnimationLastTime.current = 0
    })

    // twitch animation
    useTick(delta => {
        if (earAnimation !== EarAnimations.Twitch) {
            return
        }

        earAnimationLastTime.current += delta.deltaMS
        twitchLastTime.current += delta.deltaMS
        if (earAnimationLastTime.current < earAnimationTickSpeed.current) {
            return
        }

        let rForward = rotatingForward
        if(earRotation >= twitchMaxRotation.current) {
            rForward = false
        } else if(earRotation <= -1 * twitchMaxRotation.current) {
            rForward = true
        }

        if (rForward) {
            setEarRotation(r => r + delta.deltaMS * .01)
        } else {
            setEarRotation(r => r - delta.deltaMS * .01)
        }

        setRotatingForward(rForward)

        earAnimationLastTime.current = 0
        if(twitchLastTime.current >= twitchDuration.current) {
            setEarAnimation(EarAnimations.Base)
            setRotatingForward(true)
            setEarRotation(0)
        }
    })

    return <pixiGraphics x={props.x + earOffsetX + earWidth / 2} y={props.y + earOffsetY + earHeight} draw={(g) => drawSquirrelEar(g)} scale={props.scale}
                         rotation={(props.rotation ?? 0) + earRotation} pivot={{x: earWidth / 2, y: earHeight}}>

    </pixiGraphics>
}