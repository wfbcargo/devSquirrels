import {DevSquirrel} from "./animation/DevSquirrel.tsx";
import {FC, useEffect, useState} from "react";
import {Assets} from "pixi.js";
import forestPng from '../assets/forest.png'
import nightClubPng from '../assets/nightClub.png'
import {useApplication} from "@pixi/react";

export const AnimationFrame: FC = () => {
    const [backgroundTexture, setBackgroundTexture] = useState<any>(null)
    const [backgroundUrl] = useState(forestPng)

    const application = useApplication();

    useEffect(() => {
        Assets.load(backgroundUrl).then((texture) => {
            setBackgroundTexture(texture)
        })
    }, [backgroundUrl])

    return (
        <pixiContainer>
            {backgroundTexture &&
                <pixiSprite texture={backgroundTexture} anchor={0} width={application.app.renderer?.width}
                            height={application.app.renderer?.height}/>}
            <DevSquirrel x={100} y={375} scale={.125}/>
            <DevSquirrel x={100} y={350} scale={.25}/>
            <DevSquirrel x={100} y={300} scale={.5}/>
            <DevSquirrel x={100} y={275} scale={.75}/>
            <DevSquirrel x={100} y={250} scale={1}/>
            <DevSquirrel x={100} y={225} scale={1.25}/>
            <DevSquirrel x={100} y={200} scale={1.5}/>
        </pixiContainer>
    )
}