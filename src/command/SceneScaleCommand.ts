import { Entity2D, EntityUtils} from "../entity-2d";
import { InteractionEvent } from "../listener";
import { Command } from "./Command";

class SceneScaleCommand extends Command {

    /**
     *  放大场景比例
     * @description 放大场景会导致画布上的呈现范围更小。 c/s 是变大的
     */
    private static BIGGER_RATIO = 1.1;

    private static SMALLER_RATIO = 1 / 1.1;

    protected onWheel(entity: Entity2D, event: InteractionEvent): void {
        if(EntityUtils.isRenderTree(entity)) {
            const originalEvent = event.originalEvent as WheelEvent;
            const ratio = originalEvent.deltaY > 0 ? SceneScaleCommand.SMALLER_RATIO : SceneScaleCommand.BIGGER_RATIO;

            const { x: sx, y: sy} = entity.transform.scale;
            entity.transform.scale.set(sx*ratio, sy*ratio);

            const scaleOrigin = event.localPoint;
            const origin = entity.transform.translate;

            entity.transform.translate = scaleOrigin.add(origin.sub(scaleOrigin).multiply(ratio));
        }
    }
}

export {
    SceneScaleCommand,
}